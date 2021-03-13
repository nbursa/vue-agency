<template lang="pug">
transition(name="modal")
  .modal-background
    .modal-container(v-click-outside="closeModal")
      a.close(@click='closeModal')
        svgicon.icon(
          name='global/close'
          :width="'29'"
          :height="'29'"
          :fill='false'
        )
      h4.subtitle(slot="info")
        | {{$t("authorization.resetsubtitle")}}
      form.reset-form(@submit.prevent="submitNewPasswordRequest")
        //- p.help.is-danger(slot="errors" v-html="serverErrors.join('')")
        .login__wrapper
          //- .card-content
          //-   router-link(
          //-     :to="{name: 'login'}"
          //-     )
          //-     span.arrow-back
          //-       svgicon.icon.svg-down(name="login/arrow")
          .card-content
            .field
              label.label.info-label {{$t("authorization.resetlabel")}}
              |
              .control
                input.input.is-small.base-auth-input(
                  name="email"
                  type="text"
                  :placeholder="$t('authorization.email')"
                  v-model.trim="user.email"
                  v-validate="'required|email'"
                  required
                )
              |
              //- p.help.is-danger(v-show="errors.has('email')") {{ errors.first('email') }}
            
      div.modal-footer   
        button.button.is-tmpst-info.is-default-button(@click="submitNewPasswordRequest" :class="{'is-disabled': !user.email}")
            span {{$t("authorization.reset")}}
</template>
<script>
import VAuthBaseLayout from './VAuthBaseLayout.vue'
import { readServerMessages } from '@/mixins/validationMixin'
import ClickOutside from 'vue-click-outside'
import { mapActions } from 'vuex'
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  directives: {
    ClickOutside
  },
  components: { VAuthBaseLayout },
  mixins: [readServerMessages, subdomainsMixin],
  data() {
    return {
      user: {
        email: ''
      }
    }
  },
  methods: {
    ...mapActions('modals', ['closeModal']),
    submitNewPasswordRequest: function () {
      this.$parent.$parent.$emit(
        'user:new-password-request',
        Object.assign({}, this.user)
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';
@import "~@/assets/styles/global/partials/auth"

.reset-form {
  height: calc(100% - 112px);
  .input {
    &:invalid {
      background: $highlightGray !important;
    }
  }
}

.modal-container {
  width: 430px;
  height: 235px;
  margin: 0 auto;
  background-color: $white;
  margin-top: 19.3125rem;
  border-radius: 15px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.14);
  position: relative;
  font-weight: 700;
  display: flex;
  flex-direction: column;

  .close {
    height: 29px;
    width: 29px;
    border-radius: 50px;
    position: absolute;
    right: 15px;
    top: 15px;
    background-color: $primarySideNavIcon;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.17);

    .icon {
      color: $white;
    }
  }
}
.is-tmpst-info {
  height: 40px;
  min-width: 140px;
  border-radius: 3px;
  background: linear-gradient(225deg, $primary 0%, $secondary 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 22.5px;
  margin-top: 57.6px;
  border: 0;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
  }
}



.modal-footer {
  height: 56px;
  background-color: $lightGray;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top: 1px solid $primaryGray;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    &.is-default-button {
      margin: 10px 0px 10px 0px;
      max-width: 150px;
    }
  }
}

.subtitle {
  padding: 15px;
  text-align: center;
  font-weight: bold;
  background-color: $lightGray;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid $primaryGray;
  color: black;
  margin-bottom: 0px;
}

.card-content {
  padding: 1.25rem  4.0625rem;
}
</style>
