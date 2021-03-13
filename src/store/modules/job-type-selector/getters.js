export const isChecked = state => jt => {
  return state.selectedJobTypes.find(item => item.id === jt.id) ? true : false
}
