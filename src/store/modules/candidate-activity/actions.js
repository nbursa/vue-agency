import * as repository from "./repository.js"

export const getCandidateActivity = async ({
  commit
}, options) => {
  try {
    commit("UPDATE_STATUS", true)
    const formatedOptions = options.users ? Object.assign({}, options, {
      users: options.users.map(i => {
        return {
          "id": i
        }
      })
    }) : options
    const candidateActivity = await repository.all(formatedOptions)
    commit("UPDATE_CANDIDATE_ACTIVITY", candidateActivity)
    commit("UPDATE_META_DATA", candidateActivity.meta)
    commit("UPDATE_STATUS", false)
  } catch (e) {
    console.log(e)
    commit("SET_ERRORS", e)
  }
}