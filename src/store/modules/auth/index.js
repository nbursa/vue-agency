import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import ModalModule from '@/store/modules/modals'

const state = {
  user: null,
  accept: false
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    modal: ModalModule
  }
}
