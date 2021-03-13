<template lang="pug">
.overflow
  v-base-side-tabs(
    @no-such-tab="tabNotFound" ref="pTabs"
    :sparseClick="true"
    )
    v-tab(:name="$t('profile.user_details')" :isLoading="isLoading")
      v-user-profile-content-box(
        :controls="basicProfileControls"
        @child-save="childSave"
        )
        //- p(slot="description")
        //-   | User details
        v-user-profile-basic(
          :profile="profile || {}"
          :formErrors="formErrors"
          @verify-number="verifyPhoneNumber"
          @send-sms-code="sendSMS"
          @two-way-switch="twoWaySwitch"
          )
    v-tab(:name="$t('profile.user_security')" :isLoading="isLoading")
      v-user-profile-content-box(
        :controls="basicProfileControls"
        @child-save="childSave"
        )
        v-user-profile-security(
          :profile="profile || {}"
          :formErrors="formErrors"
          )
</template>

<script>
import { camelCase } from 'lodash'
import { mapActions, mapState } from 'vuex'

// import VTabs from "@/components/on-boarding-setup/VTabs"
import VTab from '@/components/on-boarding-setup/VTab'
import VUserProfileContentBox from './VUserProfileContentBox'
import VBaseSideTabs from '@/components/shared/base-components/BaseSideTabs'

import VUserProfileBasic from '@/components/user-management/VUserProfileBasic'
import VUserProfileSettings from '@/components/user-management/VUserProfileSettings'
import VUserProfileSecurity from '@/components/user-management/VUserProfileSecurity'

import { FooterControl } from '@/factories'

import { errorDefaults, successDefaults } from '@/config/notifications'
import { formErrors } from '@/mixins/formErrorsMixin'

export default {
  name: 'UserProfileInterface',
  components: {
    VUserProfileBasic,
    VUserProfileSettings,
    VBaseSideTabs,
    VTab,
    VUserProfileContentBox,
    VUserProfileSecurity
  },
  mixins: [formErrors],
  data() {
    const sharedControls = {}
    return {
      /*
       * Define set of controls per each panel
       */
      basicProfileControls: {
        ...sharedControls,
        save: new FooterControl({
          text: 'profile.control_save',
          action: 'childSubmit',
          style: ['is-tmpst-info']
        })
        // logout: new FooterControl({
        //   text: "Logout",
        //   action: async () => {
        //     await this.logout()
        //     this.$router.replace({ name: "login" })
        //   },
        //   style: ["is-pulled-left--custom"]
        // })
      }
    }
  },

  computed: {
    ...mapState('userManagement', ['users', 'profile']),
    /* And error one from global vuex scope */
    ...mapState({
      mappedError: (state) => state.serverErrors,
      isLoading: (state) => state.isLoading
    })
  },
  created() {
    this.addIncludesFor('/profile', ['role'])
    this.getProfile()
  },
  methods: {
    ...mapActions('userManagement', [
      'getProfile',
      'updateProfile',
      'verifyNumber',
      'sendSMSCode',
      'setTwoWayAuthEnabled',
      'updatePassword'
    ]),
    ...mapActions('auth', ['logout']),

    childSave(payload) {
      /* TODO determine from payload, which child we are saving... */
      switch (payload.context) {
        case 'UserProfileBasic':
          this.profileBasicStep(payload.data)
          break
        case 'UserProfileSecurity':
          this.profileSecurityStep(payload)
          break
        case 'otherTabComponent':
          break

        default:
      }
    },

    tabNotFound() {
      this.$notify(
        this.$merge(successDefaults, {
          group: 'foo',
          text: 'No such tab found!'
        })
      )
    },

    verifyPhoneNumber(phoneNumber) {
      this.verifyNumber(phoneNumber)
    },

    sendSMS(smsCode) {
      this.sendSMSCode(smsCode)
    },

    twoWaySwitch(trueOrFalse) {
      // Send action for twoWayEnabled change in vuex
      this.setTwoWayAuthEnabled(trueOrFalse)
    },

    profileBasicStep(payload) {
      this.updateProfile(payload)
        .then(() => {
          this.$notify(
            this.$merge(successDefaults, {
              group: 'foo',
              text: 'Basic profile data updated.'
            })
          )
          // this.$refs.pTabs.next()
        })
        .catch(() => {
          this.formErrors.record(this.mappedError)
        })
    },

    profileSecurityStep(payload) {
      this.updatePassword(payload)
        .then(() => {
          this.$notify(
            this.$merge(successDefaults, {
              group: 'foo',
              text: 'Password profile data updated.'
            })
          )
        })
        .catch(() => {
          this.formErrors.record(this.mappedError)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.overflow
  overflow-y auto
  height 92vh
</style>
