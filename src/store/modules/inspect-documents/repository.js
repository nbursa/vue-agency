import { api } from "@/axios"

const defaults = {
  page: 1,
  orderBy: "id",
  sortBy: "desc"
}

export const getAllDocuments = async options => {
  console.log("REPOLOG", options)
  //const queryParams = _.merge({}, defaults, options)
  try {
    // const response = await api
    //   .get("/compliance/for-approval", {
    //     params: queryParams
    //   })
    const response = await api.get("/compliance/for-approval")
    response.data.data.forEach((item, index) => {
      item.createdAt = item.createdAt.split(" ")[0]
      item.user.firstName += ` ${item.user.lastName}`
      item.id = index
    })
    console.log(response.data)
    return response.data
  } catch (e) {
    return Promise.reject(e)
  }
}
