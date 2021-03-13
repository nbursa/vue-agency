import {
  api
} from "@/axios"
import qs from "qs"

export const all = options => {
  const defaults = {
    page: 1,
    orderBy: "id",
    sortBy: "desc",
    roles: [5, 6],
    include: "clients,role"
  }

  const queryParams = _.merge({}, defaults, options)

  return api
    .get("/users", {
      params: queryParams,
      paramsSerializer: function (params) {
        return qs.stringify(params, {
          encode: false
        })
      }
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const get = id => {
  return api
    .get("/users/" + id + "?include=clients,role")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}

export const save = locationAdmin => {
  return api
    .post("/users/invite?include=role", locationAdmin)
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const search = options => {
  console.log(options)
  options.roleId = 4
  return api
    .get("/users", {
      params: options
    })
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}

export const destroy = adminId => {
  return api
    .delete("/users/" + adminId)
    .then(response => {
      return Promise.resolve(response)
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