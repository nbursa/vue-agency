import CReports from './CReports'
import CReportsTable from './CReportsTable'

export default [
  {
    path: '/reports',
    name: 'reporting',
    component: CReports,
    meta: {
      caption: 'reporting'
    }
  },
  {
    path: '/reports-hours',
    name: 'reportHours',
    component: CReportsTable,
    meta: {
      caption: 'reporting',
      breadcrumbs: ['hoursWorked'],
      backButton: 'reporting'
    }
  },
  {
    path: '/reports-jobs',
    name: 'reportJobs',
    component: CReportsTable,
    meta: {
      caption: 'reporting',
      breadcrumbs: ['listJobs'],
      backButton: 'reporting'
    }
  },
  {
    path: '/reports-inactivity',
    name: 'reportInactivity',
    component: CReportsTable,
    meta: {
      caption: 'reporting',
      breadcrumbs: ['candidateInactivity'],
      backButton: 'reporting'
    }
  },
  {
    path: '/reports-activity',
    name: 'reportActivity',
    component: CReportsTable,
    meta: {
      caption: 'reporting',
      breadcrumbs: ['candidateActivity'],
      backButton: 'reporting'
    }
  },
  {
    path: '/reports-worklog',
    name: 'reportWorklog',
    component: CReportsTable,
    meta: {
      caption: 'reporting',
      breadcrumbs: ['candidateWorklog'],
      backButton: 'reporting'
    }
  },
  {
    path: '/reports-payroll',
    name: 'reportPayroll',
    component: CReportsTable,
    meta: {
      caption: 'reporting',
      breadcrumbs: ['payroll'],
      backButton: 'reporting'
    }
  }
]
