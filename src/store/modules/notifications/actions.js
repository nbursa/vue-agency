// Import here repository, as a proxy interface to api methods
/* eslint-disable no-console */
import * as r from "@/store/modules/notifications/repository"
import notificationActionModel from "@/models/NotificationActionModel"
import { isEmpty } from "lodash"

export const getList = async ({ commit, state }, options) => {
  const notificationsList = await r.list(options)
  commit('SET_TOTAL',notificationsList.meta.pagination.total)
  // After lazy loading notifications, prevent to store them if they are already in state collection
  let hasTotal = (state.list.length === notificationsList.meta.pagination.total) ? true : false
  if(!hasTotal) {
    commit("STORE_NOTIFICATIONS", notificationsList.data)
  }
  return Promise.resolve(notificationsList)
}

export const addPushNotification = ({ commit }, notification) => {
  commit("ADD_PUSH_NOTIFICATION", notification)
}

export const clearPushNotificationStack = ({ commit }, byType) => {
  // Clear notification stack by type (message or other)
  const clearMessages = byType === "message" ? true : false
  commit("CLEAR_PUSH_NOTIFICATION_STACK", clearMessages)
}

export const removePushNotificationById = ({ commit }, id) => {
  commit("REMOVE_PUSH_NOTIFICATION_BY_ID", id)
}

// Register last received push notification, so it becomes available
// anywhere through the app
export const pushToNotifierStack = ({ commit }, last) => {
  commit("PUSH_TO_NOTIFIER_STACK", last)
}
export const removeFromNotifierStackById = ({ commit }, id) => {
  commit("REMOVE_FROM_NOTIFIER_STACK_BY_ID", id)
}

export const markNotificationAsRead = async ({ commit, dispatch }, id) => {
  await r.markAsRead(id)
  dispatch("getList")
}

// Notification redirects on actions
//
export const resetNotificationActionModel = ({ commit }) => {
  commit("RESET_NOTIFICATION_ACTION_MODEL", notificationActionModel)
}

export const storeNotificationAction = ({ commit }, action) => {
  if (!isEmpty(action)) {
    commit("STORE_NOTIFICATION_ACTION", action)
  } else {
    commit("RESET_NOTIFICATION_ACTION_MODEL", notificationActionModel)
  }
}

export const setNotificationsPage = ({ commit }, payload) => {
  commit("SET_NOTIFICATIONS_PAGE", payload)
}