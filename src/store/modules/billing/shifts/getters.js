import DateTimeUtils from "@/utils/dateUtils.js"

export const getShiftsWithDateTime = state => {
  return state.shifts.map(shift => {
    let shiftDate = "--"
    let startTime = "--"
    let endTime = "--"

    if (DateTimeUtils.hasStartDate(shift)) {
      shiftDate = DateTimeUtils.getDateFromSQL(shift.startTime)
      startTime = DateTimeUtils.getTimeFromSQL(shift.startTime)
    }

    if (DateTimeUtils.hasEndDate(shift)) {
      endTime = DateTimeUtils.getTimeFromSQL(shift.endTime)
    }

    shift.shiftDate = shiftDate
    shift.shiftTime = startTime + " - " + endTime

    return shift
  })
}

export const additionalsTotal = state => {
  let total = 0
  state.additionals.forEach(item => {
    total += +item.value
  })
  return total
}
