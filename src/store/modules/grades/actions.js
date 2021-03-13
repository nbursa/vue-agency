import * as repository from "./repository.js"

export const getGrades = ({ commit }, parentId) => {
  repository
    .all(parentId)
    .then(attirbutes => {
      commit("SET_GRADES", attirbutes)
    })
    .catch(e => {
      setErrors(e, commit)
    })
}
