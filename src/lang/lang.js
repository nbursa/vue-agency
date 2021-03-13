import Vue from "vue"
import VueI18n from "vue-i18n"

// Custom require context for mass require
const requireJsons = require.context("./packs", true, /[a-z]+\.json$/)
let langObject = {}
requireJsons.keys().forEach(fn => {
  // Remove './' from the beginning, then split on '/' to extract dir and base filename
  const [dir, file] = fn.replace(/^\.\/(.*)\.json/, "$1").split("/")
  langObject[dir] = Object.assign(langObject[dir] || {}, {
    // Namespace each locale under filename that contains language definitions
    [file]: requireJsons(fn)
  })
})

Vue.use(VueI18n)

// Set default locale
const locale = "en"

// Initialize vue-i18n plugin
const i18n = new VueI18n({
  locale,
  messages: langObject,
  silentTranslationWarn: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development'
})

export default i18n
