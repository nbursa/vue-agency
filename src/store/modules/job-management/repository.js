import { api } from '@/axios'
import axios from 'axios'
import qs from 'qs'

export const all = (options) => {
  let defaultQueryParams = {
    page: 1,
    orderBy: 'ID',
    sortBy: 'desc',
    include:
      'client,jobRequest.jobType,geo_location,user,signOff,signOff.user,bonuses,notes,user.hours_worked'
  }

  let queryParams = _.assign({}, defaultQueryParams, options)
  if (options.orderBy) {
    queryParams.orderBy = options.orderBy
  } else if (options.orderByRelation) {
    queryParams.orderByRelation = options.orderByRelation
    delete queryParams.orderBy
  }

  return api
    .get('/jobs', {
      params: queryParams,
      paramsSerializer: function (params) {
        return qs.stringify(params, { encode: false })
      }
    })
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((e) => Promise.reject(e))
}

export const get = (id) => {
  return api
    .get(
      '/jobs/' +
        id +
        '?include=client,jobRequest.jobType,jobRequest.agency,user,bonuses,jobRequest.attribute_values.attribute,signOff,signOff.user,signOff.note,notes,jobRequest.grade'
    )
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const getJobLogs = (id) => {
  return api
    .get('/jobs/' + id + '?include=logs,logs.user')
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const getJobRequest = (id) => {
  return api
    .get('/jobs/' + id + '?include=client,jobRequest,geo_location,user,bonuses')
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const geoloc = (address) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDMK5f0fByJdDDrzQVBQOWNUljlECUPxII`
    )
    .then((response) => {
      return Promise.resolve(response.data.results)
    })
    .catch((e) => Promise.reject(e))
}

export const getRequestGeoloc = (id) => {
  // ?include=geo_location
  return api
    .get('/job-requests/' + id + '/geo-locations')
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const cancel = (id) => {
  return api
    .put('/jobs/' + id + '/cancel')
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const update = (options) => {
  return api
    .put(`/jobs/${options.id}`, options)
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const signOffJob = (options) => {
  return api
    .post(`/jobs/${options.id}/sign-off`, options)
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const getJobsByRequestId = (requestId) => {
  return api
    .get(`/jobs?job_request_id=${requestId},status=created,response_type=all`)
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const fetchJobForRepush = (id) => {
  return api
    .get(
      `/jobs/${id}?include=client,jobRequest.jobType,user,bonuses,jobRequest.attribute_values.attribute,grade`
    )
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const repushJobs = (requestId) => {
  return api
    .post(`/job-requests/${requestId}/push`)
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}
