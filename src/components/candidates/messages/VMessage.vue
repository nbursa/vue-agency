<template lang="pug">
div.is-clearfix
  // span.message-date {{ humanDate }}
  .message-body(:class="msgType")
    p.message-body__message {{ message.message }}
    span.message-body__message-time.is-pulled-right {{ humanTime }}
</template>
<script>
import { DateTime } from "luxon"
export default {
  props: {
    index: {
      type: null,
      required: false,
      default: ""
    },
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    isSender: function() {
      return this.message.sent === true
    },
    messageDate: function() {
      return DateTime.fromSQL(this.message.createdAt)
    },
    humanDate: function() {
      return this.messageDate.toFormat("dd/LL/yyyy")
    },
    humanTime: function() {
      return this.messageDate.toFormat("HH:mm")
    },
    msgType: function() {
      return {
        "is-sender": this.isSender,
        "is-recipient": !this.isSender,
        "is-pulled-right": this.isSender
      }
    }
  }
}
</script>
<style>
* {
  -webkit-text-size-adjust: none;
}
</style>
<style lang="stylus" scoped>
.message-body
  max-width 279px
  border none
  border-radius 3px
  overflow hidden
  padding .6em 1.5em
  &__message
    color #2C2C2C
    font-size 14px
    white-space pre-wrap
  &__message-time
    color #9A9A9A
    font-size 8px
    font-weight bold
.is-recipient
  background-color white
.is-sender
  background-color rgba( #E4EFF5, 60% )

.is-sender, .is-recipient
  margin-top 12px

.is-recipient + .is-sender
.is-sender + .is-recipient
  margin-top 23px
</style>
