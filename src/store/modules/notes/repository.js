import { api } from "@/axios"


export const create = async (id, note, route) => {
    return await api.put(`/${route}/${id}?include=notes`, note)
}

export const update = async (noteId, note) => {
    return await api.put(`/notes/${noteId}`, note)
}

export const remove = async (noteId) => {
    return await api.delete(`/notes/${noteId}`)
}