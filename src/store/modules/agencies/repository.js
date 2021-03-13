import { api } from "@/axios"

export const all = () => {
  return api
    .get("/agency-profile?include=subAgencies")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}
