import * as repository from './repository.js'

const setErrors = ({ commit }, e) => {
  if (e.data && e.data.errors) {
    commit('SET_ERRORS', e.data.errors)
  } else {
    commit('SET_ERRORS', e)
  }
}

export const getClients = ({ commit }, parentId) => {
  commit('UPDATE_STATUS', 'fetching')
  return repository
    .all(parentId)
    .then((clients) => {
      if (parentId) {
        commit('CHILD_NODES_UPDATED', {
          parentId: parentId,
          children: clients.children
        })
      } else {
        commit('SET_CLIENTS', clients)
      }
    })
    .catch((e) => {
      setErrors(e, commit)
    })
}

export const getClientsWithChildren = ({ commit }) => {
  return repository
    .getAllWithChildren()
    .then((clients) => {
      commit('SET_CLIENTS', clients)
    })
    .catch((e) => {
      commit('FETCHING_END')
    })
}

export const getClientsWithChildrenAndDayTimes = ({ commit }) => {
  return repository
    .getAllWithChildrenAndDayTimes()
    .then((clients) => {
      commit('SET_CLIENTS', clients)
    })
    .catch((e) => {
      commit('FETCHING_END')
    })
}

export const getClientsOneLevel = ({ commit }) => {
  return repository
    .getClientsOneLevel()
    .then((clients) => {
      commit('SET_CLIENTS', clients)
    })
    .catch((e) => {
      commit('FETCHING_END')
    })
}

export const getClient = ({ commit, dispatch }, clientId) => {
  dispatch('edit/isFetching', true)
  repository
    .get(clientId)
    .then((client) => {
      dispatch('edit/setFormItem', client)
      dispatch('edit/isFetching', false)
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      setErrors(e, commit)
    })
}

export const getClientParent = ({ commit, dispatch }, clientId) => {
  dispatch('edit/isFetching', true)
  return repository
    .get(clientId)
    .then((client) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      return client
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      setErrors(e, commit)
    })
}

export const updateClient = ({ commit, dispatch }, user) => {
  dispatch('edit/isFetching', true)

  Object.keys(user).forEach((item) => {
    if (user[item] == null) {
      delete user[item]
    }
  })

  repository
    .update(user)
    .then((response) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', true)
      commit('NODE_UPDATED', user)
      commit('RESET_SELECTED')
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      } else {
        setErrors(e, commit)
      }
    })
}

export const saveClient = ({ commit, dispatch }, user) => {
  dispatch('create/isFetching', true)
  Object.keys(user).forEach((item) => {
    if (user[item] === '' || user[item] == null) {
      delete user[item]
    }
  })

  return repository
    .save(user)
    .then((response) => {
      // dispatch("getClients")
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', true)
      commit('ADD_CHILD_NODE', response)
    })
    .catch((e) => {
      dispatch('create/isFetching', false)
      dispatch('create/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('create/setErrors', e.data.errors)
      } else {
        setErrors(e, commit)
      }
    })
}

export const destroyNode = function ({ commit }, node) {
  repository
    .destroy(node.id)
    .then((res) => {
      commit('DESTROY_NODE', node)
    })
    .catch((e) => {
      if (e.data.errors.error) {
        alert(e.data.errors.error)
      } else if (e.data.errors.id) {
        commit('SET_ERRORS', e.data.errors.id[0])
        setTimeout(() => {
          commit('SET_ERRORS', [])
        }, 3000)
      } else {
        console.log(e.data)
      }
    })
}

export const setSelected = ({ commit }, client) => {
  commit('SET_SELECTED_CLIENT', client)
}

export const getGeolocation = ({ commit }, address) => {
  return repository.geoloc(address).then((response) => {
    return response
  })
}

export const excludeCandidates = ({ commit, dispatch }, payload) => {
  dispatch('edit/isFetching', true)
  let { excludeList, user } = payload

  user.excludedUsers = excludeList

  Object.keys(user).forEach((item) => {
    if (user[item] === '') {
      delete user[item]
    }
  })

  repository
    .update(user)
    .then((response) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', true)
      commit('NODE_UPDATED', user)
      dispatch('edit/setFormItem', response.data.data)
    })
    .catch((e) => {
      dispatch('edit/isFetching', false)
      dispatch('edit/itemSaved', false)
      if (e.data && e.data.errors) {
        dispatch('edit/setErrors', e.data.errors)
      } else {
        setErrors(e, commit)
      }
    })
}

export const sendTimesheet = async ({ commit, dispatch }, payload) => {
  dispatch('timesheet/itemSaved', false)
  const { data } = await repository.sendClientTimesheet(payload)
  if (data.errors) {
    commit('SET_ERRORS', data.errors)
    return
  }
  dispatch('timesheet/itemSaved', true)
}
