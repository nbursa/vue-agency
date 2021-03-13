export const UPDATE_DOCUMENTS = (state, documents) => {
  state.documents = documents.data
}

export const UPDATE_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const UPDATE_STATUS = (state, newStatus) => {
  state.status = newStatus
}
export const ADD_DOCUMENT = (state, document) => {
  state.documents.unshift(document)
}

export const DELETE_DOCUMENT = (state, documentId) => {
  state.documents = state.documents.filter((item) => item.id != documentId)
}

export const SET_SELECTED_DOCUMENT = (state, document) => {
  state.sidebar.editItem = document
  state.selectedDocument = doc
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const CLEAR_ERRORS = (state, errors) => {
  state.errors = []
}

export const UPDATE_DOCUMENT = (state, document) => {
  state.selectedDocument = document
}

export const UPDATE_SELECTED_DOCUMENT = (state, document) => {
  let doc = state.documents.find((item) => item.id === document.id)
  doc.name = document.name
  doc.isRequired = document.isRequired
  doc.hasExpiry = document.hasExpiry
}
