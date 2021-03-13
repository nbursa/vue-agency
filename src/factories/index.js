const defaultText = "?"
const defaultAction = () => {}
const defaultStyle = []

export const FooterControl = function({
  text = defaultText,
  action = defaultAction,
  style = defaultStyle
}) {
  this.text = text
  this.action = action
  this.style = style
}

/*
 * Notification factory
 */
import { notificationTypes } from "@/config/notificationTypes"
import { DateTime } from "luxon"
import { kebabCase } from "lodash"
import { noop } from "@/utils/general"
import { pipe } from "@/utils/functional"

const unread = item => item.readAt === null

export const Notification = function() {
  const prefix = "Tempest\\Entities\\User\\Notifications\\"
  const map = notificationTypes.reduce((acc, type) => {
    acc[type.slice(0, -"Notification".length)] = prefix + type
    return acc
  }, {})

  /*
   * Get by type, sorted by date in descending order
   */
  const getByType = type => collection => {
    return collection
      .map(_n => {
        return {
          ..._n,
          luxonDate: DateTime.fromSQL((_n.data.createdAt || {}).date),
          icon: kebabCase(type)
        }
      })
      .filter(_n => {
        return _n.type === map[type]
      })
      .sort((v1, v2) => {
        return v2.luxonDate - v1.luxonDate
      })
  }
  /*
   * Return sum of messages in a collection
   * messages count in contained in counter variable
   * within data object
   */
  const getCount = collection => {
    return collection.reduce((sum, item) => {
      if (item.data.counter) {
        sum += item.data.counter // just for messages
      } else {
        sum += 1 // all other notification types
      }
      return sum
    }, 0)
  }

  const getUnread = collection => collection.filter(unread)
  /*
   * Get notifications count per type
   */
  const getCountPerType = type => collection => {
    return pipe(getByType(type), getCount)(collection)
  }

  const getCountPerTypeUnread = type => collection => {
    return pipe(getByType(type), getUnread, getCount)(collection)
  }
  /*
  * Expose public API
  */
  return {
    getByType,
    getCountPerType,
    getCountPerTypeUnread
  }
}
