<template lang="pug">
.column.is-10
    form(@submit.prevent='submit', @keydown.enter.prevent='')
        .card-content
            .input-label-group
                input.is-expandable(
                    name='old_password',
                    type='password',
                    placeholder='',
                    v-model.trim='user_password.old_password',
                    @keydown='formErrors.clear("oldPassword")'
                    required
                )
                label.control-label {{ $t('profile.old_password') }}
                span.req-attribute {{ $t('profile.required') }}
                p.help.is-danger {{ formErrors.get("oldPassword") }}
            .input-label-group
                input.is-expandable(
                    name='password',
                    type='password',
                    placeholder='',
                    v-model.trim='user_password.password',
                    @keydown='formErrors.clear("password")'
                    required
                )
                label.control-label {{ $t('profile.new_password') }}
                span.req-attribute {{ $t('profile.required') }}
                p.help.is-danger {{ formErrors.get("password") }}    
            .input-label-group
                input.is-expandable(
                    name='password_confirmation',
                    type='password',
                    placeholder='',
                    v-model.trim='user_password.password_confirmation',
                    @keydown='formErrors.clear("password")',
                    required
                )
                label.control-label {{ $t('profile.password_confirmation') }}
                span.req-attribute {{ $t('profile.required') }}
</template>
<script>
import { BasicForm } from '@/models/BasicForm'
import { errorDefaults, successDefaults } from '@/config/notifications'
export default {
  name: 'UserProfileSecurity',
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
      user_password: {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    submit() {
      this.$parent.$emit('child-save', {
        context: this.$options.name,
        data: this.user_password
      })
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
