import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import SearchModule from "@/store/modules/search"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"



const state = {
  margins: [],
  publishDate: "",
  tableMode: "hourly",
  filters: {
    jobTypes: null,
    grades: null,
    clients: null,
  },
  lastMarginQuery: {},
  meta: {},
  status: false,
  sidebarStatus: false
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    table: TableModule,
    search: SearchModule,
    sidebar: SidebarModule
  }
}