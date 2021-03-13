export const ADD_SELECTED_JOB_TYPE = (state, jobType) => {
  state.selectedJobTypes.push(jobType)
}

export const REMOVE_SELECTED_JOB_TYPE = (state, jobType) => {
  state.selectedJobTypes = state.selectedJobTypes.filter(
    item => item.id !== jobType.id
  )
}

export const UPDATE_SELECTED_JOB_TYPE = (state, payload) => {
  const { gradeId, id } = payload
  state.selectedJobTypes.map(jt => {
    if (jt.id == id) {
      jt.gradeId = gradeId
    }
  })
}

export const RESET = (state, jobType) => {
  state.selectedJobTypes = []
}

export const SET_SELECTED_JOB_TYPES = (state, jobTypes) => {
  let jt = jobTypes || []
  state.selectedJobTypes = jt
}
