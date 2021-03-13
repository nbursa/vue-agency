export const UPDATE_META = (state, payload) => {
  state.meta = payload
}

export const UPDATE_STATUS = (state, payload) => {
  state.status = payload
}

export const SET_ALL_MARGINS = (state, payload) => {
  state.margins = payload
}


export const UPDATE_FIELD_VALUE = (state, value) => {
  console.log("value", state.filters)
  Object.keys(state.filters).forEach(filterKey => {
    const fieldKey = Object.keys(value)[0]
    console.log(fieldKey, filterKey)
    if (filterKey === fieldKey) {
      state.filters[fieldKey] = value[fieldKey]
    }
  })
}

export const UPDATE_MARGIN_QUERY = (state, payload) => {
  state.lastMarginQuery = payload
}