import * as repository from "./repository"

export const logError = (msg, err) => {
  console.error(msg)
  console.log(err)
}

export const getAllHolidays = async ({commit}, options) => {
  try {
  const { data } = await repository.all(options)
  commit("SET_HOLIDAYS", data)
  } catch(e) {
    logError("Failed to get holidays", e)
  }
}

export const createHoliday = async ({commit}, holiday) => {
  try {
  const { data } = await repository.create(holiday)
  commit("ADD_HOLIDAY", data)
  } catch(e) {
    logError("Failed to create holidays", e)
  }
}

export const updateHoliday = async ({commit} , holiday) => {
  try {
    const { data } = await repository.update(holiday)
    commit("UPDATE_HOLIDAY", data)
  } catch(e) {
    logError("Failed to update holiday", e)
  }
}

export const deleteHoliday = async ({commit}, id) => {
  try {
    const { data } = await repository.remove(id)
    commit("REMOVE_HOLIDAY", id)
  } catch(e) {
    logError("Failed to delete holiday", e)
  }
}