export default {
  tableColumnSwitcher: {
    showOnRoute: 'reportWorklog',
    optionalColumns: [
      {
        id: 1,
        label: 'reporting.payrol_id',
        hideCell: false,
        show: 'job.user.payrollId'
      },
      { id: 2, label: 'reporting.times', hideCell: false, show: 'times' },
      { id: 3, label: 'reporting.attributes', hideCell: false, show: 'attrs' },
      {
        id: 4,
        label: 'reporting.note',
        hideCell: false,
        show: 'job.jobRequest.note'
      },
      {
        id: 5,
        label: 'reporting.job_type',
        hideCell: false,
        show: 'job.jobRequest.jobType.name'
      },
      {
        id: 6,
        label: 'reporting.client_name',
        hideCell: false,
        show: 'clientName'
      }
    ],
    selectorPlaceholder: 'reporting.columns_placeholder'
  },
  textSearch: {
    paramName: 'name',
    placeholder: 'global.search_candidate_name'
  }
}
