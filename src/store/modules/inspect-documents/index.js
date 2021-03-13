import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"
import ComplianceManagement from "@/store/modules/compliance-management"
import SearchModule from "@/store/modules/search"

const state = {
  documents: [],
  status: "",
  errors: {},
  meta: {}
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
    edit: ComplianceManagement,
    search: SearchModule
  }
}
