<template lang="pug">
div
  div(v-if="roles")
    form.sidebar-form

      v-sidebar-input(
        v-model.trim="firstName"
        type="text"
        :label="$t('client_locations_sidebar.first_name')"
      )

      v-sidebar-input(
        v-model.trim="lastName"
        type="text"
        :label="$t('client_locations_sidebar.last_name')"
      )

      v-sidebar-input(
        :disabled="forbidEmailEdit"
        v-model.trim="email"
        type="email"
        :label="$t('client_locations_sidebar.email')"
        name="email"
        v-validate="'required|email'"
        :error="errorsFromBack.hasOwnProperty('email') ? errorsFromBack.email[0] : errors.first('email')"
      )

      v-sidebar-input(
        v-model="pin"
        name="pin"
        type="text"
        :label="$t('client_locations_sidebar.pin')"
        :error="errorsFromBack.hasOwnProperty('pin') ? errorsFromBack.pin[0] : ''"
      )

      v-sidebar-input(
        v-model="mobile"
        name="mobile"
        type="text"
        :label="$t('client_locations_sidebar.mobile')"
        :error="errorsFromBack.hasOwnProperty('mobilePhone') ? errorsFromBack.mobilePhone[0] : ''"
      )


      .sidebar-form_field(style="overflow:visible;")
        v-client-selector(
          v-model="clients"
          :label="$t('client_locations_sidebar.client')"
          :error="errorsFromBack.hasOwnProperty('clients') ? errorsFromBack.clients[0] : ''"
        )

      .sidebar-form_field(style="overflow:visible;")
        v-role-selector(
          v-model="role"
          roleGetter="getClientAdminRoles"
          :isMultiple="false"
          :label="$t('client_locations_sidebar.role')"
          :error="errorsFromBack.hasOwnProperty('role') ? errorsFromBack.clients[0] : ''"
        )


      .sidebar-footer
        span(v-if="$i18n.locale === 'en'") {{ $t(`client_locations_sidebar.${action}`) }} {{ $t("client_locations_sidebar.user") }}?
        span(v-else)  {{ $t("client_locations_sidebar.user") }} {{ $t(`client_locations_sidebar.${action}`) }}?
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onCancel") {{ $t("client_locations_sidebar.button_cancel") }}
          base-button(@click="onSave" customClass="is-small") {{ $t(`client_locations_sidebar.${action}`) | uppercase  }}
</template>

<script>
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import VAgencySelector from '@/components/shared/agency-selector/VAgencySelector'
import VClientSelector from '@/components/shared/client-selector/VClientSelector'
import VRoleSelector from '@/components/shared/role-selector/VRoleSelector'
import VSidebarCheckbox from '@/components/shared/sidebar-form/VSidebarCheckbox'

import { mapActions, mapState } from 'vuex'

export default {
  components: {
    VSidebarInput,
    VAgencySelector,
    VClientSelector,
    VRoleSelector,
    VSidebarCheckbox
  },
  $_veeValidate: {
    validator: 'new'
  },
  filters: {
    uppercase: function (v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  },
  props: {
    locationAdmin: {
      required: true,
      type: Object
    },
    updateFn: {
      type: Function,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    errorsFromBack: {
      type: Object,
      required: true
    },
    forbidEmailEdit: {
      type: Boolean,
      required: false,
      default: () => {
        false
      }
    }
  },
  computed: {
    ...mapState('roles', ['roles']),
    firstName: {
      get() {
        return this.locationAdmin.firstName
      },
      set(value) {
        this.updateFn({
          name: 'firstName',
          value: value
        })
      }
    },
    lastName: {
      get() {
        return this.locationAdmin.lastName
      },
      set(value) {
        this.updateFn({
          name: 'lastName',
          value: value
        })
      }
    },
    email: {
      get() {
        return this.locationAdmin.email
      },
      set(value) {
        this.updateFn({
          name: 'email',
          value: value
        })
      }
    },
    pin: {
      get() {
        return this.locationAdmin.pin
      },
      set(value) {
        this.updateFn({
          name: 'pin',
          value: value
        })
      }
    },
    mobile: {
      get() {
        return this.locationAdmin.mobilePhone
      },
      set(value) {
        this.updateFn({
          name: 'mobilePhone',
          value: value
        })
      }
    },
    clients: {
      get() {
        return this.locationAdmin.clients
      },

      set(value) {
        this.updateFn({
          name: 'clients',
          value: value.map((client) => {
            return {
              id: client.id
            }
          })
        })
      }
    },
    role: {
      get() {
        return this.locationAdmin.role
      },
      set(value) {
        this.updateFn({
          name: 'role_id',
          value: value.id
        })
      }
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    ...mapActions('roles', ['getRoles']),
    onSave() {
      this.$validator
        .validateAll({
          email: this.email
        })
        .then((valid) => {
          if (!valid) {
            // validation failed
            console.log('validation failed (vee-validate)')
            return
          } else {
            // all good
            this.$emit('form:save')
          }
        })
      // this.$emit("form:save")
    },
    onCancel() {
      this.$emit('form:cancel')
    }
  }
}
</script>

<style lang="stylus" scoped>

.sidebar-form {
  overflow: visible;
}
</style>
