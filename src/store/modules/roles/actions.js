import * as repository from "./repository.js"

export const getRoles = ({ commit, dispatch }) => {
  repository
    .all()
    .then(roles => {
      commit("SET_ROLES", roles)
    })
    .catch(e => {
      commit("SET_ERRORS", e.data.errors)
    })
}
