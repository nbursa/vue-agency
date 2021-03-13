<template lang="pug">
  div.chat-popup(:class="popupClass")
    .chat-popup__header(ref="chat-header" @click="minmax")
      | {{ conversation.name || `${conversation.firstName} ${conversation.lastName}` }}
      span.close(@click.stop="close")
        svgicon.vue-icon(
          name="global/close"
          width="26px" height="26px"
          :fill="false"
          )
    .chat-popup__content(v-show="!minimized")
      slot
</template>
<script>
import "@/compiled-icons/global"
import { mapState, mapActions } from "vuex"
export default {
  provide() {
    const person = {}
    Object.defineProperties(person, {
      name: {
        enumerable: true,
        get: () => this.conversation.name || this.conversation.firstName
      },
      avatar: {
        enumerable: true,
        get: () => this.conversation.avatar
      }
    })
    return { person }
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      minimized: false,
      popupState: "is-maximized",
      chatHeader: null
    }
  },
  computed: {
    ...mapState("messages", ["flickeringId"]),
    popupClass: function() {
      return "chat-popup--" + this.popupState
    },
    shouldFlicker: function() {
      return this.flickeringId === this.conversation.id
    }
  },
  watch: {
    shouldFlicker(trueOrFalse) {
      if (trueOrFalse) {
        // Tilt the chat popup titlebar
        this.flicker()
        // Focus textarea
        const ta = this.$slots.default[0].child.$refs.ta
        ta.focus()
      }
    }
  },
  mounted() {
    this.chatHeader = this.$refs["chat-header"]
    this.chatHeader.addEventListener("animationend", () => {
      this.chatHeader.classList.remove("is-flickering")
      this.flickerConversation(null)
    })
    this.flicker()
  },
  methods: {
    ...mapActions("messages", ["flickerConversation"]),
    flicker() {
      this.chatHeader.classList.add("is-flickering")
    },
    minmax() {
      this.popupState =
      this.popupState === "is-maximized" ? "is-minimized" : "is-maximized"
      this.minimized = !this.minimized
    },
    close() {
      this.$emit("close-chat-popup", this.conversation.id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.vue-icon {
  color: white;
}

span.close {
  cursor: pointer;
}

.chat-popup {
  transition: height 0.16s;
  backface-visibility: hidden;

  &--is-maximized {
    height: 400px;
  }

  &--is-minimized {
    height: 50px;
  }

  pointer-events: auto;
  margin-right: 10px;
  width: 280px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    color: white;
    font-weight: bold;
    background-color: #367AE2;
    height: 40px;
    padding: 3px 7px 3px 15px;
    font-size: 15px;
    cursor: pointer;

    .vue-icon {
      color: #9EBBF1;
      transition: color 0.25s ease;

      &:hover {
        color: white;
      }
    }
  }

  &__content {
    padding: 3px 0;
  }

  .chat-popup__content {
    height: 90%;
  }
}

.is-flickering {
  animation: 0.3s 2 flicker;
  transform: translate3d(0, 0, 0);
}

@keyframes flicker {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}
</style>
