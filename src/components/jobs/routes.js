import CJobManagement from "./job-scheduleList/VJobTable.vue"
import CTimesheets from "./timesheets/VTimesheetTable.vue"
import CJobCalendar from "./job-calendar/CJobCalendar.vue"
import CTeamSchedule from './team-schedule/CTeamSchedule.vue'
import CClientSchedule from './client-schedule/CClientSchedule.vue'

export default [{
    path: "/jobs",
    name: "job-schedule",
    component: CJobManagement,
    meta: {
      caption: "jobschedule",
      resource: "Job",
    }
  },
  {
    path: "/timesheets",
    name: "job-timesheet",
    component: CTimesheets,
    meta: {
      caption: "jobtimesheet",
      resource: "Job",
    }
  },
  {
    path: "/jobs/calendar",
    name: "job-calendar",
    component: CJobCalendar,
    meta: {
      caption: "jobcalendar",
      resource: "Calendar"
    }
  },
  {
    path: "/jobs/clients",
    name: "client-schedule",
    component: CClientSchedule,
    meta: {
      caption: "clientschedule",
      resource: "Calendar"
    }
  },
  {
    path: "/jobs/team",
    name: "team-schedule",
    component: CTeamSchedule,
    meta: {
      caption: "teamschedule",
      resource: "Calendar"
    }
  }]