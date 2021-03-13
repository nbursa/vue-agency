import * as repo from "./repository"

export const logError = (msg, err) => {
  console.error(msg)
  console.log(err)
}

export const getAreas = async ({ commit }) => {
  try {
    const { data } = await repo.all()
    commit("SET_AREAS", data.data)
  } catch (e) {
    console.log(e)
  }
}

export const createArea = async ({ commit }, payload) => {
  try {
    const { data } = await repo.create(payload)
    commit("ADD_AREA", data.data)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const updateArea = async ({ commit }, payload) => {
  try {
    commit("IS_LOADING", true, { root: true })
    const update = await repo.update(payload)
    commit("UPDATE_AREA", payload)
    commit("IS_LOADING", false, { root: true })
  } catch (e) {
    logError("Area could not be updated.")
  }
}

export const deleteArea = async ({ commit }, payload) => {
  try {
    await repo.del(payload)
    commit("DELETE_AREA", payload)
  } catch (e) {
    logError("Area could not be deleted.", e)
  }
}
