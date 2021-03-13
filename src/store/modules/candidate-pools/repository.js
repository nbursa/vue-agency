import { api } from '@/axios'
import qs from 'qs'

const URL = '/pools'

const defaultQueryParams = {
  page: 1,
  orderBy: 'id',
  sortBy: 'desc',
  include: 'users'
}

export const all = async (options) => {
  try {
    const queryParams = _.assign({}, defaultQueryParams, options)
    let response = await api.get(URL, {
      params: queryParams,
      paramsSerializer: function (params) {
        return qs.stringify(params, {
          encode: false
        })
      }
    })
    return response.data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const update = async (payload) => {
  try {
    let poolId = payload.id
    let response = await api.put(`${URL}/${poolId}?include=users`, payload)
    return response.data.data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const create = async (payload) => {
  try {
    const response = await api.post(URL, payload)
    const item = { ...payload, ...response.data.data}
    return item
  } catch (e) {
    return Promise.reject(e)
  }
}

export const destroy = async (payload) => {
  try {
    let response = await api.delete(`${URL}/${payload}`, payload)
    return response
  } catch (e) {
    return Promise.reject(e)
  }
}

export const one = async (payload) => {
  try {
    let response = await api.get(`${URL}/${payload}?include=users`)
    return response.data.data
  } catch (e) {
    return Promise.reject(e)
  }
}
