import { merge } from "@/utils/general"

export const SET_PROFILE_IMAGE = (state, { image, logo }) => {
  // console.log('image, logo, setprofileimage ', {image, logo})
  /*
   * We either got an image or a logo prop, then we call the appropriate
   * mutation, image sets profile image, and logo sets agency profile logo
   */
  if (image) {
    state.userManagement.profile.image = image
  }
  if (logo) {
    state.onboarding.agencySettings.profile.logo = logo
  }
}

export const SET_AGENCY_LOGO_IMAGE = (state, {logo}) => {
  state.onboarding.agencySettings.profile.logo = logo
}

export const IS_LOADING = (state, payload) => {
  state.isLoading = payload
}

export const LAST_LOADED_ID = (state, payload) => {
  state.lastLoadedId = payload
}

export const SET_ACTIVE_TAB = (state, payload) => {
  const { active = null, type = null } = payload
  state.tabState = merge(state.tabState, {
    active,
    type
  })
}

export const SET_TAB_ITERATIONS = (state, payload) => {
  state.tabState = Object.assign({
    ...state.tabState,
    iterations: payload
  })
}

export const SET_SERVER_ERRORS = (state, payload) => {
  const { data } = payload
  state.serverErrors = data
}

export const CLEAR_SERVER_ERRORS = state => {
  state.serverErrors = []
}

export const SET_STORE_INCLUDE = (state, { path, includes }) => {
  state.storeInclude[path] = includes
}

export const REMOVE_STORE_INCLUDE = (state, { path }) => {
  delete state.storeInclude[path]
}

export const ADD_UPLOADED_ITEM = (state, payload) => {
  // console.log(payload)
  const { namespace, items } = payload
  console.log(state[namespace])
  state.candidateDocuments.edit.viewedDocument.userFiles = items
}

export const SET_LOCALIZATION = (state , payload) => {
  state.localization = payload
}