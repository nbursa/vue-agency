import * as repository from './repository.js'

export const getDocuments = ({ commit }, options) => {
  commit('UPDATE_STATUS', true)
  repository
    .all(options)
    .then((documents) => {
      commit('UPDATE_DOCUMENTS', documents)
      commit('UPDATE_META_DATA', documents.meta)
      commit('UPDATE_STATUS', false)
    })
    .catch((e) => {
      console.log(e)
    })
}

export const saveDocument = ({ commit, dispatch }, document) => {
  dispatch('create/isFetching', true)
  repository
    .save(document)
    .then((response) => {
      commit('ADD_DOCUMENT', response.data)
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', true)
    })
    .catch((e) => {
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', false)
      dispatch('create/setErrors', e.data.errors)
    })
}

export const deleteDocument = ({ commit, dispatch }, documentId) => {
  dispatch('edit/isFetching', true)
  repository
    .destroy(documentId)
    .then((response) => {
      commit('DELETE_DOCUMENT', documentId)
      dispatch('edit/isFetching', false)
      dispatch('edit/itemDeleted', true)
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemDeleted', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      }
    })
}

export const getDocument = ({ commit, dispatch }, documentId) => {
  dispatch('edit/isFetching', true)
  repository
    .get(documentId)
    .then((document) => {
      dispatch('edit/setFormItem', document)
      dispatch('edit/isFetching', false)
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      }
    })
}

export const updateDocument = ({ commit, dispatch }, document) => {
  delete document.expirationLength
  dispatch('edit/isFetching', true)
  repository
    .update(document)
    .then((response) => {
      commit('UPDATE_SELECTED_DOCUMENT', document)
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', true)
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      }
    })
}
