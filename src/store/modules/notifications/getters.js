import { Notification } from "@/factories"
import { pipe } from "@/utils/functional"
import { attachAttribute } from "@/utils/general"

export const parsePushNotificationDataById = state => id => {
  return state.pushNotifications
    .map(n => JSON.parse(n.data.data))
    .filter(data => data.id === id)
}

export const getTotal = state => {
  return state.totalNotifications
}
// Get back list of notiifications mapped to action
export const mappedToAction = state => (nOptions, dataName) => {
  if (state[dataName].length) {

    let list = []

    if (dataName === 'notifierStack') {
      console.log("mapper dispached", state[dataName])
      list = state[dataName].map((el) => {
        return  {
          ...el,
          type:el.data.notification_type
        }
      })
    }
    if (dataName === 'list') {
      list = state[dataName]
    }


    const notifications = Object.entries(nOptions).reduce(
      (acc, [type, attrs]) => {

        // Defines how to assign an action to a notification
        const attachActionAttribute = attachAttribute(function(el) {
          el.__attrs = attrs
          return el
        })

        const assignActionToNotification = pipe(attachActionAttribute)
        /*
       * Attach attribute to a collection
       */
        acc.push(
          ...assignActionToNotification(
            Notification().getByType(type)(list)
          )
        )
        return acc
      },
      []
    )
    return notifications
  }
}

/*
 * All unread notifications count (includes all types of notificatons)
 */
export const notificationsCount = state => {
  return state.list.filter(notification => notification.readAt === null)
}

/*
 * Sum of all specified notifications types
 */
export const mappedCount = (state, getters) => nOptions => {
  return (getters.mappedToAction(nOptions, 'list') || []).length
}

// TODO needs to change probably because of how mappedToAction works now!
export const mappedCountUnread = state => nOptions => {
  return Object.entries(nOptions).reduce((sum, arr) => {
    const [type, action] = arr
    return sum + Notification().getCountPerTypeUnread(type)(state.list)
  }, 0)
}

// Return sum of messages per notification type
// makes sense only for notifications of a type message
export const getSumByTypeInPushStack = state => type => {
  const prefix = "Tempest\\Entities\\User\\Notifications\\"
  return state.pushNotifications.filter(
    n => n.data.notification_type === prefix + type + "Notification"
  ).length
}

export const currentPage = state => {
  return state.notificationsPage
}