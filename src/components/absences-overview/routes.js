import CAbsenceOverview from "./CAbsenceOverview"
import CRequests from "@/components/candidates/requests/CRequests.vue"
import CJobCalendar from "@/components/jobs/job-calendar/CJobCalendar.vue"
import CReportsTable from "@/components/reports/CReportsTable.vue"
import searchOptions from "./search.options.js"

export default [{
    path: "/absence-overview",
    name: "absences",
    component: CAbsenceOverview,
    meta: {
      caption: "absenceOverview",
      resource: "Temp"
    },
    children: [
      {
        path: "requests",
        name: "request-absence",
        component: CRequests,
        meta: {
          caption: "absenceOverview",
          breadcrumbs: ["absenceRequest"],
          resource: "Temp",
          override: searchOptions
        }
      },
      {
        path: "calendar",
        name: "job-calendar-absence",
        component: CJobCalendar,
        meta: {
          caption: "absenceOverview",
          breadcrumbs: ["absenceCalendar"],
          resource: "Calendar",
          override: searchOptions
        }
      },
      {
        path: "reports-inactivity",
        name: "reportInactivity",
        component: CReportsTable,
        meta: {
          caption: "absenceOverview",
          breadcrumbs: ["absenceReport"],
          override: searchOptions
        }
      },
    ]
}]