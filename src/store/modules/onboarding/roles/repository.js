import {
  api
} from "@/axios"


export const getAllPermissions = async () => {
  const response = await api.get("/permissions")
  return response.data.data
}

export const getAllRoles = async () => {
  const response = await api.get("/roles?include=permissions&response_type=all")
  return response.data.data
}

export const createNewRole = async payload => {
  const {
    label,
    name,
    permissions
  } = payload
  return await api.post("/roles?include=permissions", {
    label: label,
    name: name ? name.replace(/\s+/g, '-').toLowerCase() : '',
    permissions: permissions
  })
}

export const updateRole = async payload => {
  const {
    id
  } = payload
  return await api.put(`/roles/${id}?include=permissions`, payload)
}

export const deleteRole = async payload => {
  const {
    id
  } = payload
  return await api.delete(`/roles/${id}`)
}

export const completeSetup = async () => {
  return api.post("/agencies/complete-setup")
}