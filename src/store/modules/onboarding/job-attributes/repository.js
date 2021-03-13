import { api } from "@/axios"

export const fetchAttributes = () => {
  return api
    .get("/attributes?response_type=all&include=values")
    .then(response => {
      return Promise.resolve(response.data.data)
    })
    .catch(e => {
      Promise.reject(e)
    })
}

export const saveAttribute = jobAttribute => {
  return api
    .post("/attributes?include=values", jobAttribute)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const deleteAttribute = attirbuteId => {
  return api
    .delete("/attributes/" + attirbuteId)
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const updateAttribute = options => {
  return api
    .put("/attributes/" + options.id, { name: options.name })
    .then(resp => {
      return Promise.resolve(resp)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const saveAttributeValue = (attributeId, attributeValue) => {
  return api
    .post("/attributes/" + attributeId + "/values?include=attribute", attributeValue)
    .then(resp => {
      return Promise.resolve(resp.data.data)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export const deleteAttributeValue = valueId => {
  return api
    .delete("/attributes/values/" + valueId)
    .then(resp => {
      return Promise.resolve(resp.data.data)
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateAttributeValue = attributeValue => {
  return api
    .put("/attributes/values/" + attributeValue.id, attributeValue)
    .then(resp => {
      return Promise.resolve(resp.data.data)
    })
    .catch(e => {
      return Promise.reject(e)
    })
}
