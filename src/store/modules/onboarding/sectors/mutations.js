export const SET_SECTORS = (state, payload) => {
  state.sectors = payload
}

export const ADD_SECTOR = (state, payload) => {
  state.sectors.push(payload)
}

export const UPDATE_SECTOR = (state, payload) => {
  const {
    name,
    id
  } = payload

  const edit = state.sectors.filter(sector => {
    return sector.id === id
  })

  edit[0].name = name
}

export const DELETE_SECTOR = (state, payload) => {
  const idx = state.sectors
    .map(sector => {
      return sector.id
    })
    .indexOf(payload)
  state.sectors.splice(idx, 1)
}