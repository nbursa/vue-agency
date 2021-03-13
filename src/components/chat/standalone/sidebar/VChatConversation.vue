<template lang="pug">
  .sidebar__messages-item(:class="{'is-unread': messageRead}")
    .sidebar__messages-image-wrapp
      .sidebar__messages-image
        div(v-if="conversation.avatar" :style="avatarStyle")
        div(v-else)
          svgicon(name="global/avatar-default" :original="true")     
    .sidebar__messages-text-wrapp
      span.name {{conversation.name}}
      span.quick-info {{conversation.roleName}}
      .sidebar__message-text-info
        span {{conversation.message}}
    .sidebar__time {{humanDate}} {{humanTime}}
</template>

<script>
import CListDropdown from '@/components/shared/dropdown/CListDropdown'
import { DateTime } from 'luxon'
export default {
  components: {
    CListDropdown
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  computed: {
    conversationDate: function () {
      return DateTime.fromSQL(this.conversation.createdAt)
    },
    humanDate: function () {
      return this.conversationDate.toFormat('dd/LL/yyyy')
    },
    humanTime: function () {
      return this.conversationDate.toFormat('HH:mm')
    },
    messageRead: function () {
      return this.conversation.readAt === null ? true : false
    },
    avatarStyle: function () {
      return {
        backgroundImage: `url(${this.conversation.avatar})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: '100%'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.sidebar {
  &__messages-item {
    display: flex;
    position: relative;
    cursor: pointer;
    border-bottom: 2px solid #F2F2F2;
    overflow: hidden;

    &:before {
      position: absolute;
      left: 0;
      top: -1px;
      bottom: -1px;
      width: 100%;
      content: '';
      background: linear-gradient(90deg, #FFFFFF 0%, #EFF3F4 100%);
      transition: all 0.35s ease;
      opacity: 0;
    }

    &.is-unread {
      .sidebar__messages-image {
        border: 2px solid #367AE2;
        padding: 2px;

        .svg-icon {
          width: 38px;
          height: 38px;
        }
      }

      &:before {
        opacity: 1;
      }
    }

    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }

  &__messages-image-wrapp {
    flex: 0 0 85px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    // z-index 1
    user-select: none;
  }

  &__messages-image {
    width: 46px;
    height: 46px;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 50%;
    }

    .svg-icon {
      width: 46px;
      height: 46px;
    }
  }

  &__messages-text-wrapp {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 20px 20px 14px 0;
    position: relative;

    span {
      display: block;

      &.name {
        color: #2C4B5C;
        font-size: 17px;
        line-height: 21px;
        font-weight: 700;
        padding-right: 10px;
      }

      &.quick-info {
        font-size: 14px;
        line-height: 19px;
        color: rgba(44, 75, 92, 0.8);
        margin-bottom: 5px;
      }
    }
  }

  &__message-text-info {
    span {
      color: #2C4B5C;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__time {
    position: absolute;
    top: 14px;
    right: 20px;
    color: #363636;
    opacity: 0.5;
    font-size: 11px;
    z-index: 1;
  }

  &__dropdown-wrapp {
    flex: 0 0 18px;
    display: flex;
    align-items: flex-end;
    padding: 0 12px 12px 0;

    .c-list-dropdown {
      width: 18px;
      padding: 6px 0;

      &__content {
        z-index: 2;
      }
    }
  }
}
</style>
