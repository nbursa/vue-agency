import { api } from '@/axios'

import { app } from '../../../main.js'

import { formatOptions } from './optionsFormatter'

const defaults = {
  page: 1,
  orderBy: 'id',
  include: 'client,client.day_times'
}

export const getAllOptions = async (jobTimeType) => {
  // console.log("GET ALL OPT", jobTimeType)
  const allOptions = await Promise.all([
    getDayTypes(),
    getJobTypes(),
    getAreas(),
    getGrades()
  ]).then((val) => {
    return val
  })
  // console.log("ALL OPTIONS", formatOptions(allOptions))
  return formatOptions(allOptions)
}

export const getAllPayrates = async (options) => {
  const queryParams = _.assign({}, defaults, options)
  let response = await api.get('/pay-rates', {
    params: queryParams
  })
  if (response.data.data.length === 0) {
    delete queryParams.type
    response = await api.get('/pay-rates', {
      params: queryParams
    })
  }

  return response.data
}

export const getDayTypes = async () => {
  const result_de = {
    dayType: [
      {
        name: 'Montag',
        id: 1
      },
      {
        name: 'Dienstag',
        id: 2
      },
      {
        name: 'Mittwoch',
        id: 3
      },
      {
        name: 'Donnerstag',
        id: 4
      },
      {
        name: 'Freitag',
        id: 5
      },
      {
        name: 'Samstag',
        id: 6
      },
      {
        name: 'Sonntag',
        id: 7
      },
      {
        name: 'Feiertag',
        id: 8
      }
    ]
  }
  const result_en = {
    dayType: [
      {
        name: 'Monday',
        id: 1
      },
      {
        name: 'Tuesday',
        id: 2
      },
      {
        name: 'Wednesday',
        id: 3
      },
      {
        name: 'Thursday',
        id: 4
      },
      {
        name: 'Friday',
        id: 5
      },
      {
        name: 'Saturday',
        id: 6
      },
      {
        name: 'Sunday',
        id: 7
      },
      {
        name: 'Holiday',
        id: 8
      }
    ]
  }
  const result = app.$i18n.locale === 'de' ? result_de : result_en
  return await result
}

export const getJobTimes = async (payload) => {
  // console.log("JOBTIMECHECK", schedule, activeTable)
  const response = await api.get('/day-times')
  return response.data.data.map((item) => {
    let member = {
      id: item.id,
      label: item.name
    }
    return member
  })
}

export const getJobTypes = async () => {
  const response = await api.get('/job-types?response_type=all')
  return {
    jobType: response.data.data
  }
}

export const getAreas = async () => {
  const response = await api.get('/areas?response_type=all')
  return {
    area: response.data.data
  }
}

export const getGrades = async () => {
  const response = await api.get('/grades?response_type=all')
  return {
    grade: response.data.data
  }
}

export const getClients = async () => {
  const response = await api.get(
    '/clients?response_type=all&include=agencies,day_times'
  )
  return response.data.data
}

export const updatePayrates = async (payload) => {
  return await api.put('/pay-rates', payload)
}

export const createPayrates = async (payload) => {
  return await api.post('/pay-rates', payload)
}

export const publishPayrates = async (payload) => {
  const data = payload
  return await api.post('pay-rates/publish', data)
}

export const getScheduledPublishDate = async () => {
  const response = await api.get('pay-rates/publish')
  // console.log("datecheck", response.data.data)
  const resp = response.data.data
    ? response.data.data.date.split(':00.')[0]
    : ''
  return resp
}

export const deleteScheduledRate = async () => {
  return await api.delete('pay-rates')
}

export const deletePublishDate = async () => {
  return await api.delete('pay-rates/publish')
}

export const checkScheduledRate = async () => {
  return await api.get('pay-rates/is-scheduled')
}

export const deletePayrate = async (id) => {
  return await api
    .delete("/pay-rates/" + id)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}
