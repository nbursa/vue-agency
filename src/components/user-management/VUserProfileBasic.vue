<template lang="pug">
.column.is-10
  form(@submit.prevent='submit', @keydown.enter.prevent='')
    .card-content
      base-image-uploader(
        uploadUrl='/profile/avatar',
        :on-progress='onProgress',
        :preview-image='profile.image'
      )
      .input-label-group
        input.is-expandable.is-disabled(
          disabled,
          name='role',
          type='text',
          placeholder='',
          v-model.trim='(form.role || {}).label'
        )
        label.control-label {{ $t("profile.user_type") }}
      .input-label-group
        input.is-expandable.is-disabled(
          disabled,
          name='email',
          type='text',
          placeholder='',
          v-model.trim='form.email'
        )
        label.control-label {{ $t("profile.email") }}
      .input-label-group
        input.is-expandable(
          name='firstName',
          type='text',
          placeholder='',
          v-model.trim='form.firstName',
          @keydown='formErrors.clear("firstName")',
          required
        )
        label.control-label {{ $t("profile.first_name") }}
        span.req-attribute {{ $t("profile.required") }}
        p.help.is-danger {{ formErrors.get("firstName") }}
      .input-label-group
        input.is-expandable(
          name='lastName',
          type='text',
          placeholder='',
          v-model.trim='form.lastName',
          @keydown='formErrors.clear("lastName")',
          required
        )
        label.control-label {{ $t("profile.last_name") }}
        span.req-attribute {{ $t("profile.required") }}
        p.help.is-danger {{ formErrors.get("lastName") }}
      .input-label-group
        input.is-expandable(
          name='mobilePhone',
          type='text',
          placeholder='',
          v-model.trim='form.mobilePhone',
          @focus='tooltipOptions.show = false',
          @keydown='formErrors.clear("mobilePhone")',
          :class='{ "is-danger": !form.isPhoneVerified }'
        )
        label.control-label {{ $t("profile.mobile") }}
        .verify-box
          .verify-box__message
            p.help.is-danger(v-if='!form.isPhoneVerified') {{ $t("profile.phone_notverified") }}
            p.help.is-success(v-else) {{ $t("profile.phone_verified") }}
          .verify-box__action
            p.is-clearfix
              a.is-pulled-right(
                v-tooltip.top-end='tooltipOptions',
                open='true',
                @click='toggleVerifyField = true; \; $emit("verify-number", form.mobilePhone); \; tooltipOptions.show = false',
                v-if='!form.isPhoneVerified'
              ) {{ $t("profile.verify_number") }}
      .input-label-group(v-if='toggleVerifyField')
        input.is-expandable(
          v-model='verifySms',
          type='text',
          placeholder='',
          required
        )
        label.control-label.control-label--long-text {{ $t("profile.enter_code") }}
        .verify-box
          .verify-box__message
            p {{ $t("profile.code_recieve") }}
              a(@click='$emit("verify-number", form.mobilePhone)') {{ $t("profile.resend") }}
          .verify-box__action
            button.button.is-small.is-info(
              @click.prevent='$emit("send-sms-code", verifySms)'
            ) {{ $t("profile.done") }}
      base-switcher(
        value='',
        @click.native='notifyShouldBeVerified',
        :disabled='!form.isPhoneVerified',
        :label='$t("profile.two_factor")',
        :modelValue='form.twoWayEnabled',
        @change='$emit("two-way-switch", $event)'
      )
      .candidate-notifications(v-if='notificationMethods')
        label.sidebar-form_label Notifications
        .profile-checkbox(
          v-for='(value, name) in notificationMethods',
          :key='name'
        )
          label.profile-checkbox_label(:for='name') {{ $t(`candidates_sidebar.notifications.${name}`) }}
          input.profile-checkbox_input(
            :id='name',
            type='checkbox',
            v-model='notificationMethods[name]',
            @input='notificationMethodSetter(!value, name)'
          )
</template>
<script>
import { BasicForm } from '@/models/BasicForm'
import { errorDefaults, successDefaults } from '@/config/notifications'

export default {
  name: 'UserProfileBasic',
  props: {
    profile: {
      type: Object,
      required: true
    },
    formErrors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toggleVerifyField: false,
      verifySms: '',
      tooltipOptions: {
        content: '',
        show: false,
        trigger: 'manual'
      },
      notificationMethodsInternal: {
        push: false,
        email: false,
        sms: false
      }
    }
  },
  computed: {
    form: function () {
      return this.profile ? new BasicForm(this.profile) : null
    },
    notificationMethods: {
      get() {
        return this.form.notificationMethods
          ? {
              push: this.form.notificationMethods.includes('push'),
              email: this.form.notificationMethods.includes('email'),
              sms: this.form.notificationMethods.includes('sms')
            }
          : this.notificationMethodsInternal
      }
    }
  },
  methods: {
    notifyShouldBeVerified() {
      if (!this.form.isPhoneVerified) {
        this.tooltipOptions.content = this.$t('profile.must_verify')
        this.tooltipOptions.show = true
      }
    },
    onProgress(progress) {
      console.log(`${this.$options.name}: ${progress}`)
    },
    submit() {
      delete this.form.image
      this.$parent.$emit('child-save', {
        context: this.$options.name,
        data: this.form
      })
    },
    notificationMethodSetter(value, name) {
      this.notificationMethods[name] = value
      let result = []
      for (const [key, val] of Object.entries(this.notificationMethods)) {
        val ? result.push(key) : null
      }
      this.form.notificationMethods = result
    }
  }
}
</script>
<style lang="stylus" scoped>
$font-size = 18px;
$active-font-size = 13px;
$active-top = 0.4rem;
$label-color = #838D98;
$active-color = $focus-color = $label-color;

@import '~@/assets/styles/global/label-input';
@import '~@/assets/styles/global/expandable-input';

.verify-box {
  margin-top: 0.2em;
  display: flex;
  align-items: center;

  &__message {
    .help {
      margin-top: 0;
    }

    p a {
      margin-left: 0.6em;
      font-weight: bold;
    }
  }

  &__action {
    margin-left: auto;
  }
}

.card-content {
  max-width: 370px;

  .input-label-group {
    margin-bottom: 15px;

    .control-label {
      line-height: 15px;
    }

    .control-label--long-text {
      font-size: 13px;
      top: 23px;
    }
  }
}

.candidate-notifications {
  padding-top: 10px;

  .sidebar-form_label {
    font-size: 13px;
    color: #838d98;
  }

  .profile-checkbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #DFE6EB;
    border-radius: 3px;
    padding: 10px 20px;
    margin-bottom: 10px;

    &_label {
      font-size: 18px;
      line-height: 24px;
      width: 100%;
    }

    &_input {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
