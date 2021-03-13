import { api } from "@/axios"


/** TO BE FIXED ON BACKEND TEMP SOLUTION ONLY **/
const tempStatusMap = {
  abgesagt: "cancelled",
  angenommen: "accepted",
  arbitrierungAusstehend: "arbitrationPending",
  erstellt: "created",
  genehmigungAusstehend: "signOffPending",
  inBearbeitung: "inProgress",
  inRechnungGestellt: "invoiced",
  rechnungAusstehend: "invoicePending",
  schichtwechselAusstehend: "swapPending",
  schichtweitergabeAusstehend: "passOnPending",
  wurdeNieBesetzt: "neverFilled",
  zeichnungDesAdministratorsAusstehend: "adminSignOffPending",
}

const tempStatusLangRemap = (data, statusMap) => {
  try {
    const mainKey = Object.keys(data)[0]
    const jobs = Object.keys(data[mainKey].jobs).reduce( (jobs, item) => {
      if(statusMap[item]) {
        jobs[statusMap[item]] = data[mainKey].jobs[item]
      } else {
        jobs[item] = data[mainKey].jobs[item]
      }
      return jobs
    }, {})


    return {
      [mainKey]: { ...data[mainKey], jobs }
    }
  } catch(e) {
    return null
  }
}
/** TO BE FIXED ON BACKEND TEMP SOLUTION ONLY **/


// Fetch all jobs
export const fetchJobs = async ({ range }) => {
  const params = range || null
  const res = await api.get("/calendar", { params })
  const data = res.data.data
  return Promise.resolve(data)
}

// Fetch job data per selected day
export const fetchJobsByDay = async dayFormatted => {
  const res = await api.get(`/calendar/${dayFormatted}`)

  const cellData = res.data.data

  const jobStatusFix = tempStatusLangRemap(cellData, tempStatusMap) || cellData
  return Promise.resolve( jobStatusFix )
}
