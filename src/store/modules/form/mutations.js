export const RESET_SELECTED_JOB_TYPES = (state, jobTypes) => {
  state.selectedJobTypes = []
}

export const ADD_SELECTED_JOB_TYPE = (state, jobType) => {
  state.formItem.jobTypes.push(jobType)
}

export const REMOVE_SELECTED_JOB_TYPE = (state, jobType) => {
  state.formItem.jobTypes = state.formItem.jobTypes.filter(
    (item) => item.id != jobType.id
  )
}

export const SET_ITEM = (state, formItem) => {
  state.formItem = formItem
}

export const UPDATE_ITEM_FIELD = (state, field) => {
  if (field.name.includes('.')) {
    return field.name.split('.').reduce(function (obj, prop, index) {
      return obj
        ? index + 1 === field.name.split('.').length
          ? (obj[prop] = field.value)
          : obj[prop]
        : null
    }, state.formItem)
  }
  return (state.formItem[field.name] = field.value)
}

export const REMOVE_ITEM_FIELD = (state, value) => {
  delete state.formItem[value.name]
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const SET_UPLOAD_STATUS = (state, status) => {
  state.uploadStatus = status
}

export const CLEAR_ERRORS = (state) => {
  state.errors = {}
}

export const SET_FORM_ITEM = (state, newItem) => {
  state.formItem = newItem
}

export const SET_IS_SIGN_OFF = (state, value) => {
  state.isSignOff = value
}

export const SET_IS_FETCHING = (state, value) => {
  state.isFetching = value
}

export const SET_ITEM_SAVED = (state, value) => {
  state.itemSaved = value
}

export const SET_ITEM_DELETED = (state, value) => {
  state.itemDeleted = value
}

export const SET_CHILD_ITEMS = (state, items) => {
  state.formItem.jobTypes = items
}
