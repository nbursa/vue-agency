import { api } from "@/axios"

export const all = async () => {
  const response = await api.get("/holidays", {params: {responseType: "all"}})
  return response.data
}

export const get = async id => {
  const response = await api.get(`/holidays/${id}`)
  return response.data
}

export const create = async holiday => {
  const response = await api.post('holidays', holiday)
  return response.data
}

export const update = async holiday => {
  const response = await api.put(`/holidays/${holiday.id}`, holiday)
  return response.data
}

export const remove = async id => {
  const response = await api.delete(`/holidays/${id}`)
  return response.data
} 