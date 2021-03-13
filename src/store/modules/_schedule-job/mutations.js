import { DateTime } from 'luxon'
// TODO @mr optimize loops
export const SET_ACTIVE_SHIFTS = (
  state,
  { dates, from, to, positions, month, year, timeClicked }
) => {
  let shifts = []
  let parentIds = []
  let childIds = []

  dates.forEach((date, i) => {
    let elementObj = {
      id: from + to + date.getTime(),
      from: from,
      to: to,
      date: new Date(date.setHours(1, 1, 1)),
      positions: positions,
      dateTitle: DateTime.fromJSDate(date).toFormat('ccc dd MMM'),
      timeClicked
    }
    if (state.shifts[`${year}.${month}`]) {
      state.shifts[`${year}.${month}`].forEach((element) => {
        if (element.date.getTime() == date.getTime()) {
          if (
            element.childId &&
            !elementObj.parentId &&
            !childIds.includes(element.childId)
          ) {
            childIds.push(element.childId)
            elementObj = element
          }
          if (
            element.parentId &&
            !elementObj.childId &&
            !parentIds.includes(element.parentId)
          ) {
            parentIds.push(element.parentId)
            elementObj = element
          }
          if (!element.childId && !element.parentId) {
            elementObj = element
          }
        }
      })
    }

    shifts.push(elementObj)
  })
  const cloneShifts = { ...state.shifts }
  cloneShifts[`${year}.${month}`] = shifts
  state.shifts = cloneShifts
}

export const EDIT_SHIFTS_DATA = (state, { shifts, from, to, positions }) => {
  const newShifts = { ...state.shifts }
  Object.keys(newShifts).map((key) => {
    newShifts[key].map((item, i) => {
      const shiftIndex = shifts.indexOf(item.id)
      if (shiftIndex > -1) {
        newShifts[key][i].from = from
        newShifts[key][i].to = to
        newShifts[key][i].positions = positions
      }
    })
  })

  state.shifts = newShifts
}

export const SET_SORT_TYPE = (state, data) => {
  state.sortType = data
}

export const SPLIT_SHIFT = (state, data) => {
  const key = `${data.date.getFullYear()}.${data.date.getMonth()}`
  const shiftsClone = { ...state.shifts }
  const shifts = {
    from: 109,
    to: 205,
    childFrom: 217,
    childTo: 288
  }
  const monthShifts = shiftsClone[key].map((item) => {
    if (item.date === data.date) {
      if (item.to + 12 < 277 && item.to + 60 < 289) {
        shifts.childFrom = item.to + 12
        shifts.from = item.from
        shifts.childTo = item.to + 60
        shifts.to = item.to
      }
      shifts.timeClicked = item.timeClicked - 1
      return {
        ...item,
        from: shifts.from,
        to: shifts.to,
        childId: shifts.childFrom + shifts.childTo + data.date.getTime()
      }
    }
    return item
  })
  monthShifts.push({
    ...data,
    timeClicked: shifts.timeClicked,
    from: shifts.childFrom,
    to: shifts.childTo,
    parentId: data.id,
    id: shifts.childFrom + shifts.childTo + data.date.getTime()
  })
  shiftsClone[key] = monthShifts
  state.shifts = shiftsClone
}

export const REMOVE_SHIFT = (state, data) => {
  const newShifts = { ...state.shifts }
  Object.keys(newShifts).map((key) => {
    const month = newShifts[key]
      .map((item, i) => {
        if (item.id === data) {
          return null
        }
        if (item.parentId === data) {
          item.parentId = false
        }
        if (item.childId === data) {
          item.childId = false
        }
        return item
      })
      .filter((e) => e !== null)
    newShifts[key] = month
  })
  state.shifts = newShifts
}
