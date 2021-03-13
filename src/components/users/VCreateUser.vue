
<template lang="pug">
div
  .loading(v-if="isFetching") {{ $t("global.loading") }}
  header
    .sidebar-control
      v-new-user-link
  .clear
  div(v-if="formItem")
    v-user-form(
      :user="formItem"
      action="save"
      :errorsFromBack="getErrors"
      :updateFn="updateItemField"
      @form:save="saveForm(formItem)"
      @form:cancel="onCancel"
    )
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import VUserForm from "./VUserForm"
import AdminUser from "@/models/AdminUser"
import VNewUserLink from "./VNewUserLink"
import { formMessages } from "@/mixins/formMessages.mixin"

export default {
  components: {
    VUserForm,
    VNewUserLink
  },
  mixins: [formMessages],
  data() {
    return {
      successMessage: this.$t("internal_users_sidebar.toast_invite"),
      errorMessage: this.$t("internal_users_sidebar.toast_error")
    }
  },
  computed: {
    ...mapState("users/table", ["selected"]),
    ...mapState("users/create", ["formItem", "itemSaved", "isFetching"]),
    ...mapGetters("users/create", ["getErrors"])
  },
  created() {
    this.setFormItem(Object.assign({}, new AdminUser()))
  },
  beforeDestroy() {
    this.clearErrors()
  },
  methods: {
    ...mapActions("users", ["saveUser"]),
    ...mapActions("users/create", [
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
      this.saveUser(formItem)
      this.clearErrors()
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
