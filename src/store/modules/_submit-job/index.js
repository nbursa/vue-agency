import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import { initialState } from './const'
import AgenciesModule from '../agencies'

const state = { ...initialState }

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    agency: AgenciesModule
  }
}
