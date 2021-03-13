import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

const state = {
  shifts: {},
  shiftsArray: [],
  sortType: 'chrono'
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
