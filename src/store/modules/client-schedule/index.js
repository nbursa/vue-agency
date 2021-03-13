import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"
import SidebarModule from "@/store/modules/sidebar/"
import SchedulerModule from "@/store/modules/scheduler/"
import FormModule from "@/store/modules/form/"
import SearchModule from "@/store/modules/search"
import ModalModule from "@/store/modules/modals"

const state = {
  schedule : [],
  candidates: [],
  workers: [],
  meta: {},
  status: false,
  candidateStatus: false,
  candidateError: {}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    scheduler: SchedulerModule,
    edit: FormModule,
    search: SearchModule,
    sidebar: SidebarModule,
    modal: ModalModule,
  }
}