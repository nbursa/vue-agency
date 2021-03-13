<template lang="pug">
  .topnav
    //pre.debug {{ debugInfo | d }}
    .logo
      svgicon.icon(name="global/realday-logo-small" :width="'40'" :height="'48'"  :color="$colorMap.primary" :original="true")

    .back(v-if="hasBackButton")
      button(@click="goBack(hasBackButton)")
        font-awesome-icon.back__icon(:icon="backArrow")

    .page-name
      div
        | {{$t(caption)}}
        span.page-name__breadcrumb(v-for="breadcrumb in breadcrumbs")
          | |
          span {{ $t(`pagenames.${breadcrumb}`) }}

    .fill(v-if="!subdomain && !agencyLogo")
      .agency-welcome(v-if="agencyName")
        | {{$t("global.agency_welcome[0]")}} {{this.agencyName}} {{$t("global.agency_welcome[1]")}}

    .fill(v-if="agencyLogo && !subdomain")
      .company-logo
        img.company-logo__image(
          :src="agencyLogo"
        )

    .fill(v-if="subdomain")
      .company-logo
        img.company-logo__image(
          :src="subdomainLogo"
        )

    .notifications-label(
      @click.prevent="toggleNotificationsOfType('message', 'other')"
    )
      svgicon.icon(name="notifications/messages-header" :width="'20'" :height="'20'" :fill="true")
      .badge-shadow(v-if="messagesCountLocalAndPush") {{ messagesCountLocalAndPush }}

    v-notification-dropdown(
      v-if="notificationTypes['message']",
      notification-type="message"
      v-click-outside="() => { notificationTypes['message'] = false }"
      :items="conversations"
    )
      template(slot="title") {{$t("navbartop.messages")}}
      template(slot="see-more")
        a(@click="closeMessageDropdown();$router.push({name: 'messages'});") {{$t("navbartop.see_more")}}
      template(slot-scope="{item}")
        v-conversation(:conversation="item")

    .notifications-label(
      @click.prevent="toggleNotificationsOfType('other', 'message')"
    )
      svgicon.icon(name="global/notifications" :width="'20'" :height="'20'" :fill="false")
      .badge-shadow.badge-shadow--other(v-if="otherNotificationsCount") {{ otherNotificationsCount }}

    v-notification-dropdown(
      v-if="notificationTypes['other']",
      notification-type="other",
      v-click-outside="closeNotificationDropdown"
      :items="otherNotifications"
    )
      template(slot="title") {{$t("navbartop.notifications")}}
      template(slot="see-more")
        a(@click="closeNotificationDropdown();$router.push({name: 'notifications'});") {{$t("navbartop.see_more")}}
      template(slot-scope="{item}")
        v-notification(
          :notification="item"
          @notification-list-item-action="$emit('notification-list-item-action', $event);closeNotificationDropdown();"
        )
    .name
      base-item-panel(:width="150")
        div(slot="head")
          .circle.profile
            img(:src="profileImage")
        div(slot="content")
          router-link.link(:to="{name:'profile'}") {{$t("navbartop.profile")}}
          a.link.logout(
            @click="$emit('navbar:logout')"
          ) {{$t("navbartop.logout")}}
    .rotate-screen-info
      .rotate-screen-info__inner
        svgicon(name="side-nav/rotate-ipad" :original="true" width="225px" height="190px")
        p Bitte drehen Sie Ihr Gerät.
        p Please rotate your device.


</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faArrowUp from "@fortawesome/fontawesome-free-solid/faAngleUp"

import "@/compiled-icons/global"
import "@/compiled-icons/notifications"
import "@/compiled-icons/side-nav"
import { mapGetters, mapState, mapActions } from "vuex"
import VNotificationDropdown from "./VNotificationDropdown"
import VConversation from "./VConversation"
import VNotification from "./VNotification"
import { titleUpdate } from "@/mixins/tabTitleUpdater"
import ClickOutside from "vue-click-outside"

