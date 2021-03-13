import * as repo from "./repository"

export const logError = (msg, err) => {
  console.error(msg)
  console.log(err)
}

export const getGrades = async ({ commit }) => {
  try {
    const { data } = await repo.all()
    commit("SET_GRADES", data.data)
  } catch (e) {
    console.log(e)
  }
}

export const createGrade = async ({ commit }, payload) => {
  // console.log(payload)
  try {
    const { data } = await repo.create(payload)
    commit("ADD_GRADE", data.data)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const updateGrade = async ({ commit }, payload) => {
  try {
    const update = await repo.update(payload)
    commit("UPDATE_GRADE", payload)
  } catch (e) {
    logError("Grade could not be updated.")
  }
}

export const deleteGrade = async ({ commit }, payload) => {
  try {
    await repo.del(payload)
    commit("DELETE_GRADE", payload)
  } catch (e) {
    logError("Grade could not be deleted.", e)
  }
}

export const updateLevels = async ({ commit }, payload) => {
  try {
    await repo.bulkUpdate(payload)
    commit("BULK_UPDATE_GRADE", payload.grades)
  } catch (e) {
    logError("Grade levels failed to update.", e)
  }
}
