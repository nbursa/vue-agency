import { api } from "@/axios"

const defaultQueryParams = {
  page: 1,
  orderBy: "ID",
  sortBy: "desc"
}

export const all = async options => {
  // console.log("options", options)
  const queryParams = _.merge({}, defaultQueryParams, options)
  const response = await api.get("/bonuses", { params: queryParams })
  return response.data
}

export const update = async payload => {
  const { id } = payload
  const response = await api.put(`/bonuses/${id}`, payload)
  return response.data
}

export const create = async payload => {
  const response = await api.post("/bonuses", payload)
  return response.data
}

export const remove = async payload => {
  const response = await api.delete(`/bonuses/${payload}`)
  return response.data
}