import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

import TableModule from "@/store/modules/table/"
import SidebarModule from "@/store/modules/sidebar/"
import SearchModule from "@/store/modules/search"

const state = {
  invoices: [],
  selectedInvoice: {},
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
    search: SearchModule
  }
}