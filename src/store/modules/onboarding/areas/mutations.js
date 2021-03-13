export const SET_AREAS = (state, payload) => {
  /*
  * Have areas sorted by level
  */
  state.areas = payload.sort((g1, g2) => {
    return g1.level > g2.level
  })
}

export const ADD_AREA = (state, payload) => {
  state.areas.push(payload)
}

export const UPDATE_AREA = (state, payload) => {
  const { name, id } = payload

  const edit = state.areas.filter(area => {
    return area.id === id
  })

  edit[0].name = name
}

export const DELETE_AREA = (state, payload) => {
  const id = payload
  state.areas = state.areas.filter(area => area.id != id)
}

export const BULK_UPDATE_AREA = (state, payload) => {
  state.areas = payload
}
