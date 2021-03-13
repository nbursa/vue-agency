import { VClientSelector } from '@/components/shared/selectors'

import ReportDownload from '@/components/shared/scheduler/scheduler-filters/VReportDownload.vue'

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
    label: 'jobs.status_admin_sign_off_pending'
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
  queryFilters: [],
  scheduleCellFilter: ReportDownload,
  advancedSearch: [
    {
      id: 5,
      text: 'jobs.search_client_location',
      icon: 'filters/client-location',
      param: 'id',
      component: VClientSelector
    }
  ],

  activeView: 'CClientView'
}
