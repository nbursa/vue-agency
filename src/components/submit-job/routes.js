import CJobSubmit from './CJobSubmit'
import CSelectCandidates from './CSelectCandidates'

export default [
  {
    path: '/__submit-job',
    name: '__submit-job',
    component: CJobSubmit,
    meta: {
      caption: 'jobsubmit',
      resource: 'JobType'
    }
  },
  {
    path: '/__select-candidates',
    name: '__select-candidates',
    component: CSelectCandidates,
    meta: {
      caption: 'selectcandidates',
      resource: 'JobType'
    }
  }
]
