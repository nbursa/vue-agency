import * as TreeHelpers from "@/store/modules/_shared/tree/Tree.helpers.js"

export const getErrors = state => state.errors

export const getChildNodes = state => nodeId => {
  nodeId = nodeId ? nodeId : 0
  return TreeHelpers.findById(state.clients, nodeId)
}

export const getMapData = state => {
  const data = TreeHelpers.findById(state.clients, state.selected.id)

  if (data && data.children) {
    if (data.children.length === 0) {
      const clientNodes = TreeHelpers.findById(state.clients, data.parentId)
      return clientNodes && clientNodes.children.map(
        item => {
          return {
            id: item.id,
            name: item.name,
            address: [item.address_1, item.address_2],
            position: {
              lat: item.latitude,
              lng: item.longitude
            }
          }
        }
      )
    } else {
      return data.children.map(item => {
        return {
          id: item.id,
          name: item.name,
          address: [item.address_1, item.address_2],
          position: {
            lat: item.latitude,
            lng: item.longitude
          }
        }
      })
    }
  } else {
    return []
  }
}

export const getSelectedMapMarker = state => {
  const data = TreeHelpers.findById(state.clients, state.selected.id)

  if (!data || (data.children && data.children.length > 0)) {
    return null
  } else {
    return {
      id: data.id,
      position: {
        lat: data.latitude,
        lng: data.longitude
      }
    }
  }
}
