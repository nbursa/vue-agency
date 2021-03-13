import Vue from "vue"

export const JOB_ATTRIBUTES_UPDATED = (state, payload) => {
  state.attributes = payload
}

export const ATTRIBUTE_CREATED = (state, attribute) => {
  state.attributes.push(attribute)
}

export const ATTRIBUTE_DELETED = (state, attribute) => {
  Vue.delete(state.attributes, state.attributes.indexOf(attribute))
}

export const ATTRIBUTE_VALUE_CREATED = (state, options) => {
  options.parent.values.push(options.value)
}

export const ATTRIBUTE_UPDATED = (state, options) => {
  options.attribute.name = options.name
}

export const ATTRIBUTE_VALUE_UPDATE = (state, options) => {
  console.log("GOT OPTIONS", options)

  let oldvalue = options.attribute.values.find(
    e => e.id === options.attributeValue.id
  )

  console.log("OLD ONE", options.attribute.values.indexOf(oldvalue))
  let newvalue = {
    id: options.attributeValue.id,
    value: options.attributeValue.attributeValue
  }
  Vue.set(
    options.attribute.values,
    options.attribute.values.indexOf(oldvalue),
    newvalue
  )
}

export const ATTRIBUTE_VALUE_DELETE = (state, options) => {
  Vue.delete(
    options.attribute.values,
    options.attribute.values.map(item => item.id).indexOf(options.attributeValue.id)
  )
}
