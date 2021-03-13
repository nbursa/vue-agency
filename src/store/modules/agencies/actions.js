import * as repository from "./repository.js"

export const getAgencies = ({ commit, dispatch }) => {
  repository
    .all()
    .then(agencies => {
      commit("SET_AGENCIES", agencies)
    })
    .catch(e => {
      console.log(e)
    })
}
