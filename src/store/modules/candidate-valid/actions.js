import * as repository from "./repository"

export const getCandidates = ({ commit }, payload) => {
  repository
    .allCandidates(payload)
    .then(candidates => {
      commit("SET_ALL_CANDIDATES", candidates.data)
    })
    .catch(e => {
      console.log("candidate-validator:", e)
    })
}