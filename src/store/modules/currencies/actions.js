import * as repository from "./repository"

export const getCurrencies = async ({commit}) => {
  try {
    const data = await repository.getAllCurrencies()
    commit("SET_CURRENCIES", data)
  } catch(e) {
    console.log("err:currencies-getCurrencies", e)
  }
}