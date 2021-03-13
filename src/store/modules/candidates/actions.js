import * as repository from './repository.js'
import Candidate from '@/models/Candidate.js'

export const getCandidates = ({ commit, dispatch }, options) => {
  commit('UPDATE_STATUS', true)
  repository
    .all(options)
    .then((candidates) => {
      commit('UPDATE_CANDIDATES', candidates)
      if (candidates.meta) commit('UPDATE_META_DATA', candidates.meta)
      commit('UPDATE_STATUS', false)
    })
    .catch((e) => {
      commit('SET_ERRORS', e.data.errors)
    })
}

export const getCandidate = ({ commit, dispatch }, candidateId) => {
  dispatch('edit/isFetching', true)
  repository
    .get(candidateId)
    .then((candidate) => {
      dispatch('edit/setFormItem', candidate)
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

export const searchCandidate = ({ commit }, options) => {
  return repository.search(options)
}

export const updateCandidate = ({ commit, dispatch }, candidate) => {
  dispatch('edit/isFetching', true)
  let candidateData = { ...candidate }
  delete candidateData.image
  if (
    candidateData.mobilePhone === '' ||
    candidateData.mobilePhone === undefined
  ) {
    candidateData.mobilePhone = null
  }
  Object.keys(candidateData).forEach((item) => {
    if (candidateData[item] === '' /* || candidateData[item] === null */) {
      delete candidateData[item]
    }
  })

  repository
    .update(candidateData)
    .then((response) => {
      commit('UPDATE_CANDIDATE', candidate)
      dispatch('table/clearSelectedItems')
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

export const saveCandidate = ({ commit, dispatch }, candidate) => {
  dispatch('create/isFetching', true)
  repository
    .save(candidate)
    .then((response) => {
      commit('ADD_CANDIDATE', response)
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', true)
    })
    .catch((e) => {
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', false)
      if (e.data.errors) {
        dispatch('create/setErrors', e.data.errors)
      }
    })
}

export const uploadCsv = ({ commit, dispatch }, csv) => {
  repository
    .upload(csv)
    .then((response) => {
      dispatch('create/setUploadStatus', 2)
      dispatch('create/itemSaved', true)
    })
    .catch((e) => {
      if (e.data.errors) {
        dispatch('create/setUploadStatus', 3)
        dispatch('create/setErrors', e.data.errors)
      }
    })
}

export const deleteCandidate = ({ commit, dispatch }, candidateId) => {
  dispatch('edit/isFetching', true)
  repository
    .destroy(candidateId)
    .then((response) => {
      commit('DELETE_CANDIDATE', candidateId)
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

export const saveJobType = ({ commit }, options) => {
  repository.saveJobType(options)
}

export const removeJobType = ({ commit }, options) => {
  repository.deleteJobType(options)
}

export const updateJobType = ({ commit }, options) => {
  repository.updateJobType(options)
}

export const updateSelectedCandidate = ({ commit }, value) => {
  commit('UPDATE_SELECTED_CANDIDATE', value)
}

export const resetCandidate = ({ commit }) => {
  commit('RESET_CANDIDATE')
}

export const addSelectedJobType = ({ commit }, jobType) => {
  commit('ADD_SELECTED_JOB_TYPE', jobType)
}

export const deleteSelectedJobType = ({ commit }, jobType) => {
  commit('REMOVE_SELECTED_JOB_TYPE', jobType)
}

export const findCandidate = ({ commit }, id) => {
  return repository.get(id)
}

export const clearCandidates = ({ commit }) => {
  commit('CLEAR_CANDIDATES')
}
