export const SET_FORM_MODEL = (state, payload) => state.form = Object.assign({}, payload)

export const UPDATE_MODEL = (state, payload) => state.form[payload.key] = payload.value 