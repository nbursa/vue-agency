import {
  VJobSelector,
  AgencySelector,
  VAttributeSelector,
  GenericSelector
} from '@/components/shared/selectors'

import tabbedNav from "./sharedNav"

const candidateStatuses = [
  {
    id: 'inactive',
    label: 'candidates.status_unverified'
  },
  {
    id: 'active',
    label: 'candidates.status_verified'
  }
]

export default {
  tabbedNav,
  advancedSearch: [
    {
      id: 3,
      text: 'candidates.drawer_filter_job',
      icon: 'filters/job',
      param: 'jobTypeId',
      component: VJobSelector
    },
    {
      id: 5,
      text: 'candidates.drawer_filter_branch',
      icon: 'filters/sectors',
      param: 'agencyId',
      component: AgencySelector
    },
    {
      id: 6,
      text: 'jobs.search_attribute',
      icon: 'filters/atribute',
      param: 'attributes',
      component: VAttributeSelector
    },
    {
      id: 7,
      text: 'jobs.search_status',
      icon: 'job-schedule/change-view/client-view',
      param: 'status',
      component: GenericSelector,
      data: candidateStatuses
    }
  ],
  textSearch: {
    paramName: 'name',
    placeholder: 'global.search_candidate_name'
  }
}
