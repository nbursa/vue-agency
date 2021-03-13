<template lang="pug">
v-auth-base-layout(
  :title="true"
  :titleText="$t('authorization.newpwd')"
  )
  p.help.is-danger(slot="errors" v-show="printError" v-html="printError") {{ serverMessage !== 'Unauthorized' ? serverMessage : '' }}
  p.help.is-info(slot="info" v-show="infoMessage" ) {{ infoMessage }}
  form(@submit.prevent="resetPassword")
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
          
        .field
          .control
            input.input.is-small.password(
              name="password_confirmation"
              type="password",
              :placeholder="$t('authorization.pwdverbose')",
              v-model.trim="user.password_confirmation"
              v-validate="'required'"
            )
        button.button.is-tmpst-info.is-default-button(:style="resetBtnStyle")
          span {{$t("authorization.reset")}}
          //- span
          //-   svgicon.icon(name="login/arrow")
</template>

<script>
import VAuthBaseLayout from "./VAuthBaseLayout.vue"
import { readServerMessages } from "@/mixins/validationMixin"
import { subdomainsMixin } from '@/mixins/subdomainsMixin'
import { mapState } from 'vuex'

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: { VAuthBaseLayout },
  mixins: [readServerMessages, subdomainsMixin],
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    infoMessage: {
      type: String,
      required: false,
      default: null
    },
  },
  data() {
    return {
      user: {
        password: "",
        password_confirmation: ""
      }
    }
  },
  computed: {
    ...mapState('subdomains', ['subdomainTheme']),
    printError() {
      return this.serverErrors.length ? this.serverErrors.join('') : this.serverMessage 
    },
    resetBtnStyle: function () {
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
  },
  methods: {
    resetPassword: function() {
      this.$emit("user:reset-password", Object.assign({}, { user: this.user }))
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/styles/global/partials/auth"

.card-content 
  width: 100%;
  max-width 290px
  padding 20px 0px 0px 0px


.info-wrapper 
  margin-top 20px
  font-size 0.75em
  color #a1a1a1
</style>
