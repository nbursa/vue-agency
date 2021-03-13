import * as repository from './repository'

export const getCandidatePools = async ({ commit }, payload) => {
  commit('UPDATE_STATUS', true)
  try {
    let response = await repository.all(payload)
    commit('SET_POOLS', response.data)
    commit('SET_META_DATA', response.meta)
    commit('UPDATE_STATUS', false)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('pool fetch', e)
  }
}

export const getCandidatePool = async ({ dispatch }, payload) => {
  dispatch('edit/isFetching', true)
  try {
    let pool = await repository.one(payload)
    dispatch('edit/setFormItem', pool)
    dispatch('edit/isFetching', false)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('get pool error', e)
    dispatch('edit/isFetching', false)
    dispatch('edit/itemSaved', false)
  }
}

export const updateCandidatePool = async ({ commit, dispatch }, payload) => {
  dispatch('edit/isFetching', true)
  try {
    let pool = await repository.update(payload)
    commit('UPDATE_POOL', pool)
    dispatch('table/clearSelectedItems')
    dispatch('edit/isFetching', false)
    dispatch('edit/itemSaved', true)
  } catch (e) {
    dispatch('edit/isFetching', false)
    dispatch('edit/itemSaved', false)
    if (e.data && e.data.errors) {
      dispatch('edit/setErrors', e.data.errors)
    }
  }
}

export const createCandidatePool = async ({ commit, dispatch }, payload) => {
  dispatch('create/isFetching', true)
  try {
    let pool = await repository.create(payload)
    commit('ADD_POOL', pool)
    dispatch('table/clearSelectedItems')
    dispatch('create/isFetching', false)
    dispatch('create/itemSaved', true)
  } catch (e) {
    dispatch('create/isFetching', false)
    dispatch('create/itemSaved', false)
    if (e.data && e.data.errors) {
      dispatch('create/setErrors', e.data.errors)
    }
  }
}

export const deleteCandidatePool = ({ commit, dispatch }, poolId) => {
  dispatch('edit/isFetching', true)
  repository
    .destroy(poolId)
    .then((response) => {
      commit('DELETE_POOL', poolId)
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

export const removeCandidate = ({ commit }, payload) => {
  commit('REMOVE_POOL_CANDIDATE', payload)
}

export const addCandidate = ({ commit }, payload) => {
  commit('ADD_POOL_CANDIDATE', payload)
}
