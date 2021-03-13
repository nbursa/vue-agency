<template lang="pug">
v-auth-base-layout(
  :title="false"
  )
  p.help.is-danger(slot="errors") {{ serverMessage }}
  form(@submit.prevent="")
    .login__wrapper
      .card-content
        router-link(
          :to="{name: 'login'}"
          )
          span.arrow-back
            svgicon.icon.svg-down(name="login/arrow")
        h4.subtitle {{$t("authorization.entercodetxt")}}
        .field
          .control(
            :class="{'is-loading': isLoading}"
            )
            input.input.is-medium(
              ref="myInput"
              autofocus
              :maxlength="MAX_CODE_LENGTH"
              @keyup="submitAfterFourth"
              v-validate="'numeric|max:6'"
              name="code",
              type="text",
              :placeholder="$t('authorization.entercode')"
              v-model.trim="code"
            )
            p.help.is-danger(v-show="errors.has('code')") {{ errors.first('code') }}
        .field
          .control
            label.checkbox(:disabled="rememberTokenPresent")
              base-checkbox(v-model="rememberMe" :disabled="rememberTokenPresent" )
            |  {{$t("authorization.rememberme")}}
        .code-message
          h4.subtitle
            span {{$t("authorization.didentget")}}
            a {{$t("authorization.resend")}}
</template>

<script>
import { mapState, mapActions } from "vuex"
import VAuthBaseLayout from "./VAuthBaseLayout.vue"
import { readServerMessages } from "@/mixins/validationMixin"
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

const MAX_CODE_LENGTH = 6

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: { VAuthBaseLayout },
  mixins: [readServerMessages, subdomainsMixin],
  data() {
    return {
      rememberMe: false,
      rememberTokenPresent: false,
      code: "",
      MAX_CODE_LENGTH: MAX_CODE_LENGTH
    }
  },
  computed: {
    ...mapState(["isLoading"])
  },
  mounted() {
    this.hasRememberMeToken().then(yesNo => {
      this.rememberTokenPresent = yesNo
    })
  },
  methods: {
    ...mapActions("auth", ["hasRememberMeToken"]),
    sendTwoWayAuthCode() {
      this.$emit("user:send-2way-auth-code", {
        code: this.code,
        rememberMe: this.rememberMe
      })
    },
    submitAfterFourth() {
      if (this.code.length >= MAX_CODE_LENGTH) {
        this.sendTwoWayAuthCode()
      }
    }
  }
}
</script>
<style lang="stylus">
.arrow-back
  display inline-block
  padding-bottom 1rem
.code-message
  margin-top 80px
  h4 a
    padding-left .5em
</style>
