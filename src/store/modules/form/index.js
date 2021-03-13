import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

const state = () => {
  return {
    formItem: {},
    errors: {},
    isFetching: false,
    itemSaved: false,
    itemDeleted: false,
    isSignOff: false,
    uploadStatus: 0
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
