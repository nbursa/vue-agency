import { api } from "@/axios"

export const getAllCurrencies = async () => {
  const response = await api.get("/currencies")
  return response.data.data
}