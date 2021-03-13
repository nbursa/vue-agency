<template lang="pug">

div(class="is-clearfix")
  .chat-message(:class="alignClass")
    .chat-message__content-image
      div(v-if="me && profileImage")
        img(:src="profileImage")
      div(v-else)
        div(v-if="avatar" :style="avatarStyle")
        div(v-else)
          svgicon(name="global/avatar-default" :original="true" width="30px" height="30px")
    .chat-message__content-body
      <strong>{{ chatPerson }}</strong>: {{ item.message }}

</template>
<script>
export default {
  inject: ['person'],
  props: {
    item: {
      type: Object,
      required: true
    },
    profileImage: {
      type: [String],
      default: null
      // required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    chatPerson() {
      return this.me ? 'Me' : this.person.name.split(' ')[0]
    },
    me() {
      return this.item.sent
    },
    alignClass() {
      return {
        'chat-message--is-me': this.me,
        'chat-message--not-me': !this.me
      }
    },
    avatar() {
      return this.person.avatar
    },
    avatarStyle() {
      return {
        backgroundImage: `url(${this.avatar})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0',
        top: '0'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.chat-message {
  display: flex;
  margin: 6px 0;
  padding-right: 37px;

  &__content-image {
    flex: 0 0 30px;
    border-radius: 50%;
    overflow: hidden;
    height: 30px;
    margin-right: 8px;
    position: relative;
  }

  &__content-body {
    border: 1px solid rgb(152, 191, 213, 0.4);
    padding: 8px 10.4px;
    border-radius: 0 6px 6px 6px;
    color: #2C2C2C;
    font-size: 14px;
    line-height: 17px;
    word-break: break-word;

    p {
      line-height: 22px;
    }
  }

  &--is-me {
    padding-right: 0;
    padding-left: 37px;
    flex-direction: row-reverse;

    .chat-message__content-body {
      background-color: #EFF5F9;
      border: none;
      border-radius: 6px 0 6px 6px;
    }

    .chat-message__content-image {
      margin: 0 0 0 8px;
    }
  }
}
</style>
