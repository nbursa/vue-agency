import DateTimeUtils from "@/utils/dateUtils"

export const niceTime = timeObj => {
  let [hours, minutes] = timeObj.split(":")

  if (hours < 10 && hours.length < 2) {
    hours = `0${hours}`
  }

  if (minutes < 10 && minutes.length < 2) {
    minutes = `0${minutes}`
  }
  if (hours === "24") {
    hours = "00"
  }
  return `${hours}:${minutes}`
}

export const niceHours = time => {
  return DateTimeUtils.getTimeFromSQL(time)
}
