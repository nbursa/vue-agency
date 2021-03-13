import { has } from "lodash"

export const getById = state => id => {
  return state.attributes.find(element => element.id === id)
}


export const getParentById = state => id => {
  return state.attributes.find(element => { 
    return element.values.find(value => value.id === id)
  })
}