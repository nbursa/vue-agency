import * as repository from "./repository"
import {
  snakeCase
} from "lodash"

export const getAllMargins = async ({
  commit,
}, options) => {
  try {
    commit("UPDATE_STATUS", true)
    commit("UPDATE_MARGIN_QUERY", options)
    const data = await repository.all(options)
    commit("SET_ALL_MARGINS", data.data)
    commit("UPDATE_META", data.meta.pagination)
    commit("UPDATE_STATUS", false)
  } catch (e) {
    console.log('action:margins-getAllMargins', e)
    return Promise.reject(e)
  }
}

export const updateFieldValue = ({ commit }, field) => {
  console.log("updater", field)
  commit("UPDATE_FIELD_VALUE", field)
}

export const updateMargins = async ({
  dispatch,
  commit
}, payload) => {
  try {
    const {
      data,
      options
    } = payload
    await repository.update(data)
    dispatch("getAllMargins", options)
  } catch (e) {
    console.log('action:margins-update', e)
    commit("UPDATE_STATUS", false)
    return Promise.reject(e)
  }
}

export const updateBulkMargins = async ({
  state,
  dispatch
}, selected) => {
  try {
    const payload = {
      data: {},
      options: state.lastMarginQuery
    }
    Object.keys(selected).forEach(item => {
      if (selected[item] && selected[item].length !== 0) payload.data[item] = selected[item]
    })
    console.log("UPDATE PAYLOAD", payload)
    dispatch("updateMargins", payload)
  } catch (e) {
    console.log("err:actions-bulkupdate", e)
  }
}

export const filterMargins = async ( { commit, dispatch } , payload) => {
  dispatch("getAllMargins", payload)
}

export const updateTableItem =  ({
  commit,
  state,
  dispatch
}, data ) => {
  try {
    //stuff got change, cant use this as general f
    commit("UPDATE_STATUS", true)

    const readyPayload = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== null) {
        if (typeof data[key] === "object") {
          let keyName = `${snakeCase(key)}s`
          acc[keyName] = [{
            id: data[key].id
          }]
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

    dispatch("margins/updateMargins", payload, {root: true})

  } catch (e) {
    commit("UPDATE_STATUS", false)
    console.log("err:action-update-table-rate", e)
  }
}

export const reset = async () => {

}