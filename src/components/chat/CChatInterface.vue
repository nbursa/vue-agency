<template lang="pug">
  div.chat-dock--fixed(:style="{zIndex: invert * 15}")
    v-chat-popup-dock(
      v-for="conversation in openedConversations"
      :key="conversation.id"
      :conversation="conversation"
      @close-chat-popup="closeChatPopup"
      )
      v-chat-message-thread(
        @lazy-load="lazyLoad(...arguments, $event)"
        :id="conversation.id"
        )
        // pre(slot-scope="{ info }") {{ info }}
</template>

<script>
import VChatPopupDock from "./VChatPopupDock"
import VChatMessageThread from "./VChatMessageThread"
import { mapState, mapActions } from "vuex"

export default {
  components: { VChatPopupDock, VChatMessageThread },
  computed: {
    ...mapState("messages", ["openedConversations"])
  },
  data() {
    return {
      invert: 1
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.name === 'messages') {
        this.invert = -1
      } else {
        this.invert = 1
      }
    }
  },
  methods: {
    ...mapActions("messages", [
      "closeConversation",
      "getConversation" // this one actually loads message thread!
    ]),
    closeChatPopup(id) {
      this.closeConversation(id)
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
.chat-dock--fixed {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: none;
  width: 100%;
  position: fixed;
  bottom: 15px;
  left: 0;
}
</style>