export default {
  components: {
    VNotificationDropdown,
    VConversation,
    VNotification,
    FontAwesomeIcon
  },
  directives: {
    ClickOutside
  },
  mixins: [titleUpdate],
  props: {
    conversations: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    profileImage: {
      type: String,
      default: null
    },
    messageNotifications: {
      type: Array,
      default: () => []
    },
    otherNotifications: {
      type: Array,
      default: () => []
    },
    otherNotificationsCount: {
      type: Number,
      default: 0,
      required: false
    },
    pushNotifications: {
      type: Array,
      required: true
    },
    unreadAllCount: {
      type: Number,
      required: true
    },
    agencyName: {
      type: String,
      required: false,
      default: ""
    },
    agencyLogo: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      notificationTypes: {
        message: false,
        other: false
      },
      backArrow: faArrowUp
    }
  },
  computed: {
    ...mapState("subdomains", ["subdomainProfile"]),
    ...mapGetters("subdomains", ["getSubdomainProfile"]),
    ...mapGetters("notifications", ["getSumByTypeInPushStack"]),
    ...mapGetters("messages", ["conversationMessagesCount"]),
    messagesCountLocalAndPush: function() {
      // Find out which are of type ConversationMessage in push stack
      // add them to local count
      return (
        this.getSumByTypeInPushStack("ConversationMessage") +
        this.conversationMessagesCount
      )
    },
    breadcrumbs: function() {
      return this.$route.meta.breadcrumbs || []
    },
    hasBackButton: function() {
      return this.$route.meta.backButton
    },
    debugInfo: function() {
      return Object.entries(this.user).filter(e => {
        return e[0] !== "permissions"
      })
    },
    subdomain: function() {
      if (this.subdomainProfile && this.subdomainProfile.logo) {
        return true
      }
      return false
    },
    subdomainLogo: function() {
      if (this.subdomainProfile.logo) {
        return this.subdomainProfile.logo
      }
      return null
    }
  },
  mounted() {
    if (window.location.host) {
      let subdomain = window.location.host.split(".")[0]
      // let subdomain = "chord"
      if (subdomain && subdomain !== 'localhost:8080' && subdomain !== 'portaldv' && subdomain !== 'portal') {
        this.checkSubdomain(subdomain)
      }
    }
  },
  methods: {
    ...mapActions("subdomains", ["checkSubdomain"]),
    closeNotificationDropdown() {
      this.notificationTypes["other"] = false
    },
    closeMessageDropdown() {
      this.notificationTypes["message"] = false
    },
    // Emit for type = message OR type = other
    goBack(target) {
      this.$router.push({ name: target })
    },
    toggleNotificationsOfType: function(type, type1) {
      this.notificationTypes[type] = !this.notificationTypes[type]
      this.notificationTypes[type1] = false
      // Emit only on dropdown open
      if (this.notificationTypes[type] && type === 'message') {
        this.$emit(`clear-push-notifications`, {
          type,
          notifications_count: this[`${type}Notifications`].length
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>


.topnav {
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid $primaryGray;

  padding-right: 25px;
  z-index: 99999;
  position: relative;

  .back {
    &__icon {
      transform: rotate(-90deg);
      color: #959ead;
    }

    button {
      background: transparent;
      border: 0;
      height: 32px;
      width: 32px;
      padding: 0;
      border-radius: 3px;
      background-color: #FFFFFF;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;
      margin-left: 15px;

      svg {
        margin-right: 1px;
      }
    }
  }

  .logo {
    background-color: $primarySideNav;
    width: 65px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid $primaryGray;
    .icon {
      color: white;
    }
  }

  .fill {
    flex-grow: 1;
    .agency-welcome {
      text-align: right;
      padding-right: 20px;
      font-size: 1rem;
      line-height: 24px;
      opacity: 0.7;
      pointer-events: none;
      user-select: none;
      color: #202123;
    }
  }

  .company-logo {
    height 100%
    max-height 65px
    margin-right 20px
    // mix-blend-mode: difference;
    display flex
    justify-content space-around
    // background-color invert
    // filter: invert(100%);
    &__image {
      height 50px
      // filter: invert(100%);
    }
  }

  .page-name {
    font-size: 1.125rem;
    line-height: 24px;
    color: $fontDark;

    &__breadcrumb {
      margin-left: 5px;

      span {
        margin-left: 5px;
        opacity: 0.5;
      }
    }

    div {
      margin-left: 15px;
    }
  }

  .name {
    align-self: center;
    align-items: center;
    color: $textBlue;
    display: flex;
    justify-content: center;
  }

  .circle {
    align-self: center;
    height: 20px;
    width: 20px;
    background-color: #BDBDBD;
    border-radius: 50%;
    margin-right: 14px;
  }

  .profile {
    width: 35px;
    height: 35px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .link {
    color: black;
    display: block;
    padding: 5px 10px;
    border-radius: 6px;
    background-color: white;

    &:hover {
      background-color: $secondary;
      color: white;
      transition: background-color 250ms linear;
    }

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  .notifications-label, .location {
    color: $iconGray;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
  }
}

.badge-shadow {
  position: absolute;
  left: 13px;
  top: -7px;
  background-color: $primary;
  color: white;
  border-radius: 16px;
  text-align: center;
  font-size: 10px;
  height: 20px;
  border: 2px solid white;
  display: flex;
  padding: 0 4px;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  font-weight: 600;

  &--other {
    left: 7px;
  }
}

.notifications-dropdown__footer {
  a {
    font-size: 12px;
    display: block;
    padding: 5px 0 6px;
    color: $primary;
    transition: color 0.3s ease;

    &:hover {
      color: #0e40cc;
    }
  }
}
</style>
