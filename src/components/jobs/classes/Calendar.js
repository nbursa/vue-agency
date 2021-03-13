import _ from "lodash"
import { DateTime } from "luxon"
import Vue from "vue"

export default class {
  constructor(days, date) {
    this.days = days
    this.date = date
  }

  set days(days) {
    this._days = days
    // console.log("Calendar setter for _days field: ", this._date)
  }

  get days() {
    return this._days
  }

  set date(date) {
    this._date = date
    // console.log("Calendar setter for _date field: ", this._date)
  }

  get date() {
    return this._date
  }

  /*
  * Go today's date
  */
  today() {
    let { month, year } = DateTime.local()
    this.date = Object.assign(this.date, {
      month,
      year
    })
  }

  /*
  * Navigate to a specific day in a calendar
  * @param day Day to navigate to
  */
  goto(date) {
    this.date = Object.assign(this.date, {
      month: date.month,
      year: date.year
    })
  }

  /*
  * Adds an object to data prop of a specific day
  * @param day Day where to put payload
  * @payload [PlainObject] Payload coming from server or locally
  */
  feedIntoCell(day, payload = {}) {
    return this._days.filter(_day => {
      if (_day.item.hasSame(day, "day")) {
        // Vue.set(_day, "meta", { isAffected: true })
        Vue.set(_day, "payload", {
          render: Object.assign(_day.payload.render || {}, payload.render)
        })
      }
    })
  }
}
