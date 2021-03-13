class Job {
  users = [] 
  agencyId = null 
  jobTypeId = null 
  attributeValues = [] 
  paymentType = null 
  startTime =  '' 
  endTime =  '' 
  startHours =  '' 
  endHours =  '' 
  clientId = null 
  numberOfCandidates = null 
  gradeId = null 
  requestType = 1 
  selectedDates = [] 
  note = null 
  bonuses = null 
  breakMinutes = null 
  isBreakPayable = null 
  isBreakChangeable = null 
  isRateChangeable = null 
  rateOverride = {
    rate: 0,
    margin: null,
    type: null,
    monetary: null
  }
}

export default Job