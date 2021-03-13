<template lang="pug">
.notifications-dropdown__thread(@click="openConversation(conversation)" :class="{'is-unread': messageRead}")
  .thread-image
    .thread-image__inner
      div(v-if="conversation.avatar" :style="avatarStyle")
      div(v-else)
        svgicon(name="global/avatar-default" :original="true")
  .thread-content(v-if="conversation")
    .sender {{ conversation.name }} {{ conversation.counter > 0 ? `( ${conversation.counter} )` : '' }}
    .info {{ startCase( conversation.roleName ) }}
    .description {{ conversation.message | excerpt(4) }}
    .time {{ humanTime }}
</template>
<script>
import { DateTime } from "luxon"
import { startCase } from "lodash"
import { errorDefaults } from "@/config/notifications"
import dateTimeMixin from "@/mixins/dateTime.mixin"
import { mapActions } from "vuex"
export default {
  props: {
    conversation: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  mounted() {},
  mixins: [dateTimeMixin],
  computed: {
    avatarStyle: function() {
      return {
        backgroundImage: `url(${this.conversation.avatar})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        borderRadius: "100%"
      }
    },
    messageRead: function() {
      return this.conversation.readAt === null ? true : false
    },
    conversationDate: function() {
      return DateTime.fromSQL(this.conversation.createdAt)
    },
    humanTime: function() {
      return this.conversationDate.toFormat("HH:mm")
    }
  },
  methods: {
    startCase,
    ...mapActions("messages", [
      "pushConversationToStack",
      "flickerConversation"
    ]),
    openConversation(conversation) {
      this.pushConversationToStack(conversation).catch(msg => {
        this.flickerConversation(conversation.id)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.notifications-dropdown__thread {
  border-bottom: 1px solid #f5f5f5;
  height: 100px;
  display: flex;
  padding: 11px 0;

  &.is-unread {
    .thread-image__inner {
      border-color: #367ae2;
      padding: 2px;
      width: 46px;
      height: 46px;

      .svg-icon {
        width: 38px;
        height: 38px;
      }
    }
  }

  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }

  .thread-image {
    flex: 0 0 67px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__inner {
      width: 48px;
      height: 48px;
      overflow: hidden;
      border-radius: 50%;
      display: flex;
      align-items: center;
      border: 2px solid transparent;

      .svg-icon {
        width: 45px;
        height: 45px;
      }
    }
  }

  .thread-content {
    flex: 1;
    position: relative;
    overflow: hidden;
    padding-right: 45px;

    .sender {
      font-weight: 600;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .info {
      font-weight: 300;
      color: #888;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description {
      font-size: 16px;
      padding-top: 0.5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time {
      font-size: 11px;
      color: rgba(54, 54, 54, 0.6);
      position: absolute;
      right: 9px;
      top: -3px;
    }
  }
}
</style>
