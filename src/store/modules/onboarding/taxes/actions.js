import * as repo from "./repository"

export const logError = (msg, err) => {
  console.error(msg)
  console.log(err)
}

export const getTaxes = async ({ commit }) => {
  try {
    const { data } = await repo.all()
    commit("SET_TAXES", data.data)
  } catch (e) {
    console.log(e)
  }
}

export const createTax = async ({ commit }, payload) => {
  console.log("action", payload)
  try {
    const { data } = await repo.create(payload)
    commit("ADD_TAX", data.data)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const updateTax = async ({ commit }, payload) => {
  try {
    const update = await repo.update(payload)
    commit("UPDATE_TAX", payload)
  } catch (e) {
    logError("Tax could not be updated.")
  }
}

export const deleteTax = async ({ commit }, payload) => {
  try {
    await repo.del(payload)
    commit("DELETE_TAX", payload)
  } catch (e) {
    logError("Tax could not be deleted.", e)
  }
}

export const updateLevels = async ({ commit }, payload) => {
  try {
    await repo.bulkUpdate(payload)
    commit("BULK_UPDATE_TAX", payload.taxes)
  } catch (e) {
    logError("Tax levels failed to update.", e)
  }
}
