<template lang="pug">
transition(name='modal')
  .modal-background
    .modal-container
      .content
        .realday-logo(v-if="!subdomain")
          svgicon.icon(
            name="global/realday-logo-small"
            :fill="true"
            :color="$colorMap.primary"
          )
        img.subdomain-logo(
          v-else
          :src="subdomainProfile.logo"
        )
        .content__loader(v-if='isFetching')
          half-circle-spinner(
            :animation-duration='1500',
            :size='50',
            :color='"#1a394a"'
          )
        .content__items(v-if='!isFetching')
          .text(v-if="!subdomain")
            h1 Realday
            p {{ $t('authorization.inviteModal.text') }}
          .text(v-else)
            h1 {{ subdomainProfile.name.charAt(0).toUpperCase() + subdomainProfile.name.slice(1) }}
            p {{ $t('authorization.inviteModal.text').replace('Realday', subdomainProfile.name.charAt(0).toUpperCase() + subdomainProfile.name.slice(1)) }}
      .link-appstore
        a(v-if="subdomainProfile && subdomainProfile.name === 'constructiv'", href="https://apps.apple.com/app/constructiv/id1539305205", :style="subdomainLinkStyle" ) {{ $t('authorization.inviteModal.appstore') }}
        a(v-else href="https://apps.apple.com/app/realday/id1407732448") {{ $t('authorization.inviteModal.appstore') }}
      .link-playstore
        a(v-if="subdomainProfile && subdomainProfile.name === 'constructiv'", href="https://play.google.com/store/apps/details?id=com.constructiv.app", :style="subdomainLinkStyle" ) {{ $t('authorization.inviteModal.playstore') }}
        a(v-else href="https://play.google.com/store/apps/details?id=gmbh.tempest") {{ $t('authorization.inviteModal.playstore') }}
      
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { HalfCircleSpinner } from 'epic-spinners'
import ClickOutside from 'vue-click-outside'
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

export default {
  components: {
    HalfCircleSpinner
  },
  mixins: [subdomainsMixin],
  props: {
    namespace: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      isFetching: true
    }
  },
  computed: {
    ...mapState({
      showModal(state) {
        return state[this.namespace].toggle
      }
    }),
    ...mapState('subdomains', ['subdomainProfile', 'subdomainTheme']),
    subdomainLinkStyle: function () {
      return {
        color:
          this.subdomainTheme && this.subdomainTheme.accentColor
            ? this.subdomainTheme.accentColor
            : ''
      }
    },
  },
  mounted() {
    this.isFetching = false
  },
  methods: {
    ...mapActions('auth/modal', ['closeModal']),
    close() {
      this.closeModal()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';
@import '~@/assets/styles/global/variables';

.modal-container {
  width: 300px;
  height: auto;
  margin: 0 auto;
  background-color: $white;
  margin-top: 12%;
  border-radius: 9px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.14);
  position: relative;
  display: flex;
  font-weight: 700;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .close {
    height: 29px;
    width: 29px;
    border-radius: 50px;
    position: absolute;
    right: -15px;
    top: -15px;
    background-color: $white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.17);
    z-index: 12;

    .icon {
      color: #333;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 350px;
    text-align: center;
    padding: 20px 40px 0;
    border-bottom: 1px solid #ebebeb;
    &:not(:last-child) {
      margin-bottom: 0;
    }
    .realday-logo {
      width: 80px;
      height: 80px;
      margin: 40px;
      border-radius: 5px;
      .icon {
        width: 75px;
        height: 75px;
      }
    }
    .subdomain-logo {
      margin-bottom 50px
    }
    &__loader {
      top: 0;
      left: 0;
      z-index: 11;
      border-radius: 9px;
      pointer-events: none;
    }
    &__items {
      .text {
        font-size: 13px;
        font-weight: normal;
        margin-bottom: 20px;
        > h1 {
          font-weight: bold;
        }
      }
    }
  }

  .link-appstore,
  .link-playstore {
    width: 100%;
    padding: 10px;
    text-align: center;
    > a {
      color: #856ff9;
    }
    &:hover > a {
      color: darken(#856ff9, 10%);
    }
  }
  .link-appstore {
    border-bottom: 1px solid #ebebeb;
  }
}
</style>