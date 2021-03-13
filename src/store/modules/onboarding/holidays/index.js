import * as actions from "./actions"
import * as mutations from "./mutations"

const state = () => {
  return {
    holidays: [],
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

