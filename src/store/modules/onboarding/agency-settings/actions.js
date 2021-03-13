import * as repo from "./repository"

// Agency profile page
export const getProfile = async ({ commit }) => {
  const profile = await repo.getOne()
  commit("UPDATE_PROFILE", profile)
  return Promise.resolve(profile)
}

export const getLanguages = async ({ commit }) => {
  const lang = await repo.getLanguages()
  commit("UPDATE_LANGUAGES", lang)
  return Promise.resolve(lang)
}

export const updateAgencyDetails = async ({ commit, dispatch }, payload) => {
  try {
    const { id } = await dispatch("getProfile")
    let agency
    // If we are updating main agency
    if (id === payload.id) {
      commit("IS_LOADING", true, { root: true })
      agency = await repo.updateProfile(payload)
      commit("UPDATE_PROFILE", agency)
      commit("IS_LOADING", false, { root: true })
      // or subagency
    } else {
      commit("IS_LOADING", true, { root: true })
      agency = await repo.updateSubAgency(payload)
      commit("IS_LOADING", false, { root: true })
    }
    return Promise.resolve(agency)
  } catch (err) {
    commit("IS_LOADING", false, { root: true })

    if (err.status === 405) {
      return Promise.reject(err.statusText)
    }
    return Promise.reject(err.message)
  }
}

export const updateProfile = ({ commit, dispatch }, payload) => {
  commit("UPDATE_AGENCY_PROFILE", payload)
}

export const submitAgencyInfo = async ({ commit, dispatch }, payload) => {
  return await repo.updateProfile(payload)
}
