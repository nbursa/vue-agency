import * as repository from "./repository"

export const getAllBonuses = async ({commit}, options) => {
  commit("UPDATE_STATUS", true)
  try {
    const bonuses = await repository.all(options)
    commit("UPDATE_BONUSES", bonuses.data)
    // console.log("BONUSES", bonuses)
    if(bonuses.meta) commit("UPDATE_META_DATA", bonuses.meta.pagination)
  } catch(e) {
    console.log(e)
    commit("SET_ERRORS", e.data.errors)
  } finally {
    commit("UPDATE_STATUS", false)
  }
}

export const updateBonus = async ({commit, dispatch, state}, bonus) => {
  dispatch("edit/isFetching", true)
  try {
    const result = await repository.update(bonus)
    dispatch("getAllBonuses", state.search.params)
  } catch(e) {
    dispatch("edit/setErrors", e.data.errors)
  } finally {
    dispatch("edit/isFetching", false)
  }
}

export const createBonus = async ({commit, dispatch, state}, bonus) => {
  dispatch("create/isFetching", true)
  try {
    const result = await repository.create(bonus)
    dispatch("getAllBonuses", state.search.params)
  } catch(e) {
    dispatch("create/setErrors", e.data.errors)
  } finally {
    dispatch("create/isFetching", false)
  }
}

export const updateTableItem = async ( {commit, dispatch, state}, bonus ) => {
  commit("UPDATE_STATUS", true)
  try {
    const result = await repository.update(bonus)
    dispatch("getAllBonuses", state.search.params)
  } catch (e) {
    commit("SET_ERRORS", e.data.error)
  } finally {
    commit("UPDATE_STATUS", false)
  }
}

export const removeBonus = async( {commit, dispatch, state}, id ) => {
  commit("UPDATE_STATUS", true)
  try {
    const result = await repository.remove(id)
    dispatch("table/clearSelectedItems")
    dispatch("getAllBonuses", state.search.params)
  } catch(e) {
    commit("SET_ERRORS", e.data.error)
  } finally {
    commit("UPDATE_STATUS", false)
  }
}