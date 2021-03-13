import CNotificationsInterface from "./CNotificationsInterface"

export default [
  {
    path: "/notifications",
    name: "notifications",
    meta: {
      caption: "notifications",
      resource: "Notification"
    },
    component: CNotificationsInterface
  }
]
