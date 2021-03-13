<template lang="pug">
  #app
    notifications(group="foo", position="bottom left")
    v-notifier(
      :stack="notifierStack"
      @animation-done="removeCard($event, 8000)"
      @remove-card="removeCard"
      @toaster-click="actionToaster"
    )
    .wrapper
      c-top-navbar.wrapper__header(v-if="showNavbars")
      .wrapper__sidebar(v-if="showNavbars")
        c-side-navbar
      .wrapper__content
        router-view
    c-chat-interface
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
//Enable with notification check method
// import { errorDefaults, successDefaults } from '@/config/notifications'
import CTopNavbar from '@/components/shared/top-navbar/CTopNavbar.vue'
import CSideNavbar from '@/components/shared/side-navbar/CSideNavbar.vue'
import CChatInterface from '@/components/chat/CChatInterface'
import { nOtherOptions } from '@/config/notifications.js'
import VNotifier from '@/components/notifications/VNotifier'
import { notificationRedirects } from '@/config/notifications'

export default {
  name: 'Default',
  components: {
    CTopNavbar,
    CSideNavbar,
    CChatInterface,
    VNotifier
  },
  computed: {
    ...mapState(['auth'], 'auth'),
    ...mapState('notifications', [
      'pushNotifications',
      'notifierStack',
      'list'
    ]),
    ...mapState('messages', ['conversations', 'openedConversations']),
    ...mapGetters('notifications', ['mappedToAction']),
    showNavbars: function () {
      return this.auth && this.auth.user
    }
  },
  watch: {
    pushNotifications(newValue) {
      if (newValue.length) {
        const last = newValue[newValue.length - 1]
        // test parsing by id (this will be later used for count sum, not here)
        // const nData = JSON.parse(last.data)
        const nType = last.data.notification_type.split('\\').pop()

        // Get last notification and show toaster
        // const { title, body } = last.notification
        // Add to notifier stack for later showing
        // console.log({ message: nData })
        // console.log(newValue)
        // console.log(last)
        // this.pushToNotifierStack(last)
        // NOTE: leave this so we can sporadically check that all notifications are shown
        // this.$notify(
        //   this.$merge(successDefaults, {
        //     group: "foo",
        //     title,
        //     text: body
        //   })
        // )

        let type =
          nType === 'ConversationMessageNotification' ? 'message' : 'other'
        if (type === 'other') {
          this.updateProfileNotificationCounter()
          this.pushToNotifierStack(last)
        }
      }
    }
  },
  methods: {
    ...mapActions('userManagement', ['updateProfileNotificationCounter']),
    ...mapActions('notifications', [
      'getList',
      'pushToNotifierStack',
      'removeFromNotifierStackById',
      'storeNotificationAction'
    ]),
    ...mapActions('messages', [
      'pushConversationToStack',
      'flickerConversation'
    ]),
    actionToaster(toasterEvent, card) {
      const { actionEvent, payload } = toasterEvent

      if (actionEvent === 'ConversationMessageNotificationAction') {
        // undefined || Object (type: conversation)

        this.openConversation(payload)
        this.removeCard(card)
      } else {
        const userData = card.data.data ? JSON.parse(card.data.data).user : null
        this.openNotification(card.data.notification_id, userData)
        this.removeCard(card)
      }
    },
    openNotification(id, userData) {
      let mappedToStack = this.mappedToAction(nOtherOptions, 'notifierStack')
      let foundOne = mappedToStack.find(
        (notification) => notification.data.notification_id === id
      )
      this.applyAction({
        userId: userData ? userData.id : null,
        action: foundOne.__attrs.action,
        role: 'temp'
      })
    },
    applyAction({ action, role, userId }) {
      /*
       * Attach role to config object, using config route as resolver
       * if it is of a type function
       */
      let resolvedRoute
      const { generateRoute, params } = notificationRedirects[action]
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
    },
    openConversation(conversation) {
      this.pushConversationToStack(conversation).catch(() => {
        this.flickerConversation(conversation.id)
      })
    },
    removeCard() {
      const [card, delay] = arguments
      if (delay) {
        setTimeout(() => {
          this.removeFromNotifierStackById(card.data.notification_id)
        }, delay)
      } else {
        this.removeFromNotifierStackById(card.data.notification_id)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/bulma/bulma-custom.scss';
</style>
<style lang="stylus">
@import '~@/assets/styles/global/global.styl'
@import '~@/assets/styles/global/partials/scrollbar'
</style>

<style lang="stylus" scoped>
span.notify
  display inline-block
  position fixed
  padding-left 1em
  color white
  font-size larger
  top 70px
  left 65px
  width 100%
  height 30px
  background rgba( darken(green, 20%), 30% )
</style>
