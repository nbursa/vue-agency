import { api } from "@/axios"

export const checkSubdomains = (subdomain) => {
  return api
    .get("https://dvapi.tempest.app/api/v1/agencies/" + subdomain)
    .then(res => {
      return Promise.resolve(res.data.data)
    })
    .catch(err => { return Promise.reject(err) })
}
