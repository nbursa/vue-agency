import Vue from "vue"

export const selectItem = ({ commit }, item) => {
  commit("ADD_SELECTED_ITEM", item)
}

export const deselectItem = ({ commit }, item) => {
  commit("REMOVE_SELECTED_ITEM", item)
}

export const checkItem = ({ commit }, item) => {
  commit("ADD_CHECKED_ITEM", item)
}

export const unCheckItem = ({ commit }, item) => {
  commit("REMOVE_CHECKED_ITEM", item)
}

export const clearCheckedItems = ({ commit }) => {
  commit("CLEAR_CHECKED_ITEMS")
}

export const clearSelectedItems = ({ commit }) => {
  commit("CLEAR_SELECTED_ITEMS")
}

export const hideColumn = ({ commit }, item) => {
  commit("ADD_HIDDEN_COLUMN", item)
}

export const showColumn = ({ commit }, item) => {
  commit("REMOVE_HIDDEN_COLUMN", item)
}

export const checkAllItems = ({ commit }, items) => {
  commit("CHECK_ALL_ITEMS", items)
}

export const setColumns = ({ commit }, columns) => {
  commit("SET_COLUMNS", columns)
}

export const addColumn = ({ commit }, column) => {
  commit("ADD_COLUMN", column)
}

export const removeColumn = ({ commit }, columnLabel) => {
  commit("REMOVE_COLUMN", columnLabel)
}

export const resetColumns = ({ commit }) => {
  commit("RESET_COLUMNS")
}
