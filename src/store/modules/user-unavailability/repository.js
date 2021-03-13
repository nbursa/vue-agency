import { api } from "@/axios"

export const all = options => {
  return api
    .get("/user-unavailabilities", {
      params: options
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const get = options => {
  return api
    .get("/user-unavailabilities/" + options.id + "?include=dates,user,note")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
}

export const put = options => {
  return api
    .put("/user-unavailabilities/" + options.id + "/" + options.action, {
      note: options.note
    })
    .then(response => {
      return Promise.resolve(response.data.data)
    })
}
