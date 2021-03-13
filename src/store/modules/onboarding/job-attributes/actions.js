import * as repository from "./repository.js"
import Vue from "vue"

export const getAll = ({ commit }) => {
  repository
    .fetchAttributes()
    .then(attributes => {
      commit("JOB_ATTRIBUTES_UPDATED", attributes)
    })
    .catch(e => {
      console.log(e)
    })
}

export const saveAttribute = ({ commit }, attribute) => {
  repository
    .saveAttribute(attribute)
    .then(res => {
      commit("ATTRIBUTE_CREATED", res.data.data)
    })
    .catch(e => {
      console.log(e)
    })
}

export const saveAttributeValue = ({ commit, getters }, options) => {
  console.log("OPTSAVE", options)
  repository
    .saveAttributeValue(options.id, {
      value: options.value
    })
    .then(res => {
      let parent = getters.getById(res.attribute.id)
      console.log("PARENT???", parent)
      commit("ATTRIBUTE_VALUE_CREATED", {
        parent: parent,
        value: res
      })
    })
    .catch(e => {
      console.log(e)
    })
}

export const deleteAttribute = ({ commit, getters }, attributeId) => {
  repository
    .deleteAttribute(attributeId)
    .then(res => {
      let attribute = getters.getById(attributeId)
      commit("ATTRIBUTE_DELETED", attribute)
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateAttribute = ({ commit, getters }, options) => {
  repository
    .updateAttribute(options)
    .then(resp => {
      let attribute = getters.getById(options.id)
      commit("ATTRIBUTE_UPDATED", {
        attribute: attribute,
        name: options.name
      })
    })
    .catch(e => Promise.reject(e))
}

export const updateAttributeValue = ({ commit, getters }, attributeValue) => {
  console.log("WTFBBQ", attributeValue)
  repository
    .updateAttributeValue(attributeValue)
    .then(resp => {
      let attribute = getters.getParentById(attributeValue.id)
      console.log("GET MY ATTRIBUTE", attribute)
      commit("ATTRIBUTE_VALUE_UPDATE", {
        attribute,
        attributeValue
      })
    })
    .catch(e => {
      console.log(e)
    })
}

export const deleteAttributeValue = ({ commit, getters }, attributeValue) => {
  console.log("ATTRIBUTE VALUE", attributeValue)
  repository
    .deleteAttributeValue(attributeValue.id)
    .then(resp => {
      let attribute = getters.getParentById(attributeValue.id)
      console.log("ATTRIBUTE", attribute)
      commit("ATTRIBUTE_VALUE_DELETE", {
        attribute,
        attributeValue
      })
    })
    .catch(e => {
      console.log(e)
    })
}
