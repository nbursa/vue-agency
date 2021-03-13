<template lang="pug">
div
  notifications(group="auth", position="top center")
  transition(name="slide-fade", mode="out-in")
    component(
      :is="cmpLoaded",
      :isLoading="isLoading",
      :infoMessage="localMessages",
      @user:login="loginUser",
      @user:reset-password="resetPwd",
      @user:new-password-request="requestNewPwd",
      @user:send-2way-auth-code="send2WayAuthCode",
      @user:accept-invite="acceptInvite",
      @user:resend-invite="requestNewPwd"
    )
  v-invite-modal(
    v-if="showInviteModal && toggleModal"
    :namespace="'auth'"
    slot="modal"
  )


</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VUserLogin from './VUserLogin'
import VResetPassword from './VResetPassword'
import VTwoWayAuthCode from './VTwoWayAuthCode'
import VNewPasswordRequest from './VNewPasswordRequest'
import VAcceptInvite from './VAcceptInvite'
import VInviteModal from '@/components/shared/modals/invite/VInviteModal'

import { localforage } from '@/utils/localforage'

import { errorDefaults, successDefaults } from '@/config/notifications'
import { parseValidationMessages } from '@/utils/errorParser'
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

//temp that redirects to app download page
const tempId = 3
const redirectStore = 'http://tempestgo.com/'

