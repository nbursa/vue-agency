import * as repository from "./repository.js"

export const checkSubdomain = ({ commit }, subdomain) => {
  repository
    .checkSubdomains(subdomain)
    .then(profile => {
      commit("SET_PROFILE", profile)
    })
    .catch(e => {
      console.log(e)
    })
}

export const setSubdomainTheme = ({ commit }, options) => {
  commit("SET_PROFILE_THEME", options)
}
