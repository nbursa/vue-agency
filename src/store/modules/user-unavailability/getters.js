import { app } from "@/main.js"

export const getErrors = state => state.errors

export const getWithFullName = state =>
  state.userRequests.map(item => {
    switch(item.type) {
      case 1:
        item.prettyType = app.$t("requests.holiday")
        break
      case 2:
        item.prettyType = app.$t("requests.sick_leave")
        break
      case 3:
        item.prettyType = app.$t("requests.unavailable")
        break
    }
    item.user.fullName = item.user.firstName + " " + item.user.lastName
    return item
  })
