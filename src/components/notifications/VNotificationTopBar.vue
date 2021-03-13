<template lang="pug">
  .notifications-bar.is-clearfix
    .notifications-bar__inner
      .notifications-bar__category
        li
          button(@click="$emit('notification-bar:filter', 'all')") {{ $t("notifications.all") }}
            span ({{ stats.all }})
        li
          button(@click="$emit('notification-bar:filter', 'new')") {{ $t("notifications.new") }}
            span ({{ stats.new }})

      //- .notifications-bar__settings
      //-   CListDropdown
      //-     template(slot="trigger")
      //-       .notifications-bar__dropdown-trigger(@click="open = !open")
      //-         span Notifications settings
      //-         font-awesome-icon(:icon="arrows")
      //-     template(slot="list-content")
      //-       ul.notifications-bar__dropdown-content
      //-         li(v-for="n in [1,2,3,4]")
      //-           button Lorem ipsum
</template>

<script>
import CListDropdown from "@/components/shared/dropdown/CListDropdown"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faArrowDown from "@fortawesome/fontawesome-free-solid/faAngleDown"
import faArrowUp from "@fortawesome/fontawesome-free-solid/faAngleUp"

export default {
  components: {
    CListDropdown,
    FontAwesomeIcon
  },
  props: {
    stats: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    arrows() {
      return this.open ? faArrowUp : faArrowDown
    }
  }
}
</script>

<style lang="stylus" scoped>
.notifications-bar {
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
  padding: 15px 0;
  margin-bottom: 14px;
  background-color: #F2F5F7;
  position: fixed;
  right: 0;
  top: 70px;
  width: calc(100% - 65px);
  z-index: 1;

  &__inner {
    max-width: 800px;
    margin: 0 auto;
  }

  &__category {
    list-style-type: none;
    float: left;

    li {
      margin-right: 14px;
      float: left;

      &:last-child {
        margin-right: 0;
      }

      button {
        background: transparent;
        border: 0;
        font-size: 12px;
        color: rgba(32, 33, 35, 0.4);
        font-weight: 600;
        padding: 0;
        cursor: pointer;
        transition: color 0.25s ease;

        span {
          color: #202123;
        }

        &:hover {
          color: #202123;
        }
      }
    }
  }

  &__settings {
    float: right;
  }

  &__dropdown-trigger {
    span {
      color: #202123;
      font-size: 12px;
      font-weight: 600;
    }

    svg {
      width: 13px;
      height: 13px;
      color: rgba(black, 0.28);
      margin-left: 8px;
    }
  }

  &__dropdown-content {
    li {
      button {
        color: black;
        padding: 6px 4px;
        border-radius: 5px;
        border: 0;
        font-size: 16px;
        width: 100%;
        text-align: left;
        transition: background-color 0.25s ease;
        margin: 1px 0;
        cursor: pointer;

        // user-select: none;
        &:hover, &:focus {
          background-color: #C8DAE5;
          outline: none;
        }
      }
    }
  }
}
</style>
