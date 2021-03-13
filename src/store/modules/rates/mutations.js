export const SET_ALL_OPTIONS = (state, payload) => {
  state.options = payload
}

export const SET_ALL_PAYRATES = (state, payload) => {
  state.payrates = payload
}

export const UPDATE_PAYRATES = (state, payload) => {
  state.payrates = payload
}

export const UPDATE_META = (state, payload) => {
  state.meta = payload
}

export const UPDATE_STATUS = (state, payload) => {
  state.status = payload
}

export const SET_ACTIVE_TABLE = (state, payload) => {
  // console.log(payload)
  state.activeTable = payload.substring(
    payload.indexOf('-') + 1,
    payload.length
  )
}

export const UPDATE_RATE_QUERY = (state, payload) => {
  const allFilters = Object.assign({}, state.lastRateQuery, payload)
  state.lastRateQuery = allFilters
}

export const UPDATE_QUERY = (state, payload) => {
  state.lastRateQuery = payload
}

export const SET_PUBLISH_DATE = (state, payload) => {
  state.publishDate = payload
}

export const SET_SIDEBAR_STATUS = (state, payload) => {
  state.sidebarStatus = payload
}

export const SET_HAS_SCHEDULED = (state, payload) => {
  state.hasScheduled = payload
}

export const SET_TABLE_MODE = (state, payload) => {
  state.tableMode = payload
}

export const SET_MARGIN_MODE = (state, payload) => {
  state.marginMode = payload
}

export const UPDATE_TABLE_ITEM_STATUS = (state, payload) => {
  state.tableItemStatus = payload
}

export const SET_ERRORS = (state, payload) => {
  state.errors = Object.keys(payload).length
    ? payload[Object.keys(payload)[0]][0]
    : payload
}

export const SET_CLIENTS = (state, payload) => {
  state.clients = payload
}

export const SET_DAYTIMES = (state, payload) => {
  state.dayTimes = payload
}
