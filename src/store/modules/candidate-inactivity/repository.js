import {
  api
} from "@/axios"

import qs from "qs"

const defaultQueryParams = {
  page: 1
}

export const all = async options => {
  const queryParams = Object.assign({}, defaultQueryParams, options)
  const response = await api.get("/candidate-inactivity", {
    params: queryParams,
    paramsSerializer: function (params) {
      return qs.stringify(params, {
        encode: false
      })
    }
  })
  return response.data
}