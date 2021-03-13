import { api } from "@/axios"
import qs from "qs"

const defaultQueryParams = {
  page: 1,
  orderBy: "ID",
  sortBy: "desc",
  include: "jobs.jobRequest.jobType,jobs.client,unavailabilities.dates,hours_worked",
  // isForEmployees: false,
  perPage: 20
}

export const all = async options => {
  try {
    const queryParams = _.assign({}, defaultQueryParams, options)
    const response = await api.get("/temps", {
        params: queryParams,
        paramsSerializer: function (params) {
        return qs.stringify(params, {
          encode: false
        })
      }
    } )
    return response.data
  } catch(e) {
    return Promise.reject(e)
  }
}

export const getJob = async jobId => {
  try {
    const response = await api.get(`/jobs/${jobId}?include=client,user,jobRequest.jobType`)
    return response.data.data
  } catch(e) {
    return Promise.reject(e)
  }
}


export const cancelJob = async jobId => {
  try {
    const response = await api.put(`/jobs/${jobId}/cancel?include=client,user,jobRequest.jobType`)
    return response.data.data
  } catch(e) {
    return Promise.reject(e)
  }
}