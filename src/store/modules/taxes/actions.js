import * as repository from "./repository.js"

export const getGrades = ({ commit }, parentId) => {
  repository
    .all(parentId)
    .then(attributes => {
      commit("SET_TAXES", attributes)
    })
    .catch(e => {
      setErrors(e, commit)
    })
}
