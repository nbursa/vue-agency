import {
  api
} from "@/axios"

import qs from 'qs'


const defaults = {
  page: 1,
  orderBy: "id"
}


export const all = async options => {
  const queryParams = _.assign({}, defaults, options)

  let response = await api.get("/special-margins", {
    params: queryParams,
    paramsSerializer: function(params) {
      return qs.stringify(params, { encode: false })
    }
  })


  return response.data
}

export const update = async options => {
  const response = await api.put("/special-margins", options)
  return response.data
}