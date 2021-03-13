<template lang="pug">
  .message-chat__form
    .message-chat__form-text
      textarea(
        ref="ta"
        v-model="message"
        @focus.once="clear"
        :placeholder="$t('message_board.input')"
        @keyup="textareaHeight"
        @keydown="onKeyDown"
        @keydown.enter.prevent="onEnter"
        )
    .message-chat__form-cta.message-chat__form-cta--send
      button(@click="onEnter")
        svgicon.icon(name="messages-page/send")
</template>

<script>
import "@/compiled-icons/messages-page"
import chatSendMessage from "@/mixins/chatSendMessage"
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  mixins: [chatSendMessage],
  props: {
    conversation: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      message: ""
    }
  },
  computed: {
    id() {
      return this.conversation.id
    },
    refEl() {
      return this.$getSiblingRef.call(this, "chat-message-thread_" + this.id)
    }
  },
  methods: {
     ...mapActions("notifications", [
       "clearPushNotificationStack"
     ]),
    clear() {
      this.clearPushNotificationStack("message")
    },  
    onKeyDown(el) {
      this.textareaHeight(el)
    },
    onEnter(e) {
      this.send(e)
    },
    textareaHeight(el) {
      // Max height 200px
      el.target.style.height = "0"
      el.target.style.height = Math.min(el.target.scrollHeight, 200) + "px"
      el.target.offsetHeight == 200
        ? (el.target.style.overflow = "auto")
        : (el.target.style.overflow = "hidden")
    }
  }
}
</script>



<style lang="stylus" scoped>
@import '~@/assets/styles/global/mixins';

.message-chat {
  &__form {
    border-top: 2px solid rgba(151, 151, 151, 0.2);
    width: 100%;
    display: flex;
    background-color: white;
    position: relative;
    min-height: 72px;
    border-radius: 0 0 4px 4px;
  }

  &__form-cta {
    flex: 0 0 80px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    button {
      border: 0;
      padding: 25px;
      cursor: pointer;
      background-color: transparent;

      svg {
        width: 22px;
        height: 22px;
        fill: #128AFF;
        transition: fill 0.25s ease;
      }

      &:hover {
        svg {
          fill: #0876dd;
        }
      }

      &:focus {
        outline: none;
      }
    }

    &--send {
      button {
        svg {
          width: 26px;
        }
      }
    }
  }

  &__form-text {
    display: flex;
    flex: 1;

    textarea {
      border: 0;
      font-size: 16px;
      line-height: 24px;
      padding: 22px 0 20px 20px;
      height: 70px;
      resize: none;
      width: 100%;
      overflow: hidden;

      +placeholder() {
        color: #838D98;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
