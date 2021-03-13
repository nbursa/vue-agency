export const IS_FETCHING = (state, newStatus) => {
  state.isFetching = newStatus
}

export const SET_COMPLIANCE_DOCS = (state, payload) => {
  state.compliancedocs = payload
}

export const SET_SELECTED_DOCUMENT = (state, payload) => {
  // const {
  //   id
  // } = payload
  // const idx = state.selected
  //   .map(selected => {
  //     return selected.id
  //   })
  //   .indexOf(id)

  // if (idx >= 0) return state.selected.splice(idx, 1)
  // if (state.selectedDocument.id === payload.id) return state.selectedDocument = {}
  state.selectedDocument = payload


}

export const SET_ERRORS = (state, payload) => {
  state.errors = payload
}

export const SET_VIEWED_DOCUMENT = (state, payload) => {
  state.viewedDocument = payload
}

export const REMOVE_DOCUMENT_FILE = (state, payload) => {
  const {
    id,
    target,
    fileId
  } = payload

  // console.log(payload)

  const location = target ? target : [...state.viewedDocument.userFiles]
  console.log("location", location, "file", fileId)
  const idx = location
    .map(selected => {
      return selected.id
    })
    .indexOf(fileId)
  if (target) return target.splice(idx, 1)
  state.viewedDocument.userFiles.splice(idx, 1)
}