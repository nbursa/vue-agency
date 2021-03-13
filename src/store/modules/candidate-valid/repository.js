import { api } from "@/axios"

export const allCandidates = payload => {
  return api
    .get(`/jobs/${payload}/temps`)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}