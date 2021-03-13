import { api } from "@/axios"

export const all = () => {
  return api
    .get("/roles?&response_type=all")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => Promise.reject(e))
}
