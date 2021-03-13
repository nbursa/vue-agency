import { api } from "@/axios"

export const getCandidates = params => {
  return api
    .post("/jobs/temps?include=jobTypes.grade", params)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const saveJob = job => {
  return api.post("/job-requests?include=users", job).then(response => {
    return Promise.resolve(response.data)
  })
}
