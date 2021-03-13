import * as repository from "./repository"


export const isFetching = ({
  commit
}, status) => {
  commit("IS_FETCHING", status)
}

export const setComplianceDocs = async ({
  commit
}, payload) => {
  return await commit("SET_COMPLIANCE_DOCS", payload)
}

export const setSelectedDocument = async ({
  commit
}, payload) => {
  try {
    commit("SET_SELECTED_DOCUMENT", payload)
  } catch (e) {
    console.log("err:candidate-documents:actions-setSelectedDocument", e)
  }
}

export const setViewedDocument = async ({
  commit
}, payload) => {
  try {
    // console.log(payload)
    commit("SET_VIEWED_DOCUMENT", payload)
  } catch (e) {
    console.log("err:candidate-documents:actions-setViewedDocument", e)
  }
}

export const approveComplianceDocuments = async ({
  commit,
  dispatch
}, payload) => {
  try {
    let {
      data,
      callback,
      callbackPayload
    } = payload
    commit("IS_FETCHING", true)
    const response = await repository.approveCandidateDocuments(data)
    if (callback) {
      dispatch(callback, callbackPayload || null, {
        root: true
      })
    }
    commit("IS_FETCHING", false)

    return response
  } catch (e) {
    commit("SET_ERRORS", e)
    console.log("err:candidate-documents:actions-approveSelectedDocuments", e)
  }
}

export const rejectComplianceDocuments = async ({
  commit,
  dispatch
}, payload) => {
  try {
    let {
      data,
      callback,
      callbackPayload
    } = payload
    commit("IS_FETCHING", true)
    const response = await repository.rejectCandidateDocuments(data)
    if (callback) {
      dispatch(callback, callbackPayload || null, {
        root: true
      })
    }
    commit("IS_FETCHING", false)

    return response
  } catch (e) {
    commit("SET_ERRORS", e)
    console.log("err:candidate-documents:actions-approveSelectedDocuments", e)
  }
}

export const deleteDocumentFile = async ({
  commit
}, payload) => {
  try {
    // console.log(payload)
    commit("REMOVE_DOCUMENT_FILE", payload)
    return await repository.deleteDocumentFile(payload)
  } catch (e) {
    commit("SET_ERRORS", e)
    console.log("err:candidate-documents:actions-deleteDocumentFile", e)
  }
}