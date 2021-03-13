<template lang="pug">
.notifications-wrapp(
  v-infinite-scroll="lazyLoad"
  infinite-scroll-disabled="busy"
  infinite-scroll-distance="500")
  v-notification-top-bar(
    :stats="{ all: getTotal, new: profile.unreadNotifications }"
    @notification-bar:filter="filterNotifications"
  )
  .notifications-wrapp__item-content(v-if="sortedByDate && sortedByDate.length !== 0")
    v-notification-item(
      v-for="notification in sortedByDate"
      :key="notification.id"
      :item="notification"
      @notification-list-item-action="applyAction"
      )
    .notification__loader(v-show="isLoading")
      atom-spinner(
        :animation-duration="1000"
        :size="60"
        :color="'#856ff9'"
      )
  .notifications-wrapp__list-notification(v-else)
    span {{msgNoTableData}}

</template>
<script>
import VNotificationItem from "./VNotificationItem"
import VNotificationTopBar from "./VNotificationTopBar"
import { mapState, mapActions, mapGetters } from "vuex"
import { notificationRedirects } from "@/config/notifications"
import { isEmpty } from "lodash"
import { AtomSpinner } from "epic-spinners"
import infiniteScroll from "vue-infinite-scroll"

import { nOtherOptions } from "@/config/notifications.js"

import { DateTime } from "luxon"

export default {
  components: { VNotificationItem, VNotificationTopBar, AtomSpinner },
  directives: { infiniteScroll },
  data() {
    return {
      msgNoTableData: this.$t("global.empty_table_msg"),
      nOtherOptions,
      isLoading: false,
      busy: false,
      activeFilter: 'all'
    }
  },
  computed: {
    ...mapState("userManagement", ["profile"]),
    ...mapState("notifications", ["list"]),
    ...mapGetters("notifications", [
      "getTotal",
      "mappedToAction",
      "mappedCount",
      "mappedCountUnread",
      "currentPage"
    ]),
    //manualy sort by date since mappedToAction getter would require complete rework
    sortedByDate() {
      let items = this.mappedToAction(this.nOtherOptions, "list")
      return (
        items !== undefined &&
        items.sort((i1, i2) => {
          return (
            DateTime.fromSQL(i2.data.createdAt) -
            DateTime.fromSQL(i1.data.createdAt)
          )
        }).filter(item => {
          return this.activeFilter === 'new' ? item.readAt === null : true
        })
      )
    }
  },
  methods: {
    ...mapActions("notifications", [
      "storeNotificationAction",
      "markNotificationAsRead",
      "getList",
      "setNotificationsPage"
    ]),
    fetchData(page) {
      const options = {
        page
      }
      this.isLoading = true
      this.getList(options).then(data => {
        if (!isEmpty(data.data)) {
          this.setNotificationsPage(data.meta.pagination.currentPage)
          this.busy = false
        }
        this.isLoading = false
      })
    },
    lazyLoad() {
      this.busy = true
      this.fetchData(this.currentPage + 1)
    },
    filterNotifications(filter) {
      this.activeFilter = filter
    },
    applyAction({ action, role, id, userId }) {
      /*
       * Attach role to config object, using config route as resolver
       * if it is of a type function
       */
      let resolvedRoute
      const { route, generateRoute, params } = notificationRedirects[action]
      if (typeof generateRoute === "function") {
        if (params.hasOwnProperty("userId")) {
          resolvedRoute = generateRoute(userId)
        }
        if (params.hasOwnProperty("role")) {
          resolvedRoute = generateRoute(role)
        }
        console.log(resolvedRoute)
        // Reassign route to config redirect object
        notificationRedirects[action] = Object.assign(
          notificationRedirects[action],
          { route: resolvedRoute }
        )
      }
      this.storeNotificationAction(
        Object.assign({}, notificationRedirects[action])
      )
      this.markNotificationAsRead(id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.notifications-wrapp {
  .notification__loader {
    width: 70px;
    margin: 0 auto;
    text-align: center;
  }

  &__list-notification {
    margin: 74px 15px;
    display: flex;
    height: 80px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
  }

  &__item-content {
    max-width: 800px;
    margin: 70px auto 0;
  }
}
</style>
