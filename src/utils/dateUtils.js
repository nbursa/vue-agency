import { DateTime, Duration } from 'luxon'
import { app } from '../main.js'

export default class DateUtils {
  static getDateTime() {
    return DateTime
  }

  static getLocaleDateFormat() {
    return app.$localization.dateFormat
  }

  static getLocaleTimeFormat() {
    return app.$localization.timeFormat === '24h' ? 'HH:mm' : 'hh:mm a'
  }

  static getDateFromSQL(d) {
    return DateTime.fromSQL(d).toFormat(this.getLocaleDateFormat())
  }
  // static getTimeFromSQL(d) {
  //   return DateTime.fromSQL(d).toFormat("HH:mm")
  // }

  static getTimeFromSQL(d) {
    return DateTime.fromSQL(d).toFormat(this.getLocaleTimeFormat())
  }
  static getDateTimeFromSQL(d) {
    return DateTime.fromSQL(d).toFormat(
      `${this.getLocaleDateFormat()} ${this.getLocaleTimeFormat()}`
    )
  }
  static getCalendarFormat(d) {
    return DateTime.fromSQL(d).toFormat(
      `${this.getLocaleDateFormat()} ${this.getLocaleTimeFormat()}`
    )
  }

  static getFlatpickrFormat(d) {
    return DateTime.fromJSDate(d).toFormat(
      `${this.getLocaleDateFormat()} ${this.getLocaleTimeFormat()}`
    )
  }

  static hasStartDate(job) {
    return job.startTime
  }
  static hasEndDate(job) {
    return job.endTime
  }
  static getDateFromJS(date) {
    return DateTime.fromJSDate(date).toFormat(this.getLocaleDateFormat())
  }

  static getDateTimeFromJS(date) {
    return DateTime.fromJSDate(date).toFormat(`yyyy-MM-dd HH:mm:ss`)
  }

  static getDateTimeFromClient(date) {
    return DateTime.fromFormat(date, this.getLocaleDateFormat()).toFormat(
      'yyyy-MM-dd'
    )
  }

  static getDateWithTime(date, time) {
    let dateTime
    if (time) {
      dateTime = `${date} ${time}:00`
    } else {
      dateTime = `${date}`
    }
    return DateTime.fromFormat(
      dateTime,
      `${this.getLocaleDateFormat()} HH:mm:ss`
    ).toFormat(`yyyy-MM-dd HH:mm:ss`)
  }

  static getDateWithMonthName(date, time) {
    return DateTime.fromFormat(`${date}`, 'yyyy-LL-dd', {
      locale: app.$i18n.locale === 'de_un' ? 'de' : app.$i18n.locale
    }).toFormat('dd LLLL yyyy')
  }

  static getTimeWithMilis(time) {
    return Duration.fromMillis(time).shiftTo('hours', 'minutes').toObject()
  }

  static getDurationLength(start, end) {
    let i1 = Duration.fromObject(DateTime.fromSQL(start).toObject())
      .shiftTo('milliseconds')
      .toObject().milliseconds
    let i2 = Duration.fromObject(DateTime.fromSQL(end).toObject())
      .shiftTo('milliseconds')
      .toObject().milliseconds
    return Duration.fromMillis(i2 - i1)
      .shiftTo('milliseconds')
      .toObject()
  }

  static getItemWithDate(items, date) {
    return items.find((item) => item.startTime === date)
  }

  static compareTime(selectedTime, endTime = {}) {
    const current = {
      hours:
        endTime.hours || endTime.hours === 0
          ? endTime.hours
          : DateTime.local().hour,
      minutes:
        endTime.minutes || endTime.minutes === 0
          ? endTime.minutes
          : DateTime.local().minute
    }
    return (
      DateTime.fromObject(selectedTime).valueOf() -
        DateTime.fromObject(current).valueOf() <=
      0
    )
  }

  static getCurrentDate(options) {
    if (options === 'parts') {
      return {
        day: DateTime.local().day,
        month: DateTime.local().month,
        year: DateTime.local().year,
        hour: DateTime.local().hour,
        minute: DateTime.local().minute
      }
    } else {
      return DateTime.local().toFormat('yyyy-MM-dd')
    }
  }

  static getCrossoverDate(start, end, startDay) {
    const startDate = {
      hours: Number(start.split(':')[0]),
      minutes: Number(start.split(':')[1])
    }
    const endDate = {
      hours: Number(end.split(':')[0]),
      minutes: Number(end.split(':')[1])
    }
    return DateTime.fromObject(endDate).valueOf() -
      DateTime.fromObject(startDate).valueOf() <=
      0
      ? DateTime.fromFormat(startDay, this.getLocaleDateFormat())
          .plus({
            days: 1
          })
          .toFormat(this.getLocaleDateFormat())
      : startDay
  }

  static getMinifiedTime(time) {
    let hours = time.split(':')[0]
    let minutes = time.split(':')[1]
    let convertedMinutes = minutes
      ? Math.round(((10 * minutes) / 60) * 1) / 1
      : null
    let convertedHours =
      hours.substring(0, 1) == 0 ? hours.substring(1, 2) : hours

    return convertedMinutes
      ? `${convertedHours}.${convertedMinutes}`
      : `${convertedHours || 0}`
  }

  static getDuration(start, end, format = ['hours', 'minutes']) {
    let i1 = DateTime.fromSQL(start)
    let i2 = DateTime.fromSQL(end)
    return i2.diff(i1, format).toObject()
  }

  static getDateFromLuxonObject(date) {
    return date.toFormat(`${this.getLocaleDateFormat()}`)
  }

  static getFormattedTime(time, fromFormat = 'HH:mm') {
    return DateTime.fromFormat(time, fromFormat).toFormat(
      `${this.getLocaleTimeFormat()}`
    )
  }

  static formattedTime(time, fromFormat = 'HH:mm:ss') {
    return DateTime.fromFormat(time, fromFormat)
      .toFormat(`${this.getLocaleTimeFormat()}`)
      .replaceAll(' ', '')
      .toLowerCase()
  }
  // TODO@mr add more options eg months, hours & minutes
  static addDay(date, daysToAdd) {
    const newDate = new Date(date)
    return newDate.setTime(newDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  }
}
