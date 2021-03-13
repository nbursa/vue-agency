import * as repository from "./repository.js"

export const getCandidateInactivity = async ({
  commit
}, options) => {
  try {
    commit("UPDATE_STATUS", true)
    const formatedOptions = options.agencies ? Object.assign({}, options, {
      agencies: options.agencies.map(i => {
        return {
          "id": i
        }
      })
    }) : options
    const candidateInactivity = await repository.all(formatedOptions)
    commit("UPDATE_CANDIDATE_INACTIVITY", candidateInactivity)
    commit("UPDATE_META_DATA", candidateInactivity.meta)
    commit("UPDATE_STATUS", false)
  } catch (e) {
    console.log(e)
    commit("SET_ERRORS", e)
  }
}