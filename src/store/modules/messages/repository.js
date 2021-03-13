import { api } from "@/axios"

export const conversation = async (id, page) => {
  const response = await api.get(`/conversations/${id}?page=${page}`)
  return Promise.resolve({
    conversation: response.data.data,
    meta: response.data.meta
  })
}

export const markAsReadConversation = async id => {
  return await api.put(`/conversations/${id}`)
}

export const send = async (id, body) => {
  const response = await api.post(`/conversations`, {
    recipient_id: id,
    message: body
  })
  return Promise.resolve(response.data.data)
}

/*
 * Chat popups (dock)
 */
export const conversations = async () => {
  const response = await api.get("/conversations")
  return response.data.data
}
