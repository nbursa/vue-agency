import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import SidebarModule from '@/store/modules/sidebar/'
import TableModule from '@/store/modules/table/'
import SearchModule from '@/store/modules/search'
import { filters } from './filterList'

const state = {
  filters,
  reports: [],
  activeModule: null,
  meta: {},
  status: false,
  payrolls: {}
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    sidebar: SidebarModule,
    table: TableModule,
    search: SearchModule
  }
}
