import { api } from "@/axios"

const defaultQueryParams = {
  page: 1,
  orderBy: "ID",
  sortBy: "desc",
  include: "client,jobRequest.jobType,user"
}

export const fetchInvoices = async options => {
  // console.log("options", options)
  const queryParams = _.merge({}, defaultQueryParams, options)

  const response = await api.get("/invoices", {
    params: queryParams
  })
  // console.log("INVOICES", response.data)

  return response.data
}