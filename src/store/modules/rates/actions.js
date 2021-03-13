import * as repository from './repository'
import { snakeCase } from 'lodash'

export const getAllOptions = async ({ commit, state }) => {
  try {
    const jobTimeType = {
      schedule: state.hasScheduled,
      activeTable: state.activeTable
    }
    const data = await repository.getAllOptions(jobTimeType)
    commit('SET_ALL_OPTIONS', data)
  } catch (e) {
    console.log('action:payrates-getAllOptions', e)
  }
}

export const getAllPayrates = async ({ state, commit }, options) => {
  try {
    commit('UPDATE_STATUS', true)
    commit('UPDATE_RATE_QUERY', options)

    const optionTableType = Object.assign({}, options, state.lastRateQuery, {
      type: state.activeTable
    })

    const data = await repository.getAllPayrates(optionTableType)

    commit('SET_ALL_PAYRATES', data.data)
    commit('UPDATE_META', data.meta.pagination)
    commit('UPDATE_STATUS', false)
  } catch (e) {
    console.log('action:payrates-getAllPayrates', e)
    return Promise.reject(e)
  }
}

export const updatePayrates = async ({ commit, dispatch }, payload) => {
  try {
    const { data, options } = payload
    commit('SET_ERRORS', {})
    await repository.updatePayrates(data)
    dispatch('getAllPayrates', options)
  } catch (e) {
    commit('SET_ERRORS', e.data.errors)
    commit('UPDATE_STATUS', false)
    return Promise.reject(e)
  }
}

export const createPayrates = async ({ commit, dispatch }, payload) => {
  try {
    const { data, options } = payload
    commit('SET_ERRORS', {})
    await repository.createPayrates(data)
    dispatch('getAllPayrates', options)
  } catch (e) {
    commit('SET_ERRORS', e.data.errors)
    commit('UPDATE_STATUS', false)
    return Promise.reject(e)
  }
}

export const publishPayrates = async ({ dispatch, commit }, payload) => {
  try {
    commit('SET_SIDEBAR_STATUS', true)

    await repository.publishPayrates(payload)
    dispatch('getPublishDate')
    commit('SET_SIDEBAR_STATUS', false)
  } catch (e) {
    console.log('action:payrates-publish', e)
    commit('SET_SIDEBAR_STATUS', false)
    return Promise.reject(e)
  }
}

export const setActiveTable = async ({ commit }, payload) => {
  try {
    commit('SET_ACTIVE_TABLE', payload)
  } catch (e) {
    console.log('action:payrate-setActivetable', e)
  }
}

export const getPublishDate = async ({ commit }) => {
  try {
    const data = await repository.getScheduledPublishDate()
    commit('SET_PUBLISH_DATE', data)
    return data
  } catch (e) {
    console.log('action:payrate-getPublishDate', e)
    return Promise.reject(e)
  }
}

export const filterRates = async ({ dispatch, state, commit }, selected) => {
  try {
    const options = {
      page: 1
    }
    Object.keys(selected).forEach((item) => {
      if (selected[item] && selected[item].length !== 0 && Array.isArray(selected[item])) {
        options[`${snakeCase(item)}`] = selected[item]
          .map((item) => item['id'])
          .join()
      } else {
        if (selected[item]) {
          options[`${snakeCase(item)}`] = selected[item]
        }
      }
    })

    options.type = state.activeTable
    commit('UPDATE_QUERY', options)
    dispatch('getAllPayrates', options)
  } catch (e) {
    console.log('err:actions-filterRates', e)
  }
}

export const updateBulkRates = async ({ state, dispatch }, selected) => {
  try {
    const payload = {
      data: {},
      options: state.lastRateQuery
    }
    console.log('selected', selected)
    Object.keys(selected).forEach((item) => {
      if (Array.isArray(selected[item])) {
        if (selected[item].length !== 0) payload.data[item] = selected[item]
      } else {
        if (selected[item] !== null) payload.data[item] = selected[item]
      }
    })
    dispatch('updatePayrates', payload)
  } catch (e) {
    console.log('err:actions-bulkupdate', e)
  }
}

export const createBulkRates = async ({ state, dispatch }, selected) => {
  try {
    const payload = {
      data: {},
      options: state.lastRateQuery
    }
    console.log('selected', selected)
    Object.keys(selected).forEach((item) => {
      if (Array.isArray(selected[item])) {
        if (selected[item].length !== 0) payload.data[item] = selected[item]
      } else {
        if (selected[item] !== null) payload.data[item] = selected[item]
      }
    })
    dispatch('createPayrates', payload)
  } catch (e) {
    console.log('err:actions-bulkcreate', e)
  }
}

export const updateTableItem = ({ commit, state, dispatch }, data) => {
  try {
    commit('UPDATE_STATUS', true)

    const readyPayload = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== null) {
        if (typeof data[key] === 'object') {
          let keyName = `${snakeCase(key)}s`
          acc[keyName] = [
            {
              id: data[key].id
            }
          ]
          return acc
        } else {
          acc[snakeCase(key)] = Number(data[key])
          return acc
        }
      }
      return acc
    }, {})
    console.log(readyPayload)
    const payload = {
      data: readyPayload,
      options: state.lastRateQuery
    }
    dispatch('updatePayrates', payload)
  } catch (e) {
    commit('UPDATE_STATUS', false)
    console.log('err:action-update-table-rate', e)
  }
}

export const cancelPublish = async ({ commit, dispatch }) => {
  try {
    commit('SET_SIDEBAR_STATUS', true)
    await repository.deletePublishDate()
    dispatch('getPublishDate')
    commit('SET_SIDEBAR_STATUS', false)
  } catch (e) {
    commit('SET_SIDEBAR_STATUS', false)
    console.log('err:action-cancel-publish', e)
  }
}

export const updateTableMode = async ({ commit }, payload) => {
  try {
    commit('SET_TABLE_MODE', payload)
  } catch (e) {
    console.log('err:action-updateTableMode', e)
  }
}

export const updateMarginMode = async ({ commit }, payload) => {
  try {
    commit('SET_MARGIN_MODE', payload)
  } catch (e) {
    console.log('err:action-updateMarginMode', e)
  }
}

export const resetQueryList = async ({ commit }) => {
  try {
    commit('UPDATE_QUERY', {})
  } catch (e) {
    console.log('reset')
  }
}

export const getClients = async ({ commit }) => {
  try {
    const response = await repository.getClients()
    commit('SET_CLIENTS', response)
  } catch (e) {
    console.log('client error', e)
  }
}

export const getDayTimes = async ({ commit }) => {
  try {
    const response = await repository.getJobTimes()
    commit('SET_DAYTIMES', response)
  } catch (e) {
    console.log('day time error', e)
  }
}

export const deletePayrate = async ({ commit }, id) => {
  try {
    commit('SET_SIDEBAR_STATUS', true)
    await repository.deletePayrate(id)
    commit('SET_SIDEBAR_STATUS', false)
  } catch (e) {
    commit('SET_SIDEBAR_STATUS', false)
    return Promise.reject(e)
  }
}
