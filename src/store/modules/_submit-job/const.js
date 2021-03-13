export const initialState = {
  meta: {},
  errors: [],
  isFetching: false,
  isSaved: false,
  candidates: [],
  candidatesSearch: false,
  job: {
    templates: null,
    users: [],
    agencyId: null,
    jobTypeId: null,
    attributeValues: [],
    paymentType: 1,
    startTime: '',
    endTime: '',
    startHours: '',
    endHours: '',
    clientId: null,
    numberOfCandidates: null,
    gradeId: null,
    requestType: 1,
    selectedDates: [],
    note: null,
    bonuses: [],
    breakMinutes: 0,
    isBreakPayable: false,
    isBreakChangeable: false,
    isRateChangeable: null,
    rateOverride: {
      rate: 0,
      margin: null,
      type: null,
      monetary: null
    },
    name: null,
    is_template: false,
    push_interval: null,
    groupSize: null
  },
  generatedJobs: [],
  templates: [],
  payRates: {},
  candidateGroups: [],
  canSeeRates: false
}
