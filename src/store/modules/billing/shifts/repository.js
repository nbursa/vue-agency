import { api } from "@/axios"

const defaultQueryParams = {
  page: 1,
  status: "invoice_pending",
  orderBy: "ID",
  sortBy: "desc",
  include: "client,jobRequest.jobType,user"
}

export const all = options => {
  let queryParams = {}
  if(options.responseType && responseType === 'all') {
    queryParams = _.assign({}, options)
  } else {
    queryParams = _.assign({}, defaultQueryParams, options)
  }
  return api
    .get("/jobs", {
      params: queryParams
    })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(e => Promise.reject(e))
}

export const getInvoicePreview = async payload => {
  const readyItems = payload.jobs.map(item => {
    return { id: item.id }
  })
  const readyPayload = { 
    jobs: readyItems,
    additionals: payload.additionals
  }
  const response = await api.post(
    "/invoices/preview?include=client",
    readyPayload
  )
  return response.data.data
}

export const submitInvoice = async payload => {
  const { jobs, note, additionals, poNumber } = payload
  const readyItems = jobs.map(item => {
    return { id: item.id }
  })
  const readyPayload = { jobs: readyItems, note, additionals, po_number: poNumber }
  const response = await api.post("/invoices?include=client", readyPayload)
  return response.data
}
