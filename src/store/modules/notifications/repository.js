import { api } from "@/axios"
import qs from "qs"

const defaultQueryParams = {
  page: 1,
  orderBy: "created_at",
  sortBy: "desc"
}

export const list = async (options) => {
  const queryParams = _.merge({}, defaultQueryParams, options)

  try {
    const res = await api.get("/notifications?response_type=pagination",{
      params: queryParams
    })
    return Promise.resolve(res.data)
  } catch (_) {}
}


export const markAsRead = async id => {
  try {
    return await api.post(`/notifications/${id}/read`)
  } catch (_) {}
}
