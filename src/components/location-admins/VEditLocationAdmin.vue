
<template lang="pug">
div
  header
    .sidebar-control
      v-new-location-admin-link
    .sidebar-control-tab
      v-delete-button(
        @delete:item="onDelete"
        text="admin"
      )
  .clear
  .sidebar-overflow(v-if="formItem")
    v-location-admin-form(
      :forbidEmailEdit="true"
      :locationAdmin="formItem"
      action="save"
      :errorsFromBack="getErrors"
      :updateFn="updateItemField"
      @form:save="saveForm(formItem)"
      @form:cancel="onCancel"
    )
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VLocationAdminForm from './VLocationAdminForm'
import AdminUser from '@/models/AdminUser'
import VDeleteButton from '@/components/shared/sidebar-form/VDeleteButton'
import VNewLocationAdminLink from './VNewLocationAdmin.vue'
import { formMessages } from '@/mixins/formMessages.mixin'

export default {
  components: {
    VLocationAdminForm,
    VDeleteButton,
    VNewLocationAdminLink
  },
  mixins: [formMessages],
  data() {
    return {
      showJobPicker: false,
      successMessage: this.$t('client_locations_sidebar.toast_success_admin'),
      errorMessage: this.$t('client_locations_sidebar.toast_error_admin')
    }
  },
  computed: {
    ...mapState('locationAdmins/table', ['selected']),
    ...mapState('locationAdmins/edit', [
      'formItem',
      'itemSaved',
      'isFetching',
      'itemDeleted'
    ]),
    ...mapGetters('locationAdmins/edit', ['getErrors'])
  },
  watch: {
    selected: function(item) {
      if (item && item.length > 0 && item[0].id) {
        this.getLocationAdmin(item[0].id)
      }
    }
  },
  beforeDestroy() {
    this.clearErrors()
  },
  created() {
    this.setFormItem(Object.assign({}, new AdminUser()))
    if (this.selected[0]) {
      this.getLocationAdmin(this.selected[0].id)
    }
  },
  methods: {
    ...mapActions('locationAdmins', [
      'getLocationAdmin',
      'updateLocationAdmin',
      'deleteLocationAdmin'
    ]),
    ...mapActions('locationAdmins/edit', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem',
      'setChildItems'
    ]),
    saveForm() {
      this.updateLocationAdmin(this.formItem)
      this.clearErrors()
    },
    onCancel() {
      this.$emit('sidebar:navigate', 'cancel')
    },
    onDelete() {
      this.deleteLocationAdmin(this.formItem.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar'
</style>
