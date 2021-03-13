import * as actions from "../job-management/actions"
import * as getters from "../job-management/getters"
import * as mutations from "../job-management/mutations"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"
import FormModule from "@/store/modules/form/"
import SearchModule from "@/store/modules/search"

const state = {
  jobs: [],
  // jobRequest: [],
  // jobRequestId: null,
  meta: {},
  status: false,
  jobLocation: [],
  clientLocations:[]
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    sidebar: SidebarModule,
    create: FormModule,
    edit: FormModule,
    table: TableModule,
    search: SearchModule
  }
}
