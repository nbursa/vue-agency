import * as repository from "./repository.js"

export const getAllWorkers = async({commit}, date) => {
  const result = await repository.fetchAllWorkers(date)
  // console.log("RESULT", result)
  commit("SET_ALL_WORKERS", result)
  return result
}