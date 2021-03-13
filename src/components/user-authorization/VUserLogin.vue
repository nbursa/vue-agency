<template lang="pug">
v-auth-base-layout
  p.help.is-danger(slot="errors" v-show="serverMessage" v-html="serverErrors[0] || serverMessage") {{ serverMessage !== 'Unauthorized' ? serverMessage : '' }}
  p.help.is-info(slot="info" v-show="infoMessage" ) {{ infoMessage }}
  form(@submit.prevent="login")
    .login__wrapper
      .card-content
          .control
            input.input.is-small.email(
              name="email"
              type="text"
              :placeholder="$t('authorization.email')"
              v-model.trim="user.email"
              v-validate="'required|email'"
              data-vv-validate-on="blur"
            )
            //- p.help.is-danger(v-show="errors.has('email')") {{ errors.first('email') }}
          .control.has-icons-right
            input.input.is-small.password(
              ref="password"
              name="password"
              type="password",
              :placeholder="$t('authorization.password')",
              v-model.trim="user.password"
              v-validate="'required'"
            )
            //- span.icon.is-small.is-right(
            //-   v-if="!passwordVisible"
            //-   @click="togglePassword"
            //-   style="z-index:9999;pointer-events:fill"
            //-   )
            //-   svgicon.icon(name="login/eye-password-show")
            //- span.icon.is-small.is-right(
            //-   v-else
            //-   @click="togglePassword"
            //-   style="z-index:9999;pointer-events:fill")
            //-   svgicon.icon(name="login/eye-password-hide")
            //- p.help.is-danger(v-show="errors.has('password')") {{ errors.first('password')}}
            p.has-forgot
              a(href="#"
                @click.prevent="toggleModal('resetpwd')"
                :style="profileHasForgotStyle"
                ) {{$t("authorization.forgotpwd")}}
          button.button.is-tmpst-info.is-default-button(
            :class="{'is-disabled': !user.password || !user.email}",
            :style="profileBtnStyle"
          )
            span {{$t("authorization.login")}}
            //- span
            //-   svgicon.icon(name="login/arrow")

  v-new-password-request(slot="modal" v-if="showModal")

</template>
<script>
import VAuthBaseLayout from './VAuthBaseLayout.vue'
import VNewPasswordRequest from './VNewPasswordRequest.vue'
import { readServerMessages } from '@/mixins/validationMixin'
import { mapGetters, mapActions, mapState } from 'vuex'
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: { VAuthBaseLayout, VNewPasswordRequest },
  mixins: [readServerMessages, subdomainsMixin],
  props: {
    infoMessage: {
      type: String,
      required: false,
      default: null
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      passwordVisible: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters('modals', ['showModal']),
    ...mapState('subdomains', ['subdomainProfile', 'subdomainTheme']),
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
    profileHasForgotStyle: function () {
      return {
        color: this.subdomainTheme && this.subdomainTheme.accentColor
          ? this.subdomainTheme.accentColor
          : ''
      }
    }
  },
  methods: {
    ...mapActions('modals', ['toggleModal']),
    togglePassword() {
      this.passwordVisible = !this.passwordVisible
      this.$refs.password.type = this.passwordVisible ? 'text' : 'password'
    },
    login: function () {
      const { email, password } = this.user

      this.$validator
        .validateAll({
          email,
          password
        })
        .then((valid) => {
          if (!valid) {
            // validation failed
            console.log('validation failed (vee-validate)')
            return
          } else {
            // all good
            this.$emit('user:login', Object.assign({}, this.user))
          }
        })
        .catch(() => {
          // non-validation related error ocurred!
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/styles/global/partials/auth"

.card-content {
  min-width: 290px;
  padding: 20px 0px 0px 0px;
  > .button:hover {
    color: var(--hover-color);
  }
}
</style>
