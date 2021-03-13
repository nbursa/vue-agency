<template lang="pug">
  v-navbar(
    @mark-as-read="markAsRead(...arguments)"
    v-if="user"
    :user="user"
    :profile-image="profileImage"
    :agencyName="agencyName"
    :agencyLogo="agencyLogo"

    @navbar:logout="userLogout();"
    @clear-push-notifications="clearThenRefetch"
    @notification-list-item-action="applyAction"

    :otherNotifications="sortedByDate",
    :otherNotificationsCount="profile.unreadNotifications",
    :pushNotifications="pushNotifications"
    :unreadAllCount="mappedCount(nAll)",

    :conversations="conversationsByDate"
    )
</template>

<script>
import VNavbar from './navbar/VNavbar.vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { getFirebaseToken, invalidateToken } from '@/firebase/'
import { find } from 'lodash'
import { nOtherOptions } from '@/config/notifications.js'
import { notificationRedirects } from '@/config/notifications'

import { DateTime } from 'luxon'

export default {
  components: {
    VNavbar
  },
  data() {
    return {
      /*
       * Add all types that you wish to include
       * They will be shown, with action string attribute attached

       * Count will reflect sum across all types specified here
       */
      nOtherOptions,
      nMessageOptions: {
        ConversationMessage: 'openMessage'
      }
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('userManagement', ['profile']),
    ...mapState('notifications', ['list', 'pushNotifications']),
    ...mapState('messages', ['openedConversations']),
    ...mapState('agencies', ['agencies']),
    ...mapGetters('messages', ['conversationsByDate']),
    ...mapGetters('notifications', [
      'mappedToAction',
      'mappedCount',
      'mappedCountUnread',
      'parsePushNotificationDataById'
    ]),
    nAll: function () {
      return Object.assign({}, this.nOtherOptions, this.nMessageOptions)
    },
    profileImage: function () {
      if (this.profile) {
        return this.profile.image
      }
      return null
    },
    agencyName: function () {
      if (this.agencies.length && this.user.role === 'client-admin') {
        return this.agencies[0].name
      }
      return null
    },
    agencyLogo: function () {
      if (this.agencies.length && this.user.role === 'client-admin') {
        return this.agencies[0].logo
      }
      return null
    },
    //manualy sort by date since mappedToAction getter would require cosmplete rework
    sortedByDate() {
      let items = this.mappedToAction(this.nOtherOptions, 'list')
      return (
        (items !== undefined &&
          items
            .sort((i1, i2) => {
              return (
                DateTime.fromSQL(i1.data.createdAt) -
                DateTime.fromSQL(i2.data.createdAt)
              )
            })
            .sort((item) => {
              return item.readAt !== null ? 1 : -1
            })) ||
        []
      )
    }
  },
  watch: {
    pushNotifications(newValue) {
      if (newValue.length) {
        const last = newValue[newValue.length - 1]

        // test parsing by id (this will be later used for count sum, not here)
        let nData, popupOpened

        if (last.data.data) {
          nData = JSON.parse(last.data.data)
          popupOpened = find(this.openedConversations, {
            id: nData.id || null
          })
        }

        const nType = last.data.notification_type.split('\\').pop()
        let type =
          nType === 'ConversationMessageNotification' ? 'message' : 'other'
        // Check if popup is opened for conversation that got here
        // via push
        let t

        if (type === 'message') {
          if (popupOpened) {
            this.addFromPush({
              msg: (t = this.parsePushNotificationDataById(nData.id).pop()),
              id: nData.id
            })
            // Remove all push messages from stack where id === t.oldId
            // because this conversation is opened
            this.removePushNotificationById(t.oldId)
          }
          this.openConversation(nData)
        }

        // Get last notification and show toaster
        const { title, body } = last.notification
      }
    }
  },
  mounted() {
    /*
     * get user profile
     */
    this.getProfile()
    /*
     * initiate Intercom chat
     */
    if (process.env.NODE_ENV !== 'development') {
      this.initiateIntercom(this.profile)
    }

    /*
     * get notifications list
     */
    this.getList()
    /*
     * get conversations
     */
    this.getConversations()
    /*
     * get firebase token
     */
    getFirebaseToken()

    /*
     * Get agency info if client-admin
     */
    this.getAgencies()
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('userManagement', ['getProfile']),
    ...mapActions('agencies', ['getAgencies']),
    ...mapActions('notifications', [
      'getList',
      'clearPushNotificationStack',
      'removePushNotificationById',
      'markNotificationAsRead',
      'storeNotificationAction'
    ]),
    ...mapActions('messages', [
      'getConversations',
      'addFromPush',
      'pushConversationToStack',
      'flickerConversation'
    ]),

    markAsRead() {
      const [id, type] = arguments
      if (type === 'notification') {
        this.markNotificationAsRead(id).then(() => {
          // Refetch unread notifications from profile
          this.getProfile()
        })
      }
    },

    userLogout() {
      const vm = this
      invalidateToken()
        .then(() => {
          vm.logout()
          vm.$router.replace('/login')
        })
        .catch((e) => {
          console.log('userlogouterror', e)
        })
        .then(() => {
          location.reload()
        })
    },
    openConversation(conversation) {
      this.pushConversationToStack(conversation).catch((msg) => {
        this.flickerConversation(conversation.id)
      })
      this.getConversations()
      // this.clearPushNotificationStack("message")
    },
    applyAction({ action, role, id, userId, type }) {
      /*
       * Attach role to config object, using config route as resolver
       * if it is of a type function
       */
      let resolvedRoute
      const { route, generateRoute, params } = notificationRedirects[action]
      if (typeof generateRoute === 'function') {
        if (params.hasOwnProperty('userId')) {
          resolvedRoute = generateRoute(userId)
        }
        if (params.hasOwnProperty('role')) {
          resolvedRoute = generateRoute(role)
        }
        // Reassign route to config redirect object
        notificationRedirects[action] = Object.assign(
          notificationRedirects[action],
          { route: resolvedRoute }
        )
      }
      this.storeNotificationAction(
        Object.assign({}, notificationRedirects[action])
      )
      this.markAsRead(id, type)
    },
    /*
     * Refetch notifications list then clear push notifications stack
     */
    clearThenRefetch(e) {
      // TODO check count on specific notification type
      // because as it is now it will refetch messages or notifications
      // if any of types 'message' or 'other' is present in pushNotifications stack
      const pushNotificationsCount = this.pushNotifications.length
      const type = e.type
      // Refetch here again, to obtain new notifications
      // but only if pushNotificationsCount > 0
      if (pushNotificationsCount > 0) {
        if (type === 'message') {
          this.getConversations().then(() => {
            // this.clearPushNotificationStack(type)
          })
        } else if (type === 'other') {
          this.getList().then(() => {
            // this.clearPushNotificationStack(type)
          })
        }
        this.clearPushNotificationStack('message')
        this.clearPushNotificationStack('other')
      }
    },

    initiateIntercom(user) {
      this.$intercom.boot({
        user_id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        created_at: (new Date().getTime() / 1000).toFixed(),
        alignment: 'left',
        horizontal_padding: 2,
        vertical_padding: 20
      })
    }
  }
}
</script>

<style lang="stylus">
.intercom-launcher-frame
  left 2px !important
.intercom-lightweight-app
  z-index 9999 !important
</style>
