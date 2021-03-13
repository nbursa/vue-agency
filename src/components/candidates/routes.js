import CDocuments from './CCandidates.vue'
import CRequests from './requests/CRequests'
import CPools from './pools/CPools'
import CCandidateDetails from './candidate-details/CCandidateDetails'

export default [
  {
    path: '/candidates',
    name: 'candidates',
    component: CDocuments,
    meta: {
      caption: 'candidates',
      resource: 'Temp'
    }
  },
  {
    path: '/requests',
    name: 'requests',
    component: CRequests,
    meta: {
      caption: 'requests',
      resource: 'Temp'
    }
  },
  {
    path: '/candidate-pools',
    name: 'candidate-pools',
    component: CPools,
    meta: {
      caption: 'candidatePools',
      resource: 'Temp'
    }
  },
  {
    path: '/candidate-details/:candidateId',
    name: 'candidate-details',
    component: CCandidateDetails,
    meta: {
      caption: 'candidates',
      breadcrumbs: ['candidateDetails'],
      guardBack: true,
      resource: 'Temp'
    }
  }
]
