import { api } from "@/axios"
/*
 * Get all grades
 */
export const all = async () => {
  return await api.get("/grades")
}
/*
 * Create new grade
 */
export const create = async payload => {
  const { name, level } = payload
  return await api.post("/grades", {
    name,
    level
  })
}
/*
 * Update grade
 */
export const update = async payload => {
  const { value, id } = payload
  return await api.put(`/grades/${id}`, {
    name: value
  })
}
/*
 * Delete grade
 */
export const del = async payload => {
  const { id } = payload
  return await api.delete(`/grades/${id}`)
}

/*
 * Bulk update name or level attribute on all grades
 */
export const bulkUpdate = async payload => {
  const { grades } = payload
  return await api.post("/grades/bulk-update", {
    grades
  })
}
