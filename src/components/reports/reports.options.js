import Candidates from '@/store/modules/candidates/'
import candidateInactivity from '@/store/modules/candidate-inactivity'
import jobManagement from '@/store/modules/job-management'
import UserName from '@/components/shared/table/VUserName'
import VCandidateCell from '@/components/jobs/job-scheduleList/VCandidateCell'
import candidateActivity from '../../store/modules/candidate-activity'
import candidateWorklog from '../../store/modules/candidate-worklog'
import reports from '../../store/modules/reports'

// filterList: [
//   "jobTypes", "agencies", "grades", "clients", "attributes", "status"
// ]

//TODO AFTER RATES REWORK PRUNE AND REFACTOR

const reportHours = {
  type: 'reportHours',
  cardName: 'report_0.title',
  cardDescription: 'report_0.description',
  permission: 'hoursWorked',
  routeName: 'reportHours',
  table: [
    {
      show: 'id',
      label: 'reporting.hours_table.col_0',
      width: 0.25
    },
    {
      component: UserName,
      label: 'reporting.hours_table.col_1',
      width: 0.5
    },
    {
      show: 'hoursWorked',
      label: 'reporting.hours_table.col_2',
      width: 0.25
    }
  ],
  store: {
    storeModule: Candidates,
    tableFiller: { type: 'state', name: 'candidates' },
    tableAction: 'getCandidates'
  },
  sidebarFilters: {
    filterButtonLabel: 'reporting.button_filter_workHours',
    reportFileName: 'hoursWorked',
    reportGeneratorUrl: '/reports/hours-worked',
    filterList: ['jobTypes', 'grades', 'attributes']
  }
}

const reportJobs = {
  type: 'reportJobs',
  cardName: 'report_1.title',
  cardDescription: 'report_1.description',
  permission: 'jobs',
  routeName: 'reportJobs',
  table: [
    {
      show: 'id',
      label: 'reporting.jobs_table.col_6',
      width: 0.25
    },
    {
      show: 'jobRequest.jobType.name',
      label: 'reporting.jobs_table.col_0'
    },
    {
      component: VCandidateCell,
      label: 'reporting.jobs_table.col_1',
      type: 'date'
    },
    {
      show: 'client.name',
      label: 'reporting.jobs_table.col_2'
    },
    {
      show: 'status',
      label: 'reporting.jobs_table.col_7'
    },
    {
      show: 'jobTime',
      label: 'reporting.jobs_table.col_4'
    },
    {
      show: 'startTime',
      label: 'reporting.jobs_table.col_5',
      type: 'date'
    }
  ],
  store: {
    storeModule: jobManagement,
    tableFiller: {
      type: 'getters',
      name: 'reports/reportTable/getJobsWithDateTime'
    },
    tableAction: 'fetchJobs'
  },
  sidebarFilters: {
    filterButtonLabel: 'reporting.button_filter_jobs',
    reportFileName: 'jobsList',
    reportGeneratorUrl: '/reports/jobs',
    filterList: ['jobTypes', 'agencies', 'clients', 'status']
  }
}

const reportInactivity = {
  type: 'reportInactivity',
  cardName: 'report_2.title',
  cardDescription: 'report_2.description',
  permission: 'candidateInactivity',
  routeName: 'reportInactivity',
  table: [
    {
      show: 'userId',
      label: 'reporting.jobs_table.col_6',
      width: 0.25
    },
    {
      show: 'name',
      label: 'reporting.inactivity_table.col_0',
      width: 0.5
    },
    {
      show: 'holiday',
      label: 'reporting.inactivity_table.col_2',
      width: 0.25
    },
    {
      show: 'sick',
      label: 'reporting.inactivity_table.col_3',
      width: 0.25
    },
    {
      show: 'unavailable',
      label: 'reporting.inactivity_table.col_4',
      width: 0.25
    },
    {
      show: 'total',
      label: 'reporting.inactivity_table.col_5',
      width: 0.25
    }
  ],
  store: {
    storeModule: candidateInactivity,
    tableFiller: { type: 'state', name: 'candidateInactivity' },
    tableAction: 'getCandidateInactivity'
  },
  sidebarFilters: {
    filterButtonLabel: 'reporting.button_filter_workHours',
    reportFileName: 'candidateInactivity',
    reportGeneratorUrl: '/reports/candidate-inactivity',
    filterList: ['agencies']
  }
}

