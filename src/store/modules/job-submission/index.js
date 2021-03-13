import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import SidebarModule from '@/store/modules/sidebar/'
import TableModule from '@/store/modules/table/'
import FormModule from '@/store/modules/form/'
import SearchModule from '@/store/modules/search'
import Job from '@/models/Job'

const state = () => {
  return {
    meta: {},
    errors: [],
    isFetching: false,
    isSaved: false,
    candidates: [],
    job: new Job(),
    generatedJobs: []
  }
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
    table: TableModule,
    edit: FormModule,
    search: SearchModule
  }
}
