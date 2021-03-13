import {
  api
} from "@/axios"

export const fetchAllWorkers = async (date) => {
  const result = await api.get("/dashboard", {params: {date}})
  return result.data.data
}