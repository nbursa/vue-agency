import { api } from "@/axios"
import { defineAbilitiesFor } from "./casl/abilities" // this is a higher order function

// Asks for a payload that is a object with two props defined
// [prop] user - is a user object for which the ability object will be created, and
// [prop] conditions - is a special object that has a structure where keys will be
// entity names (lowercased), and values will be objects that define custom extended
// conditions for that specific entity
// Also there is a one special prop in that conditions object
// (conditions.ALWAYS), that when supplied will be merged together with each of
// other specific ones
export const reability = ({ commit }, { user, conditions = {} }) => {
  const _ability = defineAbilitiesFor(user, {
    ...conditions
  })
  return Promise.resolve(_ability)
}

/*
 * General file uploading action
 */

export const uploadFile = async (
  store,
  { fd, url, progressHandler, fileIndex } = payload
) => {
  let config = {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: uploadEvent => {
      const { loaded, total } = uploadEvent
      const percent = loaded / total * 100
      const uploadProgress = Math.round(percent)
      progressHandler(uploadProgress, fileIndex)
    }
  }
  try {
    const res = await api.post(url, fd, config)
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const setProfileImage = ({ state, commit }, image = "") => {
  commit("SET_PROFILE_IMAGE", image)
  return Promise.resolve()
}

export const setAgencyLogoImage = ({ state, commit }, logo) => {
  commit("SET_AGENCY_LOGO_IMAGE", logo)
  return Promise.resolve()
}

export const setActiveTab = ({ commit }, payload = {}) => {
  const { name, hash } = payload
  commit("SET_ACTIVE_TAB", {
    active: {
      name,
      hash
    },
    type: "on-boarding"
  })
}

export const advanceTab = ({ commit, dispatch, getters }, direction) => {
  /* All tab's hashes in an array */
  const iterations = getters.getTabIterations
  /* Active tab's hash */
  const activeTab = getters.getActiveTab || {}
  /* Current position of an active tab */
  const index = iterations.indexOf(activeTab) + direction

  /* Span over begin/end when tail is hit */
  let withinRange
  if (direction > 0) {
    withinRange = index % iterations.length
  } else {
    withinRange =
      index < 0 ? iterations.length + index % iterations.length : index
  }
  /* Promise me something */
  return Promise.resolve(withinRange)
}

export const setTabIterations = ({ commit }, payload) => {
  let iterations = payload.reduce((acc, val) => {
    acc.push(val.hash)
    return acc
  }, [])
  commit("SET_TAB_ITERATIONS", iterations)
}
/*
 * Triggered from axios interceptor on 401 and 422
 */
export const setValidationErrors = ({ commit }, payload) => {
  $logger.blue("Setting validation errors from interceptor...", {
    groupAs: "INTERCEPTOR"
  })
  commit("SET_SERVER_ERRORS", payload)
}

export const clearValidationErrors = ({ commit }) => {
  commit("CLEAR_SERVER_ERRORS")
}

export const setStoreInclude = ({ commit }, payload) => {
  commit("SET_STORE_INCLUDE", payload)
}

export const removeStoreInclude = ({ commit }, payload) => {
  commit("REMOVE_STORE_INCLUDE", payload)
}

export const addUploadedItem = ({ commit }, payload) => {
  const { mutationName, toCommit } = payload
  commit(mutationName , toCommit, {root: true})
}

export const setLocalization = ({ commit }, payload) => {
  commit("SET_LOCALIZATION", payload)
}