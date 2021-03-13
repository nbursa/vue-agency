import { app } from "../../main.js"

const currencyDefault = {
  sign: "€",
  name: "Euro"
}

export const currencyPlugin = store => {
  store.subscribe(async (mutation, state) => {
    const { type } =  mutation
    if (type === "auth/LOGIN_USER") {
      const { currency }  = state.auth.user
      Object.assign( app.$currency, currency || currencyDefault )
    }
  })
}