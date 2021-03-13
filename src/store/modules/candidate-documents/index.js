import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"
import ComplianceManagement from "@/store/modules/compliance-management"
import SearchModule from "@/store/modules/search"

const state = {
  candidates: [],
  selectedDocument: {},
  status: false,
  meta: {},
  errors: []
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
    manage: ComplianceManagement,
    edit: ComplianceManagement,
    search: SearchModule
  }
}
