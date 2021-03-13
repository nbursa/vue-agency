import {
  format,
  addDays,
  startOfWeek,
  endOfWeek
} from "date-fns"

import {
  JobStatus,
  VClientSelector,
  GenericSelector
} from "@/components/shared/selectors"

import VSignedOffByCell from "../job-scheduleList/VSignedOffByCell"
import VJobTotalTimeCell from "./VJobTotalTimeCell"
import CandidatesTypeahead from "@/components/shared/typeahead/CandidatesTypeahead"
import VCandidateCell from "../job-scheduleList/VCandidateCell"
import positionComponent from "../job-scheduleList/VPosition.vue"

const varianceStatuses = [
  {
    id: "1",
    label: "timesheets.has_variance",
  },
]


const jobStatuses = [
  {
    id: "sign_off_pending",
    label: "jobs.alt_status_signoff",
    group: "finished"
  },
  {
    id: "admin_sign_off_pending",
    label: "jobs.alt_status_admin_signoff",
    group: "finished"
  },
  {
    id: "invoice_pending",
    label: "jobs.alt_status_invoice",
    group: "finished"
  },
]

export default {
  tableColumnSwitcher: {
    optionalColumns: [
      { id: 1, label: "timesheets.table_column_7", hideCell: false, show: 'breakMinutes' },
      { id: 2, label: "timesheets.table_column_8", hideCell: false, show: 'times', component: VJobTotalTimeCell },
      { id: 4, label: "timesheets.table_column_10", hideCell: false, show: 'signOff', component: VSignedOffByCell },
      { id: 6, label: "timesheets.table_column_6", hideCell: false, component: VCandidateCell,  },
      { id: 8, label: "jobs.table_column_5", hideCell: false, component: positionComponent }
    ],
    selectorPlaceholder: "reporting.columns_placeholder",
    customClass: "margin-right"
  },
  advancedSearch: [
    {
      id: 1,
      text: "jobs.search_status",
      icon: "filters/status",
      param: "status",
      component: JobStatus,
      data: jobStatuses
    },
    {
      id: 5,
      text: "jobs.search_client_location",
      icon: "filters/client-location",
      param: "client_id",
      component: VClientSelector
    },
    {
      id: 7,
      text: "timesheets.table_column_9",
      icon: "job-schedule/change-view/time-sheet",
      param: "haveVariance",
      component: GenericSelector,
      data: varianceStatuses
    }
  ],
  typeahead: {
    component: CandidatesTypeahead,
    placeholder: "global.search_candidate_name"
  },
  datepicker: [
    {
      id: 1,
      label: "jobs.date_today",
      getDate: function () {
        let startDate = new Date()
        let endDate = new Date()
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 2,
      label: "jobs.date_yesterday",
      getDate: function () {
        let startDate = addDays(new Date(), -1)
        let endDate = addDays(new Date(), -1)
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 3,
      label: "jobs.date_this_week",
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
      label: "jobs.date_previous_week",
      getDate: function () {
        let startDate = addDays(new Date(), -7)
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    }
  ]
}
