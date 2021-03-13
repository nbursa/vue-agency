
<template lang="pug">
div
  .sidebar-overflow
    form.sidebar-form

      v-sidebar-input(
        v-model.trim="firstName"
        type="text"
        :label="$t('internal_users_sidebar.form_first_name')"
      )

      v-sidebar-input(
        v-model.trim="lastName"
        type="text"
        :label="$t('internal_users_sidebar.form_last_name')"
      )

      v-sidebar-input(
        v-model.trim="email"
        type="email"
        :label="$t('internal_users_sidebar.form_email')"
        name="email"
        v-validate="'required|email'"
        :error="errorsFromBack.hasOwnProperty('email') ? errorsFromBack.email[0] : errors.first('email')"
        :disabled="(status === 0) ? false : true"
      )

      //- v-sidebar-input(
      //-   v-model="phone"
      //-   type="text"
      //-   :label="$t('internal_users_sidebar.form_phone')"
      //- )
      base-phone-input(
        :watchForRerender="user.id"
        :error="errorsFromBack.hasOwnProperty('mobilePhone') ? errorsFromBack.mobilePhone[0] : ''"
        :label="$t('candidates_sidebar.mobile_phone')"
        v-model="mobilePhone"
        :optionsBind="{'no-example': true}"
      )

      .sidebar-form_field(style="overflow:visible;")
        v-role-selector(
          :label="$t('internal_users_sidebar.form_role')"
          v-model="selectedRoles"
          :isMultiple="hasMultiAgencies"
          :isClearable="false"
        )

      .sidebar-form_field(style="overflow:visible;")
        v-agency-selector(
          :label="$t('internal_users_sidebar.form_agency')"
          v-model="selectedAgencies"
          :isClearable="false"
        )
        
      //- v-sidebar-checkbox(
      //-   :label="$t('client_locations_sidebar.enable_notification_push')"
      //-   v-model="methodPush"
      //- )
      //- v-sidebar-checkbox(
      //-   :label="$t('client_locations_sidebar.enable_notification_email')"
      //-   v-model="methodEmail"
      //- )
      //- v-sidebar-checkbox(
      //-   :label="$t('client_locations_sidebar.enable_notification_sms')"
      //-   v-model="methodSms"
      //- )


      .sidebar-footer
        span(v-if="$i18n.locale === 'en'") {{ $t(`global.${action}`) }} {{ $t("internal_users_sidebar.button_user") }}?
        span(v-else) {{ $t("internal_users_sidebar.button_user") }} {{ $t(`global.${action}`) }}?
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onCancel") {{ $t("global.cancel") }}
          button.button.is-tmpst-info(@click.prevent="onSave" type="submit") {{ $t(`global.${action}`) | uppercase  }}
</template>

<script>
import { mapActions, mapState } from "vuex"

import VSidebarInput from "@/components/shared/sidebar-form/VSidebarInput"
import VAgencySelector from "@/components/shared/agency-selector/VAgencySelector"
import VRoleSelector from "@/components/shared/role-selector/VRoleSelector"
import VSidebarCheckbox from "@/components/shared/sidebar-form/VSidebarCheckbox"


export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    VSidebarInput,
    VAgencySelector,
    VRoleSelector,
    VSidebarCheckbox
  },
  filters: {
    uppercase: function(v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  },
  props: {
    user: {
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
    }
  },
  data() {
    return {
      hasMultiAgencies: false
    }
  },
  computed: {
    firstName: {
      get() {
        return this.user.firstName
      },
      set(value) {
        this.updateFn({
          name: "firstName",
          value: value
        })
      }
    },
    lastName: {
      get() {
        return this.user.lastName
      },
      set(value) {
        this.updateFn({
          name: "lastName",
          value: value
        })
      }
    },
    email: {
      get() {
        return this.user.email
      },
      set(value) {
        this.updateFn({
          name: "email",
          value: value
        })
      }
    },
    status: {
      get() {
        return this.user.userStatus
      }
    },
    selectedRoles: {
      get() {
        return this.user.role
      },
      set(value) {
        if (!value || !value.id) {
          return
        }
        this.updateFn({
          name: "role",
          value: value
        })

        this.updateFn({
          name: "roleId",
          value: value.id
        })
      }
    },
    selectedAgencies: {
      get() {
        return this.user.agencies.filter(
          agency =>
            this.user.agencies.filter(a => a.id == agency.parentId).length == 0
        )
      },
      set(value) {
        this.updateFn({
          name: "agencies",
          value: value
        })
      }
    },
    mobilePhone: {
      get() {
        return this.user.mobilePhone
      },
      set(value) {
        this.updateFn({
          name: "mobilePhone",
          value: value
        })
      }
    },
    methodPush: {
      get() {
        return this.user.notificationMethods ? this.user.notificationMethods.includes("push") : false
      }, 
      set(val) {
        this.updateNotificationMethod("push", val)
      }
    },
    methodEmail: {
      get() {
        return this.user.notificationMethods ? this.user.notificationMethods.includes("email") : false
      },
      set(val) {
        this.updateNotificationMethod("email", val)
      }
    },
    methodSms: {
      get() {
        return this.user.notificationMethods ? this.user.notificationMethods.includes("sms") : false
      },
      set(val) {
        this.updateNotificationMethod("sms", val)
      }
    }
  },
  methods: {
    updateNotificationMethod(method, val) {
      if(val) {
        let newMethodList = this.user.notificationMethods ? [...this.user.notificationMethods, method] : [method]
        this.updateFn({
          name: "notificationMethods",
          value: newMethodList
        })
      } else {
        let newMethodList = [...this.user.notificationMethods].pop(method)
        this.updateFn({
          name: "notificationMethods",
          value: newMethodList
        })
      }
    },
    onSave() {
      this.$validator
        .validateAll({
          email: this.email
        })
        .then(valid => {
          if (!valid) {
            // validation failed
            console.log("validation failed (vee-validate)")
            return
          } else {
            // all good
            this.$emit("form:save")
          }
        })
      // this.$emit("form:save")
    },
    onCancel() {
      this.$emit("form:cancel")
    },
    getSelected() {
      if (this.role && this.role.id) {
        return this.role.id
      } else {
        return 0
      }
    }
  }
}
</script>



