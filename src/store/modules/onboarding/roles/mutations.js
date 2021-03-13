import Vue from "vue"
import {
  uniqBy,
  difference
} from "lodash"
import {
  parse
} from "querystring";

export const SET_ALL_PERMISSIONS = (state, payload) => state.permissions = payload

export const SET_SELECTED_PERMISSIONS = (state, payload) => {

  const permissions = state.roleSelected.permissions

  if (payload.length) {
    permissions.push(...payload)
  } else {
    permissions.push(payload)
  }

  const deduped = uniqBy(permissions, item => {
    return item.id
  })
  state.roleSelected.permissions = deduped
}

export const DELETE_PERMISSIONS = (state, payload) => {
  // console.log(payload)
  const diffArr = Array.isArray(payload) ? payload : [payload]
  /*
   * Removes perrmissions by creating a difference array of values unincluded in the passed collections
   */
  const diff = difference(state.roleSelected.permissions, diffArr)
  state.roleSelected.permissions = diff
}

export const SET_ALL_ROLES = (state, payload) => state.roles = payload

export const SET_NEW_ROLE = (state, payload) => state.roles.push(payload)

export const SET_SELECTED_ROLE = (state, payload) => state.roleSelected = payload

export const UPDATE_ROLE = (state, payload) => {
  const {
    id
  } = payload
  const idx = state.roles
    .map(role => {
      return role.id
    })
    .indexOf(id)
  Vue.set(state.roles, idx, payload)
}

export const DELETE_ROLE = (state, payload) => {
  const {
    id
  } = payload
  const idx = state.roles
    .map(role => {
      return role.id
    })
    .indexOf(id)

  if (state.roleSelected && state.roleSelected.id === payload.id) state.roleSelected = {}

  state.roles.splice(idx, 1)
}