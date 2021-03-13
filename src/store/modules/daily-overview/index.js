import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

export const state = {
  workers: {},
  total: 0
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}