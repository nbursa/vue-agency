import { api } from "@/axios"

export const getAll = parentId => {
  let url = "/job-types/one-level?response_type=all&include=children_count"
  if (parentId) {
    url = url + "&parent_id=" + parentId
  }
  return api
    .get(url)
    .then(res => {
      let jobTypes = {
        name: "jobTypes",
        id: 0,
        children: res.data.data
      }
      return Promise.resolve(jobTypes)
    })
    .catch(({ data }) => {
      return Promise.reject(data)
    })
}

export const getAllWithChildren = () => {
  let url = "/job-types?response_type=all"

  return api
    .get(url)
    .then(res => {
      let jobTypes = {
        name: "jobTypes",
        id: 0,
        children: res.data.data
      }
      return Promise.resolve(jobTypes)
    })
    .catch(({ data }) => {
      return Promise.reject(data)
    })
}

export const save = node => {
  return api
    .post("/job-types", node)
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(data => {
      return Promise.reject(e)
    })
}

export const destroy = nodeId => {
  return api
    .delete("/job-types/" + nodeId)
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const update = node => {
  return api
    .put("/job-types/" + node.id, {
      name: node.name
    })
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const bulkUpdate = async payload => {
  const { job_types } = payload
  // console.log('bulkUpdate jobtypes ', { nodes })
  return await api.post("/job-types/bulk-update", {
    job_types
  })
}
