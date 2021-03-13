import {
  format,
  compareAsc,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek
} from 'date-fns'

import {
  JobStatus,
  VJobSelector,
  VClientSelector,
  VAttributeSelector
} from '@/components/shared/selectors'

import CandidatesTypeahead from '@/components/shared/typeahead/CandidatesTypeahead'

const jobStatuses = [
  {
    id: 'created',
    label: 'jobs.status_created'
  },
  {
    id: 'accepted',
    label: 'jobs.status_accepted',
    group: 'filled'
  },
  {
    id: 'pass_on_pending',
    label: 'jobs.status_pass_pending',
    group: 'filled'
  },
  {
    id: 'swap_pending',
    label: 'jobs.status_swap_pending',
    group: 'filled'
  },
  {
    id: 'in_progress',
    label: 'jobs.status_inprogress'
  },
  {
    id: 'sign_off_pending',
    label: 'jobs.status_signoff_pending',
    group: 'finished'
  },
  {
    id: 'admin_sign_off_pending',
    label: 'jobs.status_admin_sign_off_pending',
    group: 'finished'
  },
  {
    id: 'invoice_pending',
    label: 'jobs.status_invoice',
    group: 'finished'
  },
  {
    id: 'arbitration_pending',
    label: 'jobs.status_arbitration',
    group: 'finished'
  },
  {
    id: 'invoiced',
    label: 'jobs.status_invoiced',
    group: 'finished'
  },
  {
    id: 'never_filled',
    label: 'jobs.status_never',
    group: 'lost'
  }
]

export default {
  queryFilters: [
    {
      id: 0,
      label: 'jobs.filters_all',
      url: '#',
      slug: 'all'
    },
    {
      id: 1,
      label: 'jobs.filters_filled',
      url: '#',
      slug: 'filled'
    },
    {
      id: 2,
      label: 'jobs.filters_unfilled',
      url: '#',
      slug: 'unfilled'
    },
    {
      id: 3,
      label: 'jobs.filters_progress',
      url: '#',
      slug: 'in_progress'
    },
    {
      id: 4,
      label: 'jobs.filters_finished',
      url: '#',
      slug: 'finished'
    },
    {
      id: 5,
      label: 'jobs.filters_lost',
      url: '#',
      slug: 'lost'
    }
  ],
  advancedSearch: [
    {
      id: 1,
      text: 'jobs.search_status',
      icon: 'filters/status',
      param: 'status',
      component: JobStatus,
      data: jobStatuses
    },
    {
      id: 3,
      text: 'jobs.search_job',
      icon: 'filters/job',
      param: 'jobType',
      component: VJobSelector
    },
    {
      id: 4,
      text: 'jobs.search_attribute',
      icon: 'filters/atribute',
      param: 'attributes',
      component: VAttributeSelector
    },
    {
      id: 5,
      text: 'jobs.search_client_location',
      icon: 'filters/client-location',
      param: 'client_id',
      component: VClientSelector
    }
  ],
  jobRequestSearch: {},
  typeahead: {
    component: CandidatesTypeahead,
    placeholder: 'global.search_candidate_name'
  },
  activeView: 'VJobTable',
  datepicker: [
    {
      id: 1,
      label: 'jobs.date_today',
      getDate: function () {
        let startDate = new Date()
        let endDate = new Date()
        return [format(startDate, 'MM-DD-YYYY'), format(endDate, 'MM-DD-YYYY')]
      }
    },
    {
      id: 2,
      label: 'jobs.date_tomorrow',
      getDate: function () {
        let startDate = addDays(new Date(), 1)
        let endDate = addDays(new Date(), 1)
        return [format(startDate, 'MM-DD-YYYY'), format(endDate, 'MM-DD-YYYY')]
      }
    },
    {
      id: 3,
      label: 'jobs.date_this_week',
      getDate: function () {
        let startDate = new Date()
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    },
    {
      id: 4,
      label: 'jobs.date_next_week',
      getDate: function () {
        let startDate = addDays(new Date(), 7)
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    }
  ]
}
