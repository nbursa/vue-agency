import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import SidebarModule from "@/store/modules/sidebar/"

const store = {
  clients: []
}

export default {
  namespaced: true,
  store,
  actions,
  getters,
  mutations,
  modules: {
    sidebar: SidebarModule
  }
}