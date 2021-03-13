import CChatPanel from "./CChatPanel"
import VMessagesChat from "./VMessagesChat.vue"
import VChatPanel from "./VChatPanel.vue"
import VChatThread from "./VChatThread.vue"
import VChatMessage from "./VChatMessage.vue"
import VChatMessageSender from "./VChatMessageSender.vue"
import VMessageSidebar from "./sidebar/VSidebar.vue"

export default [
  {
    path: "/messages-chat",
    name: "messagesChat",
    component: VMessagesChat,
    meta: {
      resource: "Chat"
    }
  },
  {
    path: "/chat-panel",
    name: "chatPanel",
    component: VChatPanel,
    meta: {
      resource: "Chat"
    }
  },
  {
    path: "/chat-thread",
    name: "chatThread",
    component: VChatThread,
    meta: {
      resource: "Chat"
    }
  },
  {
    path: "/chat-message",
    name: "chatMessage",
    component: VChatMessage,
    meta: {
      resource: "Chat"
    }
  },
  {
    path: "/chat-sender",
    name: "chatMessageSender",
    component: VChatMessageSender,
    meta: {
      resource: "Chat"
    }
  },
  {
    path: "/sidebar",
    name: "messageSidebar",
    component: VMessageSidebar,
    meta: {
      resource: "Chat"
    }
  },
  {
    path: "/messages",
    name: "messages",
    meta: {
      caption: "messages",
      resource: "Chat"
    },
    component: CChatPanel
  }
]
