import DateUtils from '@/utils/dateUtils'
import { getIncrementTimeOptions } from '@/components/submit-job/timeOptions'
const times = getIncrementTimeOptions()

export const getShiftsArray = ({ shifts, sortType }) => {
  let arr = []
  Object.keys(shifts).forEach((key) => {
    const shiftWithTimes = [
      ...shifts[key].map((shift) => {
        const { date, to, from } = shift
        const endDate =
          to <= from
            ? DateUtils.getDateFromJS(new Date(DateUtils.addDay(date, 1)))
            : DateUtils.getDateFromJS(date)

        return {
          ...shift,
          startTime: DateUtils.getDateWithTime(
            DateUtils.getDateFromJS(date),
            times.filter(({ id }) => id === from)[0].label
          ),
          endTime: DateUtils.getDateWithTime(
            endDate,
            times.filter(({ id }) => id === to)[0].label
          ),
          showBadge: to <= from
        }
      })
    ]

    arr = [...arr, ...shiftWithTimes].sort((a, b) => {
      return sortType === 'chrono'
        ? a.date - b.date
        : b.timeClicked - a.timeClicked
    })
  })
  return arr
}

export const flatpickrSelected = ({ shifts }) => {
  let selectedByMonth = {}

  Object.keys(shifts).forEach((key) => {
    shifts[key].map((item) => {
      const onlyMonth = key.split('.')[1]
      if (selectedByMonth[onlyMonth]) selectedByMonth[onlyMonth].push(item.date)
      if (!selectedByMonth[onlyMonth]) selectedByMonth[onlyMonth] = [item.date]
    })
  })

  return selectedByMonth
}

export const showCandidates = ({ shifts }, { getShiftsArray }) => {
  if (Object.keys(shifts).length > 0 && getShiftsArray.length > 0) {
    return true
  }
  return false
}
