export const SET_TAXES = (state, payload) => {
  state.taxes = payload.sort((t1, t2) => {
    return t1.level > t2.level
  })
}

export const ADD_TAX = (state, payload) => {
  state.taxes.push(payload)
}

export const UPDATE_TAX = (state, payload) => {
  const { value, id } = payload

  const edit = state.taxes.filter(tax => {
    return tax.id === id
  })

  edit[0].name = value
}

export const DELETE_TAX = (state, payload) => {
  const { id } = payload

  const idx = state.taxes
    .map(tax => {
      return tax.id
    })
    .indexOf(id)

  state.taxes.splice(idx, 1)
}

export const BULK_UPDATE_TAX = (state, payload) => {
  state.taxes = payload
}
