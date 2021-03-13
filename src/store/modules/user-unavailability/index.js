import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"
import FormModule from "@/store/modules/form/"
import SearchModule from "@/store/modules/search"

const state = () => {
  return {
    userRequests: [],
    meta: {},
    errors: "",
    status: false,
    userRequest: {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    table: TableModule,
    sidebar: SidebarModule,
    edit: FormModule,
    search: SearchModule
  }
}
