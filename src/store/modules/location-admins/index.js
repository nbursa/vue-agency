import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"
import SidebarModule from "@/store/modules/sidebar/"
import TableModule from "@/store/modules/table/"
import FormModule from "@/store/modules/form/"
import SearchModule from "@/store/modules/search"

const state = {
  locationAdmins: [],
  meta: {},
  errors: [],
  status: false,
  selectedLocationAdmin: {},
  userUpdated: false,
  userSaved: false
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
