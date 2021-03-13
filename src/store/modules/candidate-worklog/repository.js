import { api } from '@/axios'

import qs from 'qs'

const defaultQueryParams = {
  page: 1
}

export const all = async (options) => {
  console.log('get all candidates: ', options)
  const queryParams = Object.assign({}, defaultQueryParams, options)
  const response = await api.get(
    'job-invoices?include=job.jobRequest.jobType,job.user.attribute_values,job.client',
    {
      params: queryParams,
      paramsSerializer: function (params) {
        return qs.stringify(params, {
          encode: false
        })
      }
    }
  )
  return response.data
}
