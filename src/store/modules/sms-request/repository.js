import { api } from "@/axios"
import qs from "qs"

export const getRequest = (payload) => {
  return api
    .get(`/job-requests/${payload.token}?include=jobType,jobs,agency&email=${payload.email}`)
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(err => { 
      return Promise.reject(err.data.message)
    })
}

export const accept = (payload) => {
  return api
    .post(`/job-requests/${payload.requestId}/accept?email=${payload.email}${payload.serializedLineGroups}`)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(err => { 
      return Promise.reject(err)
    })
}

export const reject = (payload) => {
  return api
    .post(`/job-requests/${payload.requestId}/reject?email=${payload.email}`)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(err => { 
      return Promise.reject(err)
    })
}
