// NOTE: This plugin will trigger loading of a conversation for each opened popup
// meaning, each new conversation that gets added to "openedConversations[]" stack in store,
import { isObject } from "lodash"
export const chatPlugin = store => {
  store.subscribe(async (mutation, state) => {
    const { type, payload } = mutation
    if (type === "messages/PUSH_CONVERSATION_TO_STACK") {
      const conversationId = payload.id
      // Dispatch getConversation() for newly pushed conversation in stack

      await store.dispatch("messages/getConversation", {
        id: conversationId,
        page: 1
      })
      // Mark this one as read
      await store.dispatch("messages/markAsReadConversation", conversationId)
      // Refetch to show actual counter in drop-down
      await store.dispatch("messages/getConversations")
    }
  })
}
