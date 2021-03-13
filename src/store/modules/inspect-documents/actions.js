import * as repository from "./repository"

export const getDocuments = async ({
  commit
}, options) => {
  try {
    commit("UPDATE_STATUS", "fetching")
    const data = await repository.getAllDocuments(options)
    commit("UPDATE_STATUS", "done")
    commit("SET_DOCUMENTS", data.data)
    //commit("UPDATE_DOCUMENTS_META", data.meta)
  } catch (e) {
    console.log("err:actions-getDocuments", e)
  }
}