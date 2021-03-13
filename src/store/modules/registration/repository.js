import { api } from "@/axios"

export const submit = async payload => {
    return await api.post("/agencies", payload)
}