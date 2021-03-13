import * as repository from "./repository"

export const getCandidates = async ({
  commit
}, options) => {
  // console.log('pagination', options)
  try {
    commit("UPDATE_STATUS", true)
    const data = await repository.getAllCandidates(options)
    commit("UPDATE_STATUS", false)
    // console.log(data)
    commit("UPDATE_CANDIDATES_META", data.meta)
    commit("SET_ALL_CANDIDATES", data.data)
  } catch (e) {
    console.log("err:candidate-documents:actions-getCandidates", e)
  }
}

export const getComplianceDocuments = async ({
  commit,
  dispatch
}, payload) => {
  try {
    // console.log(payload)
    const id = payload
    dispatch("manage/isFetching", true)
    const data = await repository.getCandidateDocuments(id)
    dispatch("manage/setComplianceDocs", data)
    dispatch("manage/isFetching", false)
  } catch (e) {
    console.log("err:candidate-documents:actions-getComplianceDocuments", e)
  }
}