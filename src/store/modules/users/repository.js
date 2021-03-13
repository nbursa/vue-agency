import { api } from "@/axios"

export const all = options => {
  const defaults = {
    page: 1,
    orderBy: "id",
    sortBy: "desc",
    include: "role"
  }

  const queryParams = _.merge({}, defaults, options)
  return api
    .get("/users", {
      params: queryParams
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const get = id => {
  return api
    .get("/users/" + id + "?include=role,agencies")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}

export const save = user => {
  return api
    .post("/users/invite?include=role", user)
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const update = user => {
  return api
    .put("/users/" + user.id, user)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const destroy = userId => {
  return api
    .delete("/users/" + userId)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const search = options => {
  return api
    .get("/users", { params: options })
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}
