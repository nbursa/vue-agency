import { format, isValid, parse } from "date-fns"
import { app } from "../../main.js"

export const niceDate = function(
  dateString,
  { fmtDisplay = app.$localization.dateFormat.toUpperCase() } = {}
) {
  let d = parse(dateString)

  if (isValid(d)) {
    return format(d, fmtDisplay)
  }
  return "--"
}
