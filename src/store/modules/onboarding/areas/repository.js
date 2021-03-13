import { api } from "@/axios"
/*
 * Get all area
 */
export const all = async () => {
  return await api.get("/areas?response_type=all")
}
/*
 * Create new area
 */
export const create = async payload => {
  return await api.post("/areas", {
    name: payload
  })
}
/*
 * Update area
 */
export const update = async payload => {
  const { name, id } = payload
  return await api.put(`/areas/${id}`, {
    name: name
  })
}
/*
 * Delete area
 */
export const del = async payload => {
  const id = payload
  return await api.delete(`/areas/${id}`)
}
