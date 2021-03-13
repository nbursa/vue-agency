
<template lang="pug">
div
  header
    .sidebar-control
      //- v-new-location-admin-link
  .clear
  .sidebar-overflow(v-if="formItem")
    v-location-admin-form(
      :locationAdmin="formItem"
      action="save"
      :errorsFromBack="getErrors"
      :updateFn="updateItemField"
      @form:save="saveForm(formItem)"
      @form:cancel="onCancel"
    )
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import VLocationAdminForm from "./VLocationAdminForm"
import AdminUser from "@/models/AdminUser"
import VNewLocationAdminLink from "./VNewLocationAdmin.vue"

import { errorDefaults, successDefaults } from "@/config/notifications"

export default {
  components: {
    VLocationAdminForm,
    VNewLocationAdminLink
  },
  computed: {
    ...mapState("locationAdmins/table", ["selected"]),
    ...mapState("locationAdmins/create", [
      "formItem",
      "itemSaved",
      "isFetching"
    ]),
    ...mapGetters("locationAdmins/create", ["getErrors"])
  },
  watch: {
    getErrors: function(errors) {
      if (Object.keys(errors).length !== 0) {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: "The given data was invalid."
        })
        this.$notify(e)
      }
    },
    itemSaved: function(value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: "foo",
          text: "Invite Sent"
        })
        this.$notify(e)
        this.$emit("sidebar:navigate", "cancel")
      }
    }
  },
  created() {
    this.setFormItem(Object.assign({}, new AdminUser()))
  },
  beforeDestroy() {
    this.clearErrors()
  },
  methods: {
    ...mapActions("locationAdmins", ["saveLocationAdmin"]),
    ...mapActions("locationAdmins/create", [
      "updateItemField",
      "clearErrors",
      "setFormItem",
      "addChildItem",
      "removeChildItem"
    ]),
    onCancel() {
      this.$emit("sidebar:navigate", "cancel")
    },
    saveForm(formItem) {
      this.saveLocationAdmin(formItem)
    }
  }
}
</script>
<style lang="stylus" scoped>

.loading {
  position: absolute;
  margin: 0.2em;
  color: #777;
}
</style>
