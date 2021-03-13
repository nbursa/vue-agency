import Vue from 'vue'

export const SET_MODAL_DATA = (state, data) => {
  state.data = data
}

export const TOGGLE_MODAL = (state, trueOrFalse) => {
  state.toggle = trueOrFalse
}

export const SET_MODAL_COMPONENT = (state, component) => {
  state.modalComponent = component
}
