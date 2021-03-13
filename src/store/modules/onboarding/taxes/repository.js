import { api } from "@/axios"

export const all = async () => {
  return await api.get("/taxes?response_type=all")
}

export const create = async payload => {
  const { name, level, percent } = payload
  return await api.post("/taxes", {
    name,
    level,
    percent
  })
}

export const update = async payload => {
  const { name, percent, id } = payload
  return await api.put(`/taxes/${id}`, {
    name: name,
    percent: percent
  })
}

export const bulkUpdate = async payload => {
  const { taxes } = payload
  return await api.post("/taxes/bulk-update", {
    taxes
  })
}

export const del = async payload => {
  const { id } = payload
  return await api.delete(`/taxes/${id}`)
}

