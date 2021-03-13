import * as repository from './repository.js'

const setErrors = (e, commit) => {
  if (e.data && e.data.errors) {
    commit('SET_ERRORS', e.data.errors)
  } else {
    commit('SET_ERRORS', e)
  }
}

export const getLocationAdmins = ({ commit }, options) => {
  commit('UPDATE_STATUS', true)
  repository
    .all(options)
    .then(users => {
      commit('SET_LOCATION_ADMINS', users.data)
      commit('UPDATE_META_DATA', users.meta)
      commit('UPDATE_STATUS', false)
    })
    .catch(e => {
      commit('SET_ERRORS', e.data.errors)
    })
}

export const searchLocationAdmins = ({ commit }, options) => {
  return repository.search(options)
}

export const getLocationAdmin = ({ commit, dispatch }, id) => {
  dispatch('edit/isFetching', true)
  repository
    .get(id)
    .then(locationAdmin => {
      if (!locationAdmin.pin) {
        locationAdmin.pin = ''
      }
      dispatch('edit/setFormItem', locationAdmin)
      dispatch('edit/isFetching', false)
    })
    .catch(e => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      setErrors(e, commit)
    })
}

export const deleteLocationAdmin = ({ commit, dispatch }, adminId) => {
  dispatch('edit/isFetching', true)
  repository
    .destroy(adminId)
    .then(() => {
      commit('DELETE_USER', adminId)
      dispatch('edit/isFetching', false)
      dispatch('edit/itemDeleted', true)
    })
    .catch(e => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemDeleted', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      }
    })
}

export const saveLocationAdmin = ({ commit, dispatch }, candidate) => {
  dispatch('create/isFetching', true)
  repository
    .save(candidate)
    .then(response => {
      commit('ADD_LOCATION_ADMIN', response)
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', true)
    })
    .catch(e => {
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', false)
      if (e.data.errors) {
        dispatch('create/setErrors', e.data.errors)
      }
    })
}

export const updateLocationAdmin = ({ commit, dispatch, state }, user) => {
  dispatch('edit/isFetching', true)
  delete user.image
  Object.keys(user).forEach(item => {
    if (user[item] === '' && item !== 'mobilePhone') {
      delete user[item]
    }
  })

  repository
    .update(user)
    .then(() => {
      commit('UPDATE_LOCATION_ADMIN', user)
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', true)
      dispatch('getLocationAdmins', state.searchParams)
    })
    .catch(e => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      }
    })
}
