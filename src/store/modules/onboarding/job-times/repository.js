import { api } from '@/axios'
import { wheelFormat } from '@/components/shared/doughnut-wheel/dataFormater'

//for testing
//import DummyData from '@/components/shared/doughnut-wheel/dummy-data.js'

export const fetchJobTimesLive = () => {
  return api
    .get('/day-times')
    .then((response) => {
      const jobtimes = wheelFormat(response.data.data)
      return Promise.resolve(jobtimes)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('repository issue', error)
    })
}

export const fetchJobTimesScheduled = () => {
  return api
    .get('/day-times/scheduled')
    .then((response) => {
      const jobtimes = wheelFormat(response.data.data)
      return Promise.resolve(jobtimes)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('repository issue', error)
    })
}

export const createJobTimes = (jobtimes) => {
  return api
    .post('/day-times', jobtimes)
    .then((response) => {
      const jobtimes = wheelFormat(response.data.data)
      return Promise.resolve(jobtimes)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const updateJobTimes = (jobtimes) => {
  return api
    .put('/day-times', jobtimes)
    .then(() => {
      return Promise.resolve()
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const publishJobTimes = (date) => {
  return api
    .post('/pay-rates/publish', date)
    .then(() => {
      return Promise.resolve()
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}
