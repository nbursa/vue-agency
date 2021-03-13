<template lang="pug">
  transition(name="notificaton-card")
    .notification-card(
        @click="cardAction"
        :class="item.colorScheme")
      .notification-card__close(@click.stop="$emit('remove-card', item.data.notification_id)")
      .notification-card__inner
        .notification-card__icon-wrapp
          svgicon.icon(:name="`notifications/${icon}`" :original="true")
        .notification-card__text-wrapp
          span.notification-card__title(v-if="item.notification.title") {{item.notification.title}}
          span.notification-card__name 
          span.notification-card__text(v-if="item.notification.body") {{item.notification.body}}
          span.notification-card__text.notification-card__text--date(
            v-if="conversationData"
          ) {{conversationData.created_at | nice-date}}
          span.notification-card__time(
            v-if="conversationData"
          ) {{conversationData.created_at | nice-time}}

</template>

<script>
import "@/compiled-icons/notifications"
import { kebabCase } from "lodash"

export default {
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {
    icon: function() {
      return kebabCase(
        this.itemType
          .substring(this.itemType.lastIndexOf("\\") + 1)
          .slice(this.itemType, -"Notification".length)
      )
    },
    itemType: function() {
      return this.item.data.notification_type
    },
    nType: function() {
      return this.itemType.split("\\").pop()
    },
    isConversation: function() {
      return this.nType === "ConversationMessageNotification"
    },
    conversationData: function() {
      if (this.isConversation) {
        return JSON.parse(this.item.data.data)
      }
    }
  },
  mounted: function() {
    console.log('CARD MOUNTED!!!')
    const card = this.$el
    card.addEventListener("transitionend", this.animationFinished, false)
  },
  methods: {
    animationFinished() {
      this.$emit("animation-done", this.item.data.notification_id)
    },
    cardAction() {
      const actionEvent = `${this.nType}Action`
      if (this.isConversation) {
        this.$emit("toaster-click", {
          actionEvent,
          payload: this.conversationData
        })
      } else {
        this.$emit("toaster-click", {
          actionEvent,
          payload: null
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>


.notification-card {
  border-radius: 3px;
  box-shadow: 0 2px 8px 0 rgba(black 0.2);
  background-color: white;
  padding: 8px;
  position: relative;
  margin-bottom: 22px;
  cursor: pointer;

  &.green-theme {
    .notification-card__inner:after {
      background-color: #CBF1C4;
    }
  }

  &.purple-theme {
    .notification-card__inner:after {
      background-color: #D6D9E1;
    }
  }

  &.orange-theme {
    .notification-card__inner:after {
      background-color: #FEB897;
    }
  }

  &.yellow-theme {
    .notification-card__inner:after {
      background-color: #F9DE99;
    }
  }

  &__inner {
    position: relative;
    color: #2C4B5C;
    display: flex;
    padding-right: 10px;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      height: 100%;
      width: 3px;
      border-border-radius: 3px;
    }

    span {
      display: block;
    }
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    height: 12px;
    width: 12px;
    cursor: pointer;
    z-index: 1;

    &:after, &:before {
      position: absolute;
      left: 5px;
      content: '';
      height: 12px;
      width: 2px;
      background-color: #2C4B5C;
      opacity: 0.3;
      transition: opacity 0.3s;
      will-change: opacity;
    }

    &:after {
      transform: rotate(45deg);
    }

    &:before {
      transform: rotate(-45deg);
    }

    &:hover {
      &:after, &:before {
        opacity: 0.45;
      }
    }
  }

  &__icon-wrapp {
    flex: 0 0 77px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 42px;
      height: 42px;
      margin-left: 7px;
    }
  }

  &__text-wrapp {
    flex: 1;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 15px 0;
  }

  &__title {
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 5px;
    line-height: 23px;
  }

  &__name {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 2px;
    padding-top: 3px;
    color: rgba(44, 75, 92, 0.8);
  }

  &__text {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 3px;

    &--date {
      color: rgba(44, 75, 92, 0.8);
    }
  }

  &__time {
    font-size: 11px;
    opacity: 0.6;
    color: #363636;
    text-align: right;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.notificaton-card-enter, .notificaton-card-leave-to {
  opacity: 0;
}

.notificaton-card-enter-active {
  transition: all 0.4s ease;
}

.notificaton-card-leave-to {
  transition: all 0.35s ease;
  transform: translateX(35px);
}
</style>
