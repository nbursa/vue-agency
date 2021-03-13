import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import SearchModule from '@/store/modules/search'
import SidebarModule from '@/store/modules/sidebar/'
import TableModule from '@/store/modules/table/'

const state = {
  options: [],
  payrates: [],
  activeTable: 'current',
  tableMode: 'hourly',
  marginMode: 1,
  publishDate: '',
  hasScheduled: null,
  lastRateQuery: {},
  meta: {},
  status: false,
  sidebarStatus: false,
  tableItemStatus: false,
  clients: [],
  dayTimes: [],
  errors: {}
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    table: TableModule,
    search: SearchModule, //insteadofretarded lastratequery just dispatch here
    sidebar: SidebarModule
  }
}
