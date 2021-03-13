import * as TreeMutations from "@/store/modules/_shared/tree/mutations"

export const SET_CLIENTS = (state, users) => {
  state.clients = users
}

export const UPDATE_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const UPDATE_STATUS = (state, newStatus) => {
  state.status = newStatus
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const SET_SELECTED_CLIENT = (state, client) => {
  state.selected = client
}

export const UPDATE_CLIENT = (state, client) => {
  const { id } = client
  let cand = state.clients.find(item => item.id === id)
  Object.keys(cand).forEach(key => {
    if (client[key] && cand[key]) {
      cand[key] = client[key]
    }
  })
}

export const RESET_SELECTED = (state, client) => {
  state.selected = {}
}

export const ADD_CHILD_NODE = TreeMutations.ADD_CHILD_NODE("clients")
export const ADD_SIBLING_NODE = TreeMutations.ADD_SIBLING_NODE("clients")
export const NODE_UPDATED = TreeMutations.NODE_UPDATED("clients")
export const CHILD_NODES_UPDATED = TreeMutations.CHILD_NODES_UPDATED("clients")
export const DESTROY_NODE = TreeMutations.DESTROY_NODE("clients")
