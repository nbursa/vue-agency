export const UPDATE_SHIFTS = (state, shifts) => {
  state.shifts = shifts
}

export const UPDATE_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const UPDATE_STATUS = (state, newStatus) => {
  state.status = newStatus
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const SET_SELECTED_SHIFTS = (state, payload) => state.selectedShifts = payload

export const SET_ADDITIONAL = (state, payload) => {
  // if (state.additionals.length) {
  //   const match = state.additionals.find(item => item.name === payload.name)
  //   if (match) {
  //     match.value = +payload.value
  //   } else {
  //     state.additionals.push(payload)
  //   }
  // } else {
  //   state.additionals.push(payload)
  // }
  payload.index = !state.additionals.length ? 0 : state.additionals[state.additionals.length - 1].index + 1
  state.additionals.push(payload)
}

export const CLEAR_ADDITIONALS = (state) => {
  state.additionals = []
}

export const REMOVE_ADDITIONAL = (state, payload) => {
  state.additionals = state.additionals.filter(additional => {
    return additional.index !== payload
  })
}
