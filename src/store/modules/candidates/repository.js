import { api } from '@/axios'
import qs from 'qs'

const updateGradeId = (candidate) => {
  return candidate.jobTypes.map((jobType) => {
    if (jobType.grade) {
      jobType.grade_id = jobType.grade.id
    }
    return jobType
  })
}

const defaultQueryParams = {
  page: 1,
  orderBy: 'id',
  sortBy: 'desc'
}

export const all = (options) => {
  const queryParams = _.merge({}, defaultQueryParams, options)
  if (queryParams.orderByRelation) delete queryParams.orderBy

  return api
    .get('/temps?include=hours_worked', {
      params: queryParams,
      paramsSerializer: function (params) {
        return qs.stringify(params, {
          encode: false
        })
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
      '/temps/' +
        id +
        '?include=jobTypes.grade,jobTypes.is_compliant,agencies,hours_worked,attribute_values,sick_leave,notes.user.role'
    )
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const search = (options) => {
  return api
    .get('/temps', { params: options })
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const save = (candidate) => {
  updateGradeId(candidate)
  return api
    .post('/users/invite', candidate)
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const update = (candidate) => {
  updateGradeId(candidate)
  return api
    .put('/temps/' + candidate.id, candidate)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const upload = (csv) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return api
    .post('/temps/import', csv, config)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const destroy = (candidateId) => {
  return api
    .delete('/users/' + candidateId)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const updateJobType = (options) => {
  return api
    .put('/temps/' + options.tempId + '/job-types', options)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => Promise.reject(e))
}

export const saveJobType = (options) => {
  return api
    .post('/temps/' + options.tempId + '/job-types', options)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => Promise.reject(e))
}

export const deleteJobType = (options) => {
  return api
    .delete('/temps/' + options.tempId + '/job-types', options)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => Promise.reject(e))
}
