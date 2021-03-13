import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"

const state = () => {
  return {
    data: [],
    selected: null,
    page: 1,
    interval: "week",
    controlFilters: {
      teamFilters: ["job", "holiday", "sickday"],
      clientFilters: ["unfilled", "filled"]
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}