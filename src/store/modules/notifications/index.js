import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

import notificationActionModel from "@/models/NotificationActionModel"

const state = {
  totalNotifications:null,
  notificationsPage: 1,
  list: [],
  pushNotifications: [],
  notifierStack: [],
  notificationAction: notificationActionModel()
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
