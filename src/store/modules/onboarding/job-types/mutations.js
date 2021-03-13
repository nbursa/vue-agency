import * as TreeMutations from "@/store/modules/_shared/tree/mutations"

export const JOB_TYPES_CREATED = (state, jobTypes) => {
  state.jobTypes = jobTypes
}

export const FETCHING_START = state => {
  state.fetching = true
}

export const FETCHING_END = state => {
  state.fetching = false
}

export const SET_JOB_TYPES = (state, jobTypes) => {
  state.jobTypes = jobTypes
}

export const ADD_CHILD_NODE = TreeMutations.ADD_CHILD_NODE("jobTypes")
export const ADD_SIBLING_NODE = TreeMutations.ADD_SIBLING_NODE("jobTypes")
export const NODE_UPDATED = TreeMutations.NODE_UPDATED("jobTypes")
export const CHILD_NODES_UPDATED = TreeMutations.CHILD_NODES_UPDATED("jobTypes")
export const DESTROY_NODE = TreeMutations.DESTROY_NODE("jobTypes")

export const BULK_UPDATE_LIST = (state, payload) => {
  state.jobTypes = payload
}