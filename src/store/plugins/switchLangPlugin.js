import { app } from "../../main.js"
import * as deMessages from "vee-validate/dist/locale/de"
import * as enMessages from "vee-validate/dist/locale/en"

export const switchLangPlugin = store => {
  store.subscribe(async (mutation, state ) => {
    const { type } = mutation
    if (type === "auth/LOGIN_USER") {
      const { lang }  = state.auth.user
      const msgSet = {
        en: enMessages,
        de: deMessages
      }
      app.$i18n.locale = lang
      app.$validator.localize( { [lang]:  msgSet[lang]} )
      app.$validator.locale = lang
    }
  })
}