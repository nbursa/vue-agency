/* eslint-disable no-console  */
import axios from "axios"
import applyConverters from "axios-case-converter"
import store from "@/store/index.js"
import {
  getRoute,
  matchPattern
} from "url-matcher"
// import { localforage } from "localforage"

let api = applyConverters(
  axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    headers: {
      Accept: "application/json"
    }
  })
)

api.interceptors.request.use(config => {
  let token = localStorage.getItem("Realday/jwt")
  if (token) {
    token = token.split('"')[1]
    config.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete config.headers.common["Authorization"]
  }
  try {
    let storeInclude = store.getters.getInclude
    let last = config.url.split("/").pop()
    // console.log(getRoute(config.url))
    const include = Object.keys(storeInclude)
      .filter((pattern, index) => {
        return matchPattern(pattern, config.url)
      })
      .map(key => storeInclude[key])
      .join(",")
    if (include) {
      // console.log(`this is a ${last} route, and has ${include} include`)
      config.params = {
        include
      }
      return config
    }
  } catch (err) {} finally {
    return config
  }
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    let {
      status,
      data
    } = err.response
    if (401 === status || 422 == status) {
      store
        .dispatch("setValidationErrors", err.response)
        .then(() => {
          return Promise.reject(err.response)
        })
        .catch(() => {})
    }
    if (400 === status) {
      store
        .dispatch("setValidationErrors", err.response)
        .then(() => {
          return Promise.reject(err.response)
        })
        .catch(() => {})
    }
    return Promise.reject(err.response)
  }
)

export {
  api
}