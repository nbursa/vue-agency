import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

const state = () => {
  return {
    selected: [],
    checked: [],
    hidden: new Set(),
    dynamicColumns: []
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
