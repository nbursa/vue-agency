import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"
import SidebarModule from "@/store/modules/sidebar/"
import SchedulerModule from "@/store/modules/scheduler/"
import FormModule from "@/store/modules/form/"
import SearchModule from "@/store/modules/search"
import unavailabilityModule from "@/store/modules/user-unavailability"

const state = {
  schedule : [],
  meta: {},
  status: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    scheduler: SchedulerModule,
    editJob: FormModule,
    search: SearchModule,
    sidebar: SidebarModule,
    editLeave: unavailabilityModule
  }
}