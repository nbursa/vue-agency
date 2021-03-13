// Import here repository, as a proxy interface to api methods
/* eslint-disable no-console */
import * as userRepo from '@/store/modules/user-management/repository'
import { caslDecorate } from '@/utils/functional'

export const getUsers = async ({ commit }) => {
  try {
    // caslDecorate repo getter, to obtain collection of User object instances
    // instead of plain objects collection
    const users = await caslDecorate(userRepo.getAll)('User', {
      __someSpecialProp: true
    })
    commit('USERS_UPDATED', users)
  } catch (err) {
    return Promise.reject(err.message)
  }
}

// User profile page
export const getProfile = async ({ commit }) => {
  const profile = await userRepo.getOne()
  commit('UPDATE_PROFILE', profile)
  return Promise.resolve(profile)
}

export const updateProfileNotificationCounter = async ({ commit }) => {
  commit('SET_UNREAD_COUNTER')
}

export const updateProfile = async ({ commit }, payload) => {
  try {
    commit('IS_LOADING', true, { root: true })
    const user = await userRepo.updateOne(payload)
    commit('UPDATE_PROFILE', user)
    commit('IS_LOADING', false, { root: true })
    return Promise.resolve(user)
  } catch (err) {
    commit('IS_LOADING', false, { root: true })
    return Promise.reject(err.message)
  }
}

export const verifyNumber = async ({ commit }, phoneNumber) => {
  try {
    const res = await userRepo.verifyNumber(phoneNumber)
  } catch (_) {}
}

export const sendSMSCode = async ({ commit, dispatch }, smsCode) => {
  try {
    const res = await userRepo.sendSMSCode(smsCode)
    const profile = await dispatch('getProfile')
    return Promise.resolve(profile)
  } catch (_) {}
}

export const setTwoWayAuthEnabled = async ({ commit }, trueOrFalse) => {
  try {
    const { twoWayEnabled } = await userRepo.setTwoWayAuthEnabled(trueOrFalse)
    commit('UPDATE_TWO_WAY_STATUS', twoWayEnabled)
    return Promise.resolve(twoWayEnabled)
  } catch (_) {}
}

export const updatePassword = async ({ commit }, userPassword) => {
  try {
    const res = await userRepo.resetPassword(userPassword)
    return Promise.resolve(userPassword)
  } catch (error) {
    return Promise.reject(error)
  }
}
