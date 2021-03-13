import * as repository from "./repository.js"

export const getAreas = ({ commit }) => {
  repository
    .all()
    .then(areas => {
      commit("SET_AREAS", areas)
    })
    .catch(e => {
      setErrors(e, commit)
    })
}
