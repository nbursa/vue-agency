import Vue from "vue"

export const ADD_SELECTED_ITEM = (state, item) => {
  state.selected = [item]
}

export const REMOVE_SELECTED_ITEM = (state, item) => {
  const {
    id
  } = item
  const idx = state.selected
    .map(selected => {
      return selected.id
    })
    .indexOf(id)
  Vue.delete(state.selected, idx)
}

export const ADD_CHECKED_ITEM = (state, item) => {
  state.checked.push(item)
}

export const CHECK_ALL_ITEMS = (state, items) => {
  state.checked = items
}

export const REMOVE_CHECKED_ITEM = (state, item) => {
  const {
    id
  } = item
  const idx = state.checked
    .map(checked => {
      return checked.id
    })
    .indexOf(id)
  Vue.delete(state.checked, idx)
}

export const CLEAR_CHECKED_ITEMS = (state) => {
  state.checked = []
}

export const CLEAR_SELECTED_ITEMS = (state) => {
  state.selected = []
}

export const ADD_HIDDEN_COLUMN = (state, item) => {
  state.hidden.add(item)
}

export const REMOVE_HIDDEN_COLUMN = (state, item) => {
  state.hidden.delete(item)
}

export const SET_COLUMNS = (state, columns) => {
  state.dynamicColumns = []
  state.dynamicColumns = columns
}

export const ADD_COLUMN = (state, column) => {
  state.dynamicColumns.push(column)
}

export const REMOVE_COLUMN = (state, columnLabel) => {
  const index = state.dynamicColumns.map(column => {
    return column.label
  }).indexOf(columnLabel)
  Vue.delete(state.dynamicColumns, index)
}

export const RESET_COLUMNS = (state) => {
  state.dynamicColumns = []
}
