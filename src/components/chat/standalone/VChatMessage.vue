<template lang="pug">
    div
      .message-chat__content.is-clearfix(:class="isMe")
        .message-chat__content-inner
          .message-chat__content-image
            div(v-if="me")
              img(:src="profileImage")
            div(v-else)
              div(v-if="avatar" :style="avatarStyle")
              div(v-else)
              svgicon(name="global/avatar-default" :original="true" width="46px" height="46px")
          .message-chat__content-body
            p {{ item.message }}
            span.message-chat__content-time {{ humanTime }}
      
</template>
<script>
import DateUtils from '@/utils/dateUtils.js'

export default {
  inject: ['person'],
  props: {
    item: {
      type: Object,
      required: true
    },
    profileImage: {
      type: String,
      required: true
    }
  },
  computed: {
    me() {
      return this.item.sent
    },
    avatar() {
      return this.person.avatar
    },
    avatarStyle: function () {
      return {
        backgroundImage: `url(${this.avatar})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0',
        top: '0'
      }
    },
    isMe() {
      return {
        'message-chat__content--out': this.item.sent
      }
    },
    humanTime: function () {
      return DateUtils.getTimeFromSQL(this.item.createdAt)
    }
  }
}
</script>

<style lang="stylus" scoped>
.message-chat {
  &__content {
    padding: 5px 56px 5px 0;

    &--out {
      padding: 5px 0 5px 56px;

      .message-chat__content-inner {
        flex-direction: row-reverse;
      }

      .message-chat__content-image {
        margin: 0 0 0 10px;
      }

      .message-chat__content-body {
        background-color: #E4EFF5;
        border-color: transparent;
        overflow-wrap: anywhere;
      }
    }
  }

  &__content-inner {
    display: flex;
  }

  &__content-image {
    flex: 0 0 46px;
    border-radius: 50%;
    overflow: hidden;
    height: 46px;
    margin-right: 10px;
    position: relative;
  }

  &__content-body {
    border: 1px solid rgba(152, 191, 213, 0.6);
    border-radius: 12px;
    padding: 13px 15px 4px;

    p {
      line-height: 22px;
    }
  }

  &__content-time {
    display: block;
    text-align: right;
    font-size: 10px;
    color: #838D98;
    margin-top: 4px;
  }
}
</style>
