export const STORE_NOTIFICATIONS = (state, payload) => {
  // Merge incoming list collection with state list collection
  let hash = new Map()
  state.list.concat(payload).forEach(function(obj) {
    hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj))
  })
  state.list = Array.from(hash.values())
}

export const ADD_PUSH_NOTIFICATION = (state, payload) => {
  state.pushNotifications.push(payload)
}

export const SET_TOTAL= (state, payload) => {
  state.totalNotifications = payload
}

export const SET_NOTIFICATIONS_PAGE = (state, payload) => {
  state.notificationsPage = payload
}

export const CLEAR_PUSH_NOTIFICATION_STACK = (state, clearMessages) => {
  // Clear stack by type, eg. message OR anything that is not a message
  const prefix = "Tempest\\Entities\\User\\Notifications\\"
  // console.log(
  //   "clearMessages (true for message, false for other): ",
  //   clearMessages
  // )
  state.pushNotifications = state.pushNotifications.filter(n => {
    return clearMessages
      ? n.data.notification_type !== prefix + "ConversationMessageNotification"
      : n.data.notification_type === prefix + "ConversationMessageNotification"
  })
}

export const REMOVE_PUSH_NOTIFICATION_BY_ID = (state, id) => {
  state.pushNotifications = state.pushNotifications.filter(n => {
    return JSON.parse(n.data.data).id !== id
  })
}

export const PUSH_TO_NOTIFIER_STACK = (state, last) => {
  state.notifierStack.push(last)
}

export const REMOVE_FROM_NOTIFIER_STACK_BY_ID = (state, id) => {
  // Unregister push notification from notifierStack array, find by notification ID
  state.notifierStack = state.notifierStack.filter(item => {
    return item.data.notification_id !== id
  })
}

export const STORE_NOTIFICATION_ACTION = (state, action) => {
  state.notificationAction = action
}

export const RESET_NOTIFICATION_ACTION_MODEL = (state, model) => {
  state.notificationAction = Object.assign(state.notificationAction, model())
}
