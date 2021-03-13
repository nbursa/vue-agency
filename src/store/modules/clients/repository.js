import { api } from '@/axios'
import { generateTree } from '@/utils/general'
import axios from 'axios'

export const all = (parentId) => {
  let url = '/clients/one-level?response_type=all&include=children_count'
  if (parentId) {
    url = url + '&parent_id=' + parentId
  }
  return api
    .get(url)
    .then((response) => {
      let clients = {
        name: 'clients',
        id: 0,
        children: response.data.data
      }
      return Promise.resolve(clients)
    })
    .catch((e) => Promise.reject(e))
}

export const get = (id) => {
  return api
    .get(
      '/clients/' + id + '?include=area,notes.user.role,excluded_temps,agencies'
    )
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => Promise.reject(e))
}

export const save = (user) => {
  return api
    .post('/clients', user)
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const getAllWithChildren = () => {
  let url = '/clients?response_type=all&include=agencies'
  return api
    .get(url)
    .then((res) => {
      return Promise.resolve(generateTree(res.data.data))
    })
    .catch(({ data }) => {
      return Promise.reject(data)
    })
}

export const getAllWithChildrenAndDayTimes = () => {
  let url = '/clients?response_type=all&include=agencies,day_times,area'
  return api
    .get(url)
    .then((res) => {
      return Promise.resolve(generateTree(res.data.data))
    })
    .catch(({ data }) => {
      return Promise.reject(data)
    })
}

export const getClientsOneLevel = () => {
  let url = '/clients/one-level'
  return api
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data.data)
    })
    .catch(({ data }) => {
      return Promise.reject(data)
    })
}

export const update = (user) => {
  return api
    .put(
      '/clients/' +
        user.id +
        '?include=area,notes.user.role,excluded_temps,agencies',
      user
    )
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const destroy = (userId) => {
  return api
    .delete('/clients/' + userId)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
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

export const sendClientTimesheet = async (id) => {
  try {
    return await api.post(`clients/${id}/send-timesheet`)
  } catch (e) {
    return e
  }
}
