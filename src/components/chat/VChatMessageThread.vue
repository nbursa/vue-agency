<template lang="pug">
div.flex
  div.chat-message-thread(:ref="'chat-message-thread_' + id")
      slot(v-bind:info="info")
      template(v-if="isLoadingThisOne && conversationThreadLength > 15")
        looping-rhombuses-spinner.spinner(
          :animation-duration="800"
          :rhombus-size="10"
          color="#507DFF"
          )
      template(v-if="!threadIsEmpty")
        template(v-for="group in groups")
          p.group-date {{ group }}
          v-chat-message(
            v-for="item in items[group]"
            :item="item",
            :profileImage="profileImage"
            :key="item.id")
      template(v-if="threadIsEmpty && !isLoadingThisOne")
        p <strong>{{$t("navbartop.no_messages")}}</strong>
      template(v-if="isLoadingThisOne")
        looping-rhombuses-spinner.spinner(
          :animation-duration="800"
          :rhombus-size="10"
          color="#507DFF"
          )
  div.text-send
    textarea.textarea(
      ref="ta"
      rows="2"
      :placeholder="$t('message_board.message_placeholder')"
      @keydown.enter.prevent="send"
      v-model="message"
      @focus.once="clear"
      )
    a.send-trigger(@click="send")
      svgicon.icon(name="messages-page/send")
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { debounce } from "lodash"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { LoopingRhombusesSpinner } from "epic-spinners"
import VChatMessage from "./VChatMessage"
import { readServerMessages } from "@/mixins/validationMixin"
import chatLazyLoad from "@/mixins/chatLazyLoad"
import "@/compiled-icons/messages-page"

export default {
  components: {
    VChatMessage,
    LoopingRhombusesSpinner
  },
  mixins: [readServerMessages, chatLazyLoad],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      refEl: null,
      message: "",
      loadingId: null,
      sending: false
    }
  },
  computed: {
    ...mapState(["isLoading", "lastLoadedId"]),
    ...mapGetters("messages", [
      "getThreadById",
      "conversationIndexedByDate",
      "conversationGroups"
    ]),
    ...mapState("userManagement", ["profile"]),
    isLoadingThisOne: function() {
      return this.isLoading && this.lastLoadedId === this.id
    },
    // These are actual messages in a conversation we will be using in a
    // template
    items: function() {
      return this.conversationIndexedByDate(this.id)
    },
    // And groups, so we can show them each belonging to its own date
    groups: function() {
      return this.conversationGroups(this.id)
    },
    conversationThread: function() {
      return this.getThreadById(this.id)
    },
    conversationThreadLength: function() {
      return this.conversationThread.items.length
    },

    threadIsEmpty: function() {
      return this.conversationThreadLength === 0
    },

    lastMessageInThread: function() {
      return this.conversationThread.items[this.conversationThreadLength - 1]
    },
    info: function() {
      const { items, meta } = this.conversationThread
      return {
        total: meta.totalPages,
        current: meta.currentPage,
        messagesLoaded: items.length
      }
    },
    profileImage: function() {
      if (this.profile) {
        return this.profile.image
      }
    }
  },
  watch: {
    lastMessageInThread: function(msg2, msg1) {
      if (msg2 && msg1) {
        const d2 = new Date(msg2.createdAt.date)
        const d1 = new Date(msg1.createdAt.date)
        if (d2 > d1) {
          this.$nextTick(() => {
            this.scrollMessagesToEnd()
          })
        }
      }
    },
    conversationThread: {
      handler: function(newVal, oldVal) {
        // Only when first page is loaded, scroll to bottom
        // otherwise scroll few pixels from top, just to allow user
        // to easy load more messages by scrolling up!
        // if (
        //   newVal.items.length > oldVal.items.length &&
        //   oldVal.items.length === 0
        // ) {
        this.$nextTick(() => {
          this.scrollMessagesToEnd()
        })
        // }
      },
      deep: true
    }
  },
  mounted() {
    // Reinitialize conversation, each time chat popup is reopened
    this.clearThread({ id: this.id })
    this.$nextTick(function() {
      this.refEl = this.$refs["chat-message-thread_" + this.id]
      this.refEl.addEventListener(
        "scroll",
        debounce(this.lazyLoadMoreMessages, 100)
      )
      // this.$refs.ta.focus()
    })
  },
  methods: {
    ...mapActions("messages", [
      "sendMessage",
      "incrementCurrentPage",
      "clearThread",
      "setCurrentPage"
    ]),
     ...mapActions("notifications", [
       "clearPushNotificationStack"
     ]),
    clear() {
      this.clearPushNotificationStack("message")
    },  
    getLastMessageInThread(thread) {
      return thread.items[thread.items.length - 1]
    },
    async send(e) {
      if (!this.message || this.sending) return
      if (e.shiftKey) return
      try {
        this.sending = true

        const sent = await this.sendMessage({
          id: this.id,
          body: this.message
        })
        this.sending = false
        this.message = ""
        this.scrollMessagesToEnd()
      } catch (_) {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: this.serverErrors.join("")
        })
        this.$notify(e)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.chat-message-thread {
  position: relative;
  height: 100%;
  max-height: 350px;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 12px 6px;
}

.group-date {
  text-align: center;
  font-size: 12px;
  color: #2C2C2C;
  opacity: 0.4;
  padding: 0.5em 0;
}

.spinner {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.flex {
  height: 100%;
  display: flex;
  flex-direction: column;

  .textarea {
    border-width: 2px 0 0;
    border-style: solid;
    border-color: #EFEFEF;
    box-shadow: none;
    border-radius: 0;
    resize: none;
    color: #2C4B5C;
    font-size: 14px;
    line-height: 17px;
    padding-right: 45px;
  }
}

.text-send {
  position: relative;

  .send-trigger {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);

    .icon {
      width: 18px;
      height: 18px;
      fill: #128AFF;
      transition: fill 0.25s ease;
    }

    &:hover {
      .icon {
        fill: #0876dd;
      }
    }
  }
}
</style>
