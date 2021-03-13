<template lang="pug">
  .message-chat__messages.is-clearfix(:ref="'chat-message-thread_' + id")
    template(v-if="isLoadingThisOne && conversationThreadLength > 15")
      looping-rhombuses-spinner.spinner(
        :animation-duration="800"
        :rhombus-size="10"
        color="#507DFF"
        )
    template(v-if="!threadIsEmpty")
      template(v-for="group in groups")
        .message-chat__date
          span {{ group }}
        v-chat-message(
          v-for="item in items[group]"
          :item="item"
          :profileImage="profileImage"
          :key="item.id"
          )
    template(v-if="threadIsEmpty && !isLoadingThisOne")
      p.message-chat__info <strong>No messages</strong>
    template(v-if="isLoadingThisOne")
      looping-rhombuses-spinner.spinner(
        :animation-duration="800"
        :rhombus-size="10"
        color="#507DFF"
        )
</template>

<script>
import { LoopingRhombusesSpinner } from "epic-spinners"
import VChatMessage from "./VChatMessage"
import { mapActions, mapGetters, mapState } from "vuex"
import { debounce } from "lodash"
import chatLazyLoad from "@/mixins/chatLazyLoad"

export default {
  name: "PanelChatThread",
  components: {
    LoopingRhombusesSpinner,
    VChatMessage
  },
  mixins: [chatLazyLoad],
  data() {
    return {
      refEl: null
    }
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: null
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
    profileImage: function() {
      if (this.profile) {
        return this.profile.image
      }
    }
  },
  watch: {
    id: function() {
      this.clearThread({ id: this.id })
    },
    conversationThread: {
      handler: function() {
        this.$nextTick(() => {
          this.scrollMessagesToEnd()
        })
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.refEl = this.$refs["chat-message-thread_" + this.id]
      this.refEl.addEventListener(
        "scroll",
        debounce(this.lazyLoadMoreMessages, 100)
      )
    })
  },
  methods: {
    ...mapActions("messages", ["clearThread"])
  }
}
</script>


<style lang="stylus" scoped>
.message-chat__messages {
  padding: 0 20px;
  overflow-y: auto;
  position: relative;
  flex: 1;
  background: white;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.message-chat__date {
  position: relative;
  text-align: center;
  padding: 12px 0;

  &:first-child {
    margin-top: 10px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background: rgba(151, 151, 151, 0.2);
    display: block;
  }

  span {
    background-color: white;
    padding: 0 20px;
    position: relative;
    z-index: 1;
    font-size: 14px;
    font-weight: 700;
    color: #2C2C2C;
  }
}

.message-chat__info {
  padding: 20px 0;
}
</style>
