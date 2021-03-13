import { isNil, isEmpty, merge } from "lodash"
import { DateTime } from "luxon"

export const nonZeroJobStatuses = state => {
  if (state.cellData && state.cellData !== null) {
    const jobs = state.cellData[Object.keys(state.cellData)[0]].jobs
    if (!isEmpty(jobs)) {
      return Object.keys(jobs).filter(key => {
        return jobs[key] !== 0
      })
    }
  }
}

export const getSanatizedJobs = state => {
  let jobCollection = state.jobs || []
  let dates = []

  if (jobCollection.length > 0) {
    let startDate = DateTime.fromISO(jobCollection[0].date).startOf("month")
    const daysInMonth = startDate.daysInMonth
    let count = 0
    do {
      const date = startDate.plus({ days: count }).toFormat("yyyy-LL-dd")
      dates.push({ date: date, jobs: 0 })
      count++
    } while (count < daysInMonth)
  }


  let hasJobs = jobCollection.filter(item => item.jobs && item.jobs !== 0)

  return hasJobs.length > 0 ? dates.map(date => {
    const a = jobCollection.find(item => item.date == date.date)
    return a ? a : date
  }) : []
}
