
<template lang="pug">
div
  header
    .sidebar-control
      v-new-user-link
    .sidebar-control-tab
      v-delete-button(
        :text="$t('internal_users_sidebar.button_user')"
        @delete:item="onDelete"
      )
  div
    v-user-form(
      :user="formItem"
      action="edit"
      :updateFn="updateItemField"
      :errorsFromBack="getErrors"
      @form:save="saveUser"
      @form:cancel="onCancel"
    )
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import VNewUserLink from "./VNewUserLink.vue"
import VUserForm from "./VUserForm"
import User from "@/models/AdminUser"
import VDeleteButton from "@/components/shared/sidebar-form/VDeleteButton"
import { formMessages } from "@/mixins/formMessages.mixin"

export default {
  components: {
    VNewUserLink,
    VUserForm,
    VDeleteButton
  },
  mixins: [formMessages],
  data() {
    return {
      successMessage: this.$t("internal_users_sidebar.toast_success"),
      errorMessage: this.$t("internal_users_sidebar.toast_error")
    }
  },
  computed: {
    ...mapState("users/table", ["selected"]),
    ...mapState("users/edit", [
      "formItem",
      "itemSaved",
      "isFetching",
      "itemDeleted"
    ]),
    ...mapGetters("users/edit", ["getErrors"])
  },
  watch: {
    selected: function(item) {
      if (item && item.length > 0 && item[0].id) {
        this.getUser(item[0].id)
      }
    }
  },
  created() {
    this.setFormItem(Object.assign({}, new User()))

    if (this.selected[0] && this.selected.length > 0) {
      this.getUser(this.selected[0].id)
    }
  },
  beforeDestroy() {
    this.clearErrors()
  },
  methods: {
    ...mapActions("users", ["getUser", "updateUser", "deleteUser"]),
    ...mapActions("users/edit", [
      "updateItemField",
      "clearErrors",
      "setFormItem",
      "addChildItem",
      "removeChildItem"
    ]),
    saveUser() {
      this.updateUser(this.formItem)
      this.clearErrors()
    },
    onCancel() {
      this.$emit("sidebar:navigate", "cancel")
    },
    onDelete() {
      this.deleteUser(this.formItem.id)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
</style>

