import Vue from "vue"

export const UPDATE_SEARCH_PARAMS = (state, options) => {
  if (!options["page"]) {
    Vue.set(state.params, "page", 1)
  }

  if ((options.group || options.group === "") && state.params.status) {
    state.params.status = null
  }

  var keys = Object.keys(options)

  keys.forEach(key => {
    if (options[key] === "") {
      options[key] = null
    }
  })

  if (Array.isArray(options)) {
    options.forEach(item => {
      let keys = Object.keys(item)
      !state.params.keys ? Vue.set(state.params, keys, item[keys]) : null
    })
  } else {
    let keys = Object.keys(options)
    keys.forEach(key => {
      Vue.set(state.params, key, options[key])
    })
  }
}

export const RESET_SEARCH_PARAMS = state => {
  state.params = {}
}
