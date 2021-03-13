<template lang="pug">
.notifications-dropdown__thread(:class="readAt" @click="applyAction")
  .new-notifications
  .thread-image
    svgicon.icon(
      :name="`notifications/${notification.icon}`"
      :width="'45'"
      :height="'45'"
      :fill="true"
      :original="true"
      )
  .thread-content(v-if="notification")
    .sender {{ sender }} {{readAtDate}}
    .info {{ notificationType }}
</template>
<script>
import { DateTime } from 'luxon'
import { startCase } from 'lodash'
import { notificationRedirects } from '@/config/notifications'
import dateTimeMixin from '@/mixins/dateTime.mixin'
import DateTimeUtils from '@/utils/dateUtils.js'

export default {
  mixins: [dateTimeMixin],
  props: {
    notification: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    readAt() {
      return {
        read: !!this.notification.readAt
      }
    },
    readAtDate() {
      return (
        this.notification.readAt &&
        `- ${DateTimeUtils.getCalendarFormat(this.notification.readAt)}`
      )
    },
    notificationType: function () {
      const nt = this.notification.type
      return this.$t(
        `notifications.${nt
          .substring(nt.lastIndexOf('\\') + 1)
          .slice(nt, nt.length)}`
      )
    },
    sender: function () {
      return (
        this.notification.data.firstName ||
        this.notification.data.name ||
        ((this.notification.data || {}).user || {}).firstName +
          ' ' +
          ((this.notification.data || {}).user || {}).lastName
      )
    }
  },
  mounted() {
    if (this.notification.data) {
      this.parseIntoLuxon(this.notification.createdAt)
    }
  },
  methods: {
    startCase,
    applyAction({ action, role }) {
      this.$emit('notification-list-item-action', {
        type: 'notification',
        userId: this.notification.data.user
          ? this.notification.data.user.id
          : '',
        id: this.notification.id,
        action: this.notification.__attrs.action,
        role: this.notification.data.role
          ? this.notification.data.role.name
          : null
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.notifications-dropdown__thread {
  border-bottom: 1px solid #EAEAEA;
  padding: 0.5em;
  height: 90px;
  display: flex;
  background-color: #FAFAFA;
  transition: all 0.35s ease;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: #FAFAFA !important;
  }

  &.read {
    background-color: white;

    .new-notifications {
      display: none;
    }
  }

  .new-notifications {
    height: 8px;
    width: 8px;
    background-color: #367AE2;
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 50%;
  }

  .thread-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thread-content {
    flex: 4;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 8px;

    .sender {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 7px;
    }

    .info {
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: #2C4B5C;
    }

    .description {
      font-size: 10px;
      color: rgba(black, 30%);
      padding-top: 0.5em;
    }

    .time {
      font-size: 12px;
      color: #888;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
