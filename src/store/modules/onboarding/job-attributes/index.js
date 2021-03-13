import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import Vue from "vue"

const state = {
  status: "fetching",
  attributes: []
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
