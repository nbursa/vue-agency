import { api } from "@/axios"
import qs from "qs"

const defaultQueryParams = {
  page: 1,
  orderBy: "ID",
  sortBy: "desc"
}

export const all = async options => {
  const queryParams = _.assign({}, defaultQueryParams, options)
  const response = await api.get("/clients/jobs?response_type=all&include=dates,jobs.user,jobs.jobRequest.jobType", { params: queryParams })
  return response.data
}

export const fetchClientJobs = async options => {
  const { id, date, query } = options
  const response = await api.get(
    `/clients/${id}/jobs/${date}?include=user,user.hours_worked,jobRequest.jobType`,
    {
      params: query
    }
  )
  return response.data.data
}

export const fetchClientWorkers = async options => {
  const {id, query} = options
  const response = await api.get(`/clients/${id}?include=jobs.user,jobs.jobRequest.jobType`, {
    params: {
      ...query,
      // isForEmployees: false
    }
  })
  return response.data.data
}

export const fetchAllCandidates = async options => {
  const { jobId, query } = options

  const queryParams = _.merge({}, defaultQueryParams, query)

  const response = await api.get(
    `/jobs/${jobId}/temps?include=hours_worked&responseType=all`,
    {
      params: queryParams
    }
  )

  return response.data
}

export const update = async  options => {
  const { jobId, userId, query } = options
  const reponse = await api.put(`/jobs/${jobId}?include=user,user.hours_worked,jobRequest.jobType`, { userId }, {params: query})
  return reponse.data
}
