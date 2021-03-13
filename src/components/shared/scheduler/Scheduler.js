import _ from "lodash"
import { DateTime } from "luxon"

export default class {
  constructor(days, date, interval) {
    this.date = date
    this.days = days
    this.interval = interval
  }

  set date(date) {
    this._date = date
  }

  get date() {
    return this._date
  }


  set days(days) {
    this._days = days
  }

  get days() {
    return this._days
  }

  set interval(interval) {
    this._interval = interval
  }

  get interval() {
    return this._interval
  }

  /*
  *  Set todays date
  */
  today() {
    let { day, month, year } = DateTime.local()
    this.date = Object.assign(this.date, {
      day,
      month,
      year
    })
  }

  /*
  * Navigate to a specified calendar date
  * @param day target day
  */
  goto(date) {
    this.date = Object.assign(this.date, {
      month: date.month,
      year: date.year
    })
  }
}