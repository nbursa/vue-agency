import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import SearchModule from "@/store/modules/search"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"
import FormModule from "@/store/modules/form/"

const state = {
  documents: [],
  status: "",
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
    create: FormModule,
    edit: FormModule,
    search: SearchModule
  }
}
