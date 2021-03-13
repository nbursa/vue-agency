import router from "@/router"

export const notificationActionPlugin = store => {
  store.subscribe(async (mutation, state) => {
    if (mutation.type === "notifications/STORE_NOTIFICATION_ACTION") {
      router.push({ path: mutation.payload.route })
    }
  })
}
