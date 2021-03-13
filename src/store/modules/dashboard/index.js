import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import SidebarModule from "@/store/modules/sidebar/"

const state = {

}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    sidebar: SidebarModule
  }
}