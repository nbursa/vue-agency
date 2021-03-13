import * as repository from "./repository.js"

export const getAttributes = ({ commit }, parentId) => {
  repository
    .all(parentId)
    .then(attirbutes => {
      commit("SET_ATTRIBUTES", attirbutes)
    })
    .catch(e => {
      setErrors(e, commit)
    })
}
