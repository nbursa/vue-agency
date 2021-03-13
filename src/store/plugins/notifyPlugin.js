// NOTE: This plugin will trigger loading of a conversation for each opened popup
// meaning, each new conversation that gets added to "openedConversations[]" stack in store,
import { isObject } from "lodash"
export const notifyPlugin = store => {
  store.subscribe(async (mutation, state) => {
    const { type, payload } = mutation
    if (type === "notifications/PUSH_TO_NOTIFIER_STACK") {
    }
  })
}
