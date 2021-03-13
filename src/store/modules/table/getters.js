export const isSelected = state => item => {
  if (state.selected.find(element => item.id === element.id)) {
    return true
  } else {
    return false
  }
}

export const isChecked = state => item => {
  if (state.checked.find(el => item.id === el.id)) {
    return true
  } else {
    return false
  }
}

export const checkedLength = state => {
  return state.checked.length
}

export const hidden = state => {
  return state.hidden
}

export const getColumns = state => {
  return state.dynamicColumns
}