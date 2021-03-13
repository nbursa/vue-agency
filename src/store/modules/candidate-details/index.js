import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import documents from '@/store/modules/candidate-documents/'
import jobHistory from '@/store/modules/job-management/'
import jobSubmission from '@/store/modules/job-submission'
import candidates from '@/store/modules/candidates/'

const state = {
  overview: {},
  availabilities: {}
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    candidate: candidates,
    jobHistory: jobHistory,
    documents: documents,
    jobSubmit: jobSubmission
  }
}
