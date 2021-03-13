import { api } from '@/axios'
import { omitBy, isNil } from 'lodash'

export const getAll = async () => {
  /*
   * Lowest level to call api methods
   * Do any data transformation in this layer if needed
   */
  try {
    const res = await api.get('/users')
    let users = res.data.data
    return Promise.resolve(users)
  } catch (err) {
    return Promise.reject(err)
  }
}

/*
 * TODO make more purposeful later, not just for profile
 * but for any ONE user
 */
export const getOne = async () => {
  const profile = await api.get('/profile')
  return profile.data.data
}

/*
 * TODO make more purposeful later, not just for profile
 * but for any ONE user
 */
export const updateOne = async (payload) => {
  /* Remove null & undefined values from object */
  const sanitizedPayload = omitBy(payload, isNil)

  const res = await api.put('/profile', sanitizedPayload)
  const user = res.data.data
  return Promise.resolve(user)
}

export const verifyNumber = async (phoneNumber) => {
  const res = await api.put('/profile/validate-phone', {
    mobilePhone: phoneNumber
  })
  return Promise.resolve(res)
}

export const sendSMSCode = async (smsCode) => {
  const res = await api.post('/profile/validate-phone', {
    verification_code: smsCode
  })
  return Promise.resolve(res)
}

export const setTwoWayAuthEnabled = async (trueOrFalse) => {
  const res = await api.put('profile/toggle-two-way-auth')
  return Promise.resolve(res.data.data)
}

export const resetPassword = async (password) => {
  try {
    const res = await api.put('/users/update-password', password.data)
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err.data.errors)
  }
}
