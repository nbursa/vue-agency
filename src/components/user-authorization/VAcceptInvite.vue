<template lang="pug">
v-auth-base-layout(
  :title="true"
  :titleText="$t('authorization.choosenew')"
  )  
  p.help.is-danger(slot="errors" v-show="printError" v-html="printError") {{ serverMessage !== 'Unauthorized' ? serverMessage : '' }}
  p.help.is-info(slot="info" v-show="infoMessage" ) {{ infoMessage }}
  form(@submit.prevent="")
    .login__wrapper
      .card-content
        .control
          input.input.is-small.email(
            name="password"
            type="password"
            :placeholder="$t('authorization.newpwd')"
            v-model.trim="user.password"
            v-validate="'required'"
          )
          
        //-   p.help.is-danger(v-show="errors.has('password')") {{ errors.first('password') }}
        //- |
        .field
          .control
            input.input.is-small.password(
              name="password_confirmation"
              type="password",
              :placeholder="$t('authorization.pwdverbose')",
              v-model.trim="user.password_confirmation"
              v-validate="'required'"
            )
          
        //-   p.help.is-danger(v-show="errors.has('password_confirmation')") {{ errors.first('password_confirmation')}}
        //- |
        .button-wrapper
          button.button.is-tmpst-info(@click.prevent="resetPassword", :style="profileBtnStyle")
            span {{$t("authorization.accept")}}
      
            half-circle-spinner.spinner(
              v-if="isLoading"
              class="spinner"
              :animation-duration="1800"
              :size="25"
              color="#ffffff"
            )
            span(v-else)
              svgicon.icon(name="login/arrow")
          
          base-button.is-cancel(@click="resendInvite" :class="{'is-disabled': disableResend}" :style="resendBtnStyle") 
            span(:style="resendSpanStyle") {{$t("authorization.resend")}}
        .info-wrapper 
          span 
            | *If you are unable to set a password, your activation link has expired. Please click 
            span(style="font-weight: bold") RESEND 
            | to receive a new activation link.

</template>

<script>
import VAuthBaseLayout from './VAuthBaseLayout.vue'
import VResetPassword from './VResetPassword'
import { HalfCircleSpinner } from 'epic-spinners'
import { readServerMessages } from '@/mixins/validationMixin'
import { mapState } from 'vuex'
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

export default {
  components: { VAuthBaseLayout, VResetPassword, HalfCircleSpinner },
  extends: VResetPassword,
  mixins: [subdomainsMixin],
  props: {
    infoMessage: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      disableResend: false
    }
  },
  computed: {
    ...mapState('subdomains', ['subdomainTheme']),
    printError() {
      return this.serverErrors.length
        ? this.serverErrors.join('')
        : this.serverMessage
    },
    profileBtnStyle: function () {
      return {
        background:
          this.subdomainTheme && this.subdomainTheme.accentColor
            ? this.subdomainTheme.accentColor
            : '',
        color:
          this.subdomainTheme && this.subdomainTheme.buttonHoverColor
            ? this.subdomainTheme.buttonHoverColor
            : ''
      }
    },
    resendBtnStyle: function () {
      return {
        background:
          this.subdomainTheme && this.subdomainTheme.accentColor
            ? this.subdomainTheme.accentColor
            : '',
        'border-color':
          this.subdomainTheme && this.subdomainTheme.accentColor
            ? this.subdomainTheme.accentColor
            : ''
      }
    },
    resendSpanStyle: function () {
      return {
        color:
          this.subdomainTheme && this.subdomainTheme.buttonHoverColor
            ? this.subdomainTheme.buttonHoverColor
            : ''
      }
    }
  },
  methods: {
    resetPassword: function () {
      this.$emit(
        'user:accept-invite',
        Object.assign({}, { user: this.user, accept: true })
      )
    },
    resendInvite: function () {
      this.disableResend = true
      this.$emit(
        'user:resend-invite',
        Object.assign({}, { email: this.$route.query.email })
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/global/partials/auth"

.button-wrapper
  display flex
  justify-content space-between
  .main-button
    display flex
    justify-content space-between
    align-items center
  >.is-tmpst-info
    margin-top 0
    border-radius 8px
  >.is-cancel
    border-radius 8px

.card-content {
  max-width: 290px;
  padding: 20px 0px 0px 0px;
}

.info-wrapper
  margin-top 20px
  font-size 0.75em
  color #a1a1a1
</style>
