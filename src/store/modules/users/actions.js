import * as repository from './repository.js'

export const getUsers = ({ commit }, options) => {
  commit('UPDATE_STATUS', true)
  repository
    .all(options)
    .then((users) => {
      commit('SET_USERS', users.data)
      commit('UPDATE_META_DATA', users.meta)
      commit('UPDATE_STATUS', false)
    })
    .catch((e) => {
      commit('SET_ERRORS', e.data.errors)
    })
}

export const getUser = ({ commit, dispatch }, userId) => {
  dispatch('edit/isFetching', true)
  repository
    .get(userId)
    .then((user) => {
      dispatch('edit/setFormItem', user)
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

export const searchUsers = ({ commit }, options) => {
  return repository.search(options)
}

export const updateUser = ({ commit, dispatch }, user) => {
  dispatch('edit/isFetching', true)
  delete user.image
  if (user.mobilePhone === '' || user.mobilePhone === undefined) {
    user.mobilePhone = null
  }
  Object.keys(user).forEach((item) => {
    if (user[item] === '') {
      delete user[item]
    }
  })

  repository
    .update(user)
    .then((response) => {
      commit('UPDATE_USER', user)
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

export const saveUser = ({ commit, dispatch }, user) => {
  dispatch('create/isFetching', true)
  repository
    .save(user)
    .then((response) => {
      commit('ADD_USER', response)
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', true)
    })
    .catch((e) => {
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('create/setErrors', e.data.errors)
      } else {
        dispatch('create/setErrors', e)
      }
    })
}

export const deleteUser = ({ commit, dispatch }, userId) => {
  dispatch('edit/isFetching', true)
  repository
    .destroy(userId)
    .then((response) => {
      commit('DELETE_USER', userId)
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
