import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import SidebarModule from '@/store/modules/sidebar/'
import TableModule from '@/store/modules/table/'
import FormModule from '@/store/modules/form/'

const state = {
  clients: [],
  selected: {},
  meta: {},
  clientUpdated: false,
  clientSaved: false,
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
    timesheet: FormModule
  }
}
