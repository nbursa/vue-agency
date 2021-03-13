import { api } from "@/axios"

const defaults = {
  page: 1,
  orderBy: "id",
  sortBy: "desc"
}

export const getAllCandidates = async options => {
  const queryParams = _.merge({}, defaults, options)

  const response = await api.get("/temps?include=uploaded_documents,total_documents,document_expiration_date", {
    params: queryParams
  })
  // console.log("CANDIDATES", response.data)
  response.data.data.forEach(item => {
    item.firstName += ` ${item.lastName}`
  })
  return response.data
}

export const getCandidateDocuments = async id => {
  const response = await api.get(`/users/${id}/compliance?include=userFiles`)
  return response.data.data
}
