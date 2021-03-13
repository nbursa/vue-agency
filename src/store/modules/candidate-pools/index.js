import * as actions from './actions'
import * as mutations from './mutations'
import SidebarModule from '@/store/modules/sidebar/'
import TableModule from '@/store/modules/table/'
import FormModule from '@/store/modules/form/'
import SearchModule from '@/store/modules/search'

const state = () => {
  return {
    pools: [],
    status: false,
    meta: {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  modules: {
    table: TableModule,
    sidebar: SidebarModule,
    create: FormModule,
    edit: FormModule,
    search: SearchModule
  }
}
