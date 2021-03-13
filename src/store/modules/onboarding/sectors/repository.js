import {
  api
} from "@/axios"

/*
 * Get all area
 */
export const getAllSectors = async () => {
  return await api.get("/sub-agencies", {
    params: {
      responseType: "all"
    }
  })
}

export const createSector = async payload => {
  return await api.post("/sub-agencies", {
    name: payload
  })
}

export const updateSector = async payload => {
  const {
    id,
    name
  } = payload
  return await api.put(`/sub-agencies/${id}`, {
    name: name
  })
}

export const deleteSector = async payload => {
  const id = payload
  return await api.delete(`/sub-agencies/${id}`)
}