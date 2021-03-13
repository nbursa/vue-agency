import { filters } from './filterList'

export const UPDATE_ACTIVE_MODULE = (state, value) => {
  state.activeModule = value
}

export const UPDATE_FIELD_VALUE = (state, value) => {
  // console.log("updater", value)
  Object.keys(state.filters).forEach((filterKey) => {
    const fieldKey = Object.keys(value)[0]
    if (filterKey === fieldKey) {
      state.filters[fieldKey] = value[fieldKey]
    }
  })
}

//TODO: dynamic filter clear
export const CLEAR_REPORT_FILTERS = (state) => {
  // console.log("cleanup", state.filters)
  state.filters = { ...filters }
  // console.log(state.filters)
}

export const SET_PAYROLLS = (state, payload) => {
  state.payrolls = Object.assign({}, state.payrolls, { ...payload })
}
