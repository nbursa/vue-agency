import * as repository from "./repository"

export const getInvoices = async ({
  commit
}, options) => {
  try {
    commit("UPDATE_STATUS", true)

    const data = await repository.fetchInvoices(options)
    commit("UPDATE_STATUS", false)
    commit("UPDATE_META_DATA", data.meta)
    commit("UPDATE_INVOICES", data.data)
  } catch (e) {
    console.log("Error", e)
  }
}
