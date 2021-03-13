export const SET_GRADES = (state, payload) => {
  /*
  * Have grades sorted by level
  */
  state.grades = payload.sort((g1, g2) => {
    return g1.level > g2.level
  })
}

export const ADD_GRADE = (state, payload) => {
  state.grades.push(payload)
}

export const UPDATE_GRADE = (state, payload) => {
  const { value, id } = payload

  const edit = state.grades.filter(grade => {
    return grade.id === id
  })

  edit[0].name = value
}

export const DELETE_GRADE = (state, payload) => {
  const { id } = payload

  const idx = state.grades
    .map(grade => {
      return grade.id
    })
    .indexOf(id)

  state.grades.splice(idx, 1)
}

export const BULK_UPDATE_GRADE = (state, payload) => {
  state.grades = payload
}
