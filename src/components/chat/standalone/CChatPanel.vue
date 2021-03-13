<template lang="pug">
.messages-wrapper
  VSidebar(
    :conversations="conversationsByDate"
    @open-full-chat-conversation="loadChat"
    )

  .messages-wrapper__right-side(
    v-if="openChatId"
    )
    VChatPanel(
      :conversation="conversation"
      )
    VChatThread(
      :id="openChatId"
      @lazy-load="lazyLoad(...arguments, $event)"
      )
    VChatMessageSender(
      :conversation="conversation")
  .messages-wrapper__right-side(v-else)
    p {{ $t("message_board.choose_thread") }}

</template>

<script>
import VSidebar from "./sidebar/VSidebar"
import VChatPanel from "./VChatPanel"
import VChatThread from "./VChatThread"
import VChatMessageSender from "./VChatMessageSender"
import { mapState, mapActions, mapGetters } from "vuex"

export default {
  components: {
    VSidebar,
    VChatPanel,
    VChatThread,
    VChatMessageSender
  },
  provide() {
    const person = {}
    Object.defineProperty(person, "avatar", {
      enumerable: true,
      get: () => this.conversation.avatar
    })
    return { person }
  },
  data() {
    return {
      openChatId: null,
      conversation: null
    }
  },
  computed: {
    ...mapState("messages", ["conversations", "openedConversations"]),
    ...mapGetters("messages", ["conversationsByDate"])
  },
  watch: {
    conversations() {
      if (this.conversations.length > 0) {
        this.loadChat(this.conversations[0])
      }
    }
  },
  methods: {
    ...mapActions("messages", [
      "closeConversation",
      "getConversation" // this one actually loads message thread!
    ]),
    async loadChat(e) {
      // e -> conversation object
      await this.loadConversation(e.id)
      this.openChatId = e.id
      this.conversation = e
    },
    loadConversation(id, page = 1) {
      console.log(`loading conversation with id = ${id}`)
      this.getConversation({ id, page })
    },
    async lazyLoad({ done, conversationId, currentPage }, args) {
      console.log("debug", conversationId, currentPage)
      await this.loadConversation(conversationId, currentPage)
      done(args)
    }
  }
}
</script>

<style lang="stylus" scoped>
.messages-wrapper {
  display: flex;
  height: 100%;

  &__right-side {
    flex: 1;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
