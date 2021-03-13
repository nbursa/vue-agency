import { api } from "@/axios"
import { omitBy, isNil } from "lodash"

export const getOne = async () => {
  const profile = await api.get("/agency-profile?include=language,currency")
  return profile.data.data
}

export const updateProfile = async payload => {
  $logger.green("UPDATING MAIN AGENCY")

  /* Remove null & undefined values from object */
  const sanitizedPayload = omitBy(payload, isNil)

  const res = await api.put("/agency-profile", sanitizedPayload)
  const agency = res.data.data
  return Promise.resolve(agency)
}

export const updateSubAgency = async payload => {
  $logger.green("UPDATING SUBAGENCY")

  const sanitizedPayload = omitBy(payload, isNil)

  const { id } = sanitizedPayload
  const res = await api.put(`/sub-agencies/${id}`, sanitizedPayload)
  const agency = res.data.data
  return Promise.resolve(agency)
}


export const getLanguages = async payload => {
  $logger.green("FETCH LANGUAGES")
  const lang = await api.get("/languages")
  return lang.data.data
}