const reportActivity = {
  type: 'reportActivity',
  cardName: 'report_3.title',
  cardDescription: 'report_3.description',
  permission: 'candidateActivity',
  routeName: 'reportActivity',
  table: [
    {
      show: 'id',
      label: 'reporting.jobs_table.col_6',
      width: 0.25
    },
    {
      show: 'name',
      label: 'reporting.activity_table.col_0'
    },
    {
      show: 'jobsCount',
      label: 'reporting.activity_table.col_1'
    },
    {
      show: 'hoursWorked',
      label: 'reporting.activity_table.col_2'
    },
    {
      show: 'daysWorked',
      label: 'reporting.activity_table.col_4'
    },
    {
      show: 'earnings',
      label: 'reporting.activity_table.col_3'
    }
  ],
  store: {
    storeModule: candidateActivity,
    tableFiller: { type: 'state', name: 'candidateActivity' },
    tableAction: 'getCandidateActivity'
  },
  sidebarFilters: {
    filterButtonLabel: 'reporting.button_filter_workHours',
    reportFileName: 'candidateActivity',
    reportGeneratorUrl: '/reports/candidate-activity',
    filterList: ['agencies', 'candidates']
  }
}

const reportWorklog = {
  type: 'reportWorklog',
  cardName: 'report_4.title',
  cardDescription: 'report_4.description',
  permission: 'candidateActivity',
  routeName: 'reportWorklog',
  table: [
    {
      show: 'candidateName',
      label: 'reporting.worklog_table.col_0'
    },
    {
      show: 'earnings',
      label: 'reporting.worklog_table.col_6'
    },
    {
      show: 'hourlyWorked',
      label: 'reporting.worklog_table.col_2'
    },
    {
      show: 'hourlyRate',
      label: 'reporting.worklog_table.col_3'
    },
    {
      show: 'hourlyChargeRate',
      label: 'reporting.worklog_table.col_4'
    },
    {
      show: 'breakTime',
      label: 'reporting.break_time'
    }
  ],
  store: {
    storeModule: candidateWorklog,
    tableFiller: { type: 'state', name: 'candidateWorklog' },
    tableAction: 'getCandidateWorklog'
  },
  sidebarFilters: {
    filterButtonLabel: 'reporting.button_filter_workHours',
    reportFileName: 'candidateWorkLog',
    reportGeneratorUrl: '/reports/candidate-work-history',
    filterList: []
  }
}

const reportPayroll = {
  type: 'reportPayroll',
  cardName: 'report_payroll',
  cardDescription: 'report_payroll_card',
  permission: 'hoursWorked',
  routeName: 'reportPayroll',
  table: [
    {
      show: 'jobId',
      label: 'reporting.payroll.job_id',
      width: 0.5
    },
    {
      show: 'jobStartTime',
      label: 'reporting.payroll.start_time',
      width: 1
    },
    {
      show: 'externalRef',
      label: 'reporting.payroll.payroll_id',
      width: 1
    },
    {
      show: 'workerName',
      label: 'reporting.payroll.name',
      width: 1
    },
    {
      show: 'jobTitle',
      label: 'reporting.payroll.title',
      width: 1
    },
    {
      show: 'jobName',
      label: 'reporting.payroll.job_name',
      width: 1
    },
    {
      show: 'user.hoursWorked',
      label: 'reporting.payroll.quantity',
      width: 1
    },
    {
      show: 'unit',
      label: 'reporting.payroll.unit',
      width: 1
    },
    {
      show: 'paymentType',
      label: 'reporting.payroll.payrate',
      width: 1
    },
    {
      show: 'total',
      label: 'reporting.payroll.total',
      width: 1
    }
  ],
  store: {
    // storeModule: jobManagement,
    // tableFiller: {
    //   type: 'getters',
    //   name: 'reports/reportTable/getJobsWithDateTime'
    // },
    // tableAction: 'fetchJobs'
    storeModule: reports,
    tableFiller: {
      type: 'getters',
      name: 'reports/reportTable/getPayrolls'
    },
    tableAction: 'getPayrolls'
  },
  sidebarFilters: {
    filterButtonLabel: 'Filter payrolls',
    reportFileName: 'hoursWorked',
    reportGeneratorUrl: '/reports/hours-worked',
    filterList: []
  }
}

export default {
  reportHours,
  reportJobs,
  reportInactivity,
  reportActivity,
  reportWorklog,
  reportPayroll
}
