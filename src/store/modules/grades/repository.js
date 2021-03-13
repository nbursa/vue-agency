import { api } from "@/axios"

export const all = () => {
  return api
    .get("/grades")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}
