import { app } from '../../main.js'

const localizationDefault = {
  dateFormat: 'dd.MM.yyyy.',
  flatpickrFormat: 'd.m.Y.',
  timeFormat: '24h',
  name: 'EUR'
}

export const localizationPlugin = (store) => {
  store.subscribe(async (mutation, state) => {
    const { type } = mutation
    if (type === 'auth/LOGIN_USER') {
      const { localization } = state.auth.user
      const format =
        localization && localization.date_format
          ? {
              dateFormat: localization.date_format,
              flatpickrFormat: getFlatpickrFormat(localization.date_format),
              timeFormat: localization.time_format
            }
          : localizationDefault
      Object.assign(app.$localization, format)
      await store.dispatch('setLocalization', format)
    }
  })
}

const getFlatpickrFormat = (dateFormat) => {
  let format
  let formats = {
    'dd.MM.yyyy.': function () {
      format = 'd.m.Y.'
    },
    'MM/dd/yyyy': function () {
      format = 'm/d/Y'
    },
    default: function () {
      format = 'd.m.Y.'
    }
  }

  ;(formats[dateFormat] || formats['default'])()

  return format
}
