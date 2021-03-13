import {
  api
} from "@/axios"
/* Merge two objects, second one overrides the same props of the frist one */

import _ from "lodash"
import { app as appInstance } from "@/main"

export const merge = (o1, o2) => {
  return {
    ...o1,
    ...o2
  }
}

export const noop = () => {}

export const attachAttribute = iter => collection => {
  const result = []
  for (const item of collection) {
    // Prevent modification of original
    const safe = {
      ...item
    }
    // Push changes made by iter function
    result.push(iter(safe))
  }
  return result
}

export const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  )
}

export const isObject = o => {
  return o !== null && typeof o === "object" && Array.isArray(o) === false
}

export const isArray = o => {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export const deepMerge = (target, source) => {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {}
          })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, {
          [key]: source[key]
        })
      }
    })
  }
  return target
}

export const deepPropFind = (o, prop, retprop) => {
    if(o==null) return false;
    if( o[prop] ){
        return (retprop) ? o[retprop] : o;
    }
    let result, p;
    for (p in o) {
       if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
           result = deepPropFind(o[p], prop);
           if(result){
               return (retprop) ? result[retprop] : result;
           }
       }
    }
    return (retprop) ? result[retprop] : result;
}

export const renameObjectKey = (
  oldKey,
  newKey, {
    [oldKey]: old,
    ...rest
  }
) => ({
  [newKey]: old,
  ...rest
})

export const capitalise = what => {
  return what
    .substr(0, 1)
    .toUpperCase()
    .concat(what.substr(1, what.length))
}

export const parseNotificationType = type => {
  return type
    .substring(type.lastIndexOf("\\") + 1)
    .slice(type, -"Notification".length)
}

export const getSiblingRef = function (refName) {
  return this.$parent.$children.filter(child => {
    return refName in child.$refs
  })[0].$refs[refName]
}

export const getLoneChild = function (arr, childrenContainer = "children") {
  if (arr.length && arr.length === 1) {
    const safe = [...arr]
    return safe.reduce((acc, item) => {
      acc = item[childrenContainer] && item[childrenContainer].length === 1 ? item[childrenContainer] : item
      return Array.isArray(acc) ? getLoneChild(acc) : acc[childrenContainer] ? false : acc
    }, {})
  } else {
    //Return false on more then one member present in array
    return false
  }
}

export const translateArray = function (arr, propToTranslate) {
  return arr.map(item => {
    return {
      ...item,
      [propToTranslate] : appInstance.$t(item[propToTranslate])
      }
  })
}

export const generateTree = function (arr) {
    try {
      let hash = Object.create(null)
      arr.forEach( aData => { 
          hash[aData.id] = { ...aData } 
      })
      let tree = []
      arr.forEach( aData => {
          if( aData.parentId && hash[aData.parentId]) { 
            if(hash[aData.parentId].children) {
              hash[aData.parentId].children.push(hash[aData.id])
            } else {
              hash[aData.parentId].children = [hash[aData.id]]
            }
          }
          else {
            tree.push(hash[aData.id])
          }
      } )
      return tree
  } catch(e) {   
    console.log("tree error", e)
    return arr
  }
}

export const deepObjectDiff = function(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
        result[`old_${key}`] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : base[key]
      }
    });
  }
  return changes(object, base);
}