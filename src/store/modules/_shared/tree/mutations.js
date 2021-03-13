import * as TreeHelpers from "./Tree.helpers.js"
import Vue from "vue"

export const ADD_CHILD_NODE = prop => (state, node) => {
  let elem = TreeHelpers.findById(state[prop], node.parentId)
  if (elem.children) {
    elem.children.push(node)
  } else {
    Vue.set(elem, "children", [])
    elem.children.push(node)
  }
}

export const ADD_SIBLING_NODE = prop => (state, nodeId) => {
  let parentArray = TreeHelpers.findById(state[prop], nodeId)
  parentArray[0].splice(parentArray[1] + 1, 0, createNewNode("new"))
}

export const CHILD_NODES_UPDATED = prop => (state, params) => {
  let parent = TreeHelpers.findById(state[prop], params.parentId)
  Vue.set(parent, "children", params.children)
}

export const NODE_UPDATED = prop => (state, params) => {
  let node = TreeHelpers.findById(state[prop], params.id)
  node.name = params.name
}

export const DESTROY_NODE = prop => (state, node) => {
  let parentNodes = TreeHelpers.findById(state[prop], node.parentId)
  let index = parentNodes.children.indexOf(node)
  if (parentNodes) {
    Vue.delete(parentNodes.children, index)
  }
}