export default {
  name: 'UserAuthInterface',
  components: {
    VUserLogin,
    VNewPasswordRequest,
    VResetPassword,
    VTwoWayAuthCode,
    VAcceptInvite,
    VInviteModal
  },
  mixins: [subdomainsMixin],
  data() {
    return {
      errors: [],
      localMessages: null,
      errMessage: null,
      cmpLoaded: null,
      isLoading: false,

      // This object will be populated only when on password reset route
      newPwdRequest: {
        token: null,
        email: null
      },

      // Used in Two way authentication method
      twoWayAuth: {
        hash: null
      }
    }
  },
  computed: {
    ...mapState(['serverErrors']),
    ...mapGetters('auth/modal', ['modalComponent', 'modalData']),
    showInviteModal() {
      return this.modalComponent === 'invite'
    }
  },

  watch: {
    $route(to, from) {
      this.routeBasedComponent(to)
    },
    localMessages: function (val) {
      console.log('watch trigger')
      if (val) {
        setTimeout(() => {
          this.localMessages = null
        }, 5000)
      }
    },
    serverErrors: function (val) {
      console.log('SERVER ERROR TIMEOUT', val)
      if (val.errors) {
        setTimeout(() => {
          this.clearValidationErrors()
        }, 5000)
      }
    }
  },
  mounted() {
    this.routeBasedComponent(this.$route)
  },

  methods: {
    ...mapActions('auth', [
      'login',
      'loginViaToken', // for two-way auth
      'resetPassword',
      'requestNewPassword',
      'sendTwoWayAuthCode',
      'storeRememberMeToken',
      'hasRememberMeToken'
    ]),
    ...mapActions(['clearValidationErrors']),
    ...mapActions('auth/modal', [
      'toggleModal',
      'closeModal',
      'setModalComponent'
    ]),
    routeBasedComponent(route) {
      const { meta, path, params, query } = route
      /* The two below will exist if we are on passowrd reset view */
      const { token } = params
      const { email } = query
      /* This one will be present only when TWO WAY AUTH view */
      const { hash } = params

      this.cmpLoaded = meta.loadComponent

      if (hash) {
        this.$set(this.twoWayAuth, 'hash', hash)
      }

      if (token && email) {
        // User hit the reset password route or accept invitation route
        // which both do share the same logic, just the template is slightly different
        // Save token && email fields for a password request that will occur on submit
        this.$set(this.newPwdRequest, 'token', token)
        this.$set(this.newPwdRequest, 'email', email)
      }
    },

    notify() {
      return false // DISABLE NOTIFICATIONS FOR NOW
      const text = this.errors.length
        ? parseValidationMessages(this.errors).join('')
        : this.errMessage
      const e = this.$merge(errorDefaults, {
        group: 'auth',
        text
      })
      this.$notify(e)
    },

    loginUser: async function (user) {
      // Check if two way token is present in local storage
      // If it is, then send it along with the rest of user data
      try {
        const twoWayToken = await this.hasRememberMeToken()
        if (twoWayToken) {
          user.twoWayToken = twoWayToken
          console.log(
            'two way remember token present... not asking for code... logging in...'
          )
        } else {
        }
      } catch (_) {}

      try {
        let token = await this.login(user)
        // Check if intended route exists, then send user over there
        // otherwise redirect to "/"
        localforage.getItem('redirect').then((intended) => {
          if (intended) {
            this.$router.push({ path: intended })
            // Forget redirect in applicaton storage
            localforage.setItem('redirect', null)
          } else {
            this.$router.push({ path: '/' })
          }
        })
      } catch (errData) {
        if (errData.hash) {
          const { hash } = errData
          // handle this early, because it is a sign of a TWO WAY auth
          console.log(`(${this.$options.name}): handling two way auth...`)
          // redirect user to Two way auth view
          this.$router.push({ name: 'two-way-auth', params: { hash } })
          return
        }
        if (errData.blacklisted) {
          this.errMessage = this.$t(errData.blacklisted)
          this.notify()
        }
        // this.handleError(errData)
      }
    },

    // Request link for new password (password reset)
    requestNewPwd: async function (user) {
      if (this.isLoading) return false

      try {
        this.isLoading = true

        const success = await this.requestNewPassword(user)
        const msg = this.$merge(successDefaults, {
          group: 'auth',
          text: success.message
        })
        // this.$notify(msg)
        this.localMessages = success.message

        this.isLoading = false
      } catch (errData) {
        this.handleError(errData)
        this.isLoading = false
      }
    },

    // Password resetting or accepting new invite
    resetPwd: async function ({ user, accept }) {
      if (this.isLoading) return false

      if (accept) {
        console.log('Joining via new invite...')
      }
      const newPwdRequest = this.$merge(this.newPwdRequest, user)
      try {
        this.isLoading = true
        const success = await this.resetPassword({ newPwdRequest, accept })
        const msg = this.$merge(successDefaults, {
          group: 'auth',
          text: success.message
        })
        // this.$notify(msg)
        this.localMessages = success.message
        // redirect user back to login, after successful password reset
        if (Number(this.$route.query.s) === tempId) {
          return this.setModalComponent({
            modalComponent: 'invite',
            modalData: []
          })
        } else {
          $logger.blue('Redirecting to login...')
          this.$router.replace({
            name: 'login'
          })
        }
      } catch (errData) {
        console.log(errData)
        // this.handleError(errData)
      } finally {
        this.isLoading = false
      }
      if (!this.errors && accept) {
        $logger.blue('Joining via new invite...')
      }
    },

    send2WayAuthCode: async function ({ code, rememberMe }) {
      const payload = {
        hash: this.twoWayAuth.hash,
        code,
        rememberMe
      }
      // Try to authenticate user by code
      try {
        const user = await this.sendTwoWayAuthCode(payload)
        const { token } = user
        try {
          const { twoWayToken } = user
          /* Keep two way token in localstorage for further logins */
          this.storeRememberMeToken(twoWayToken)
        } catch (err) {}
        // Login user via token
        const x = await this.loginViaToken(token)
        this.$router.replace({ path: '/jobs' }) // redirect to /jobs for now, but should be user profile
      } catch (errData) {
        this.handleError(errData)
      }
    },

    acceptInvite: async function (payload) {
      $logger.blue('User accepted invite to join in')
      this.resetPwd(payload)
    },

    resendInvite: function (payload) {
      console.log('RESEND', payload)
    },

    handleError(errData) {
      // errData can be whatever return Promise.resolve||reject gives
      // so be careful if you are checking for true or falsie values
      if (!errData) {
        console.log('Method handleError() called')
        return
      }
      this.errors = [...Object.values(errData.errors)]
      this.errMessage = errData.message
      this.notify()
    }
  }
}
</script>
<style lang="styl">
@import "~@/assets/styles/global/partials/slide-animation";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
