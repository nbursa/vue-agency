import { api } from "@/axios"

const defaults = {
  page: 1,
  orderBy: "id",
  sortBy: "desc"
}

export const all = options => {
  const queryParams = _.merge({}, defaults, options)
  return api
    .get("/documents", {
      params: queryParams
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const save = document => {
  return api
    .post("/documents", document)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const get = id => {
  return api
    .get("/documents/" + id + "?include=jobTypes")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}

export const update = document => {
  return api
    .put("/documents/" + document.id, document)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
}

export const destroy = documentId => {
  return api
    .delete("/documents/" + documentId)
    .then(response => {
      return Promise.resolve(document)
    })
    .catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
}
