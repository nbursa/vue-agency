import CJobSubmit from './CJobSubmit'
import CJobSchedule from './CJobSchedule'
import CSelectCandidates from './CSelectCandidates'

export default [
  {
    path: '/submit-job',
    name: 'submit-job',
    component: CJobSubmit,
    meta: {
      caption: 'jobsubmit',
      resource: 'JobType'
    }
  },
  {
    path: '/schedule-job',
    name: 'schedule-job',
    component: CJobSchedule,
    meta: {
      caption: 'jobschedule',
      resource: 'JobType'
    }
  },
  {
    path: '/select-candidates',
    name: 'select-candidates',
    component: CSelectCandidates,
    meta: {
      caption: 'selectcandidates',
      resource: 'JobType'
    }
  }
]
