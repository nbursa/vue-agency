
<template lang="pug">
div
  .sidebar-overflow
    v-client-form(
      :client="formItem"
      action="create"
      :updateFn="updateItemField"
      :errorsFromBack="getErrors"
      :nodeTitle="nodeTitle"
      @form:save="saveUser"
      @form:cancel="onCancel"
    )


</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VClientForm from './VClientForm'
import Client from '@/models/Client'
import { formMessages } from '@/mixins/formMessages.mixin'

export default {
  components: {
    VClientForm
  },
  mixins: [formMessages],
  data() {
    return {
      successMessage: this.$t('client_locations_sidebar.toast_success'),
      errorMessage: this.$t('client_locations_sidebar.toast_error')
    }
  },
  computed: {
    ...mapState('clients', ['clients', 'selected']),
    ...mapState('clients/create', [
      'formItem',
      'itemSaved',
      'isFetching',
      'itemDeleted'
    ]),
    ...mapGetters('clients/create', ['getErrors']),
    ...mapGetters('clients', ['getChildNodes']),
    nodeTitle() {
      const parentNode = this.getChildNodes(this.selected)
      if (parentNode.id === 0) {
        return ''
      }
      return parentNode.name
    }
  },
  created() {
    this.setFormItem(Object.assign({}, new Client()))
    if (typeof this.selected === 'number' && this.selected > 0) {
      this.updateItemField({
        name: 'parentId',
        value: this.selected
      })
    }
  },
  beforeDestroy() {
    this.clearErrors()
  },
  methods: {
    ...mapActions('clients', ['saveClient', 'setSelected']),
    ...mapActions('clients/create', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem'
    ]),
    ...mapActions('clients/sidebar', ['setSidebarComponent']),
    saveUser() {
      this.saveClient(this.formItem).then(() => {
        if (!this.getErrors) {
          this.setSelected({ id: null })
          this.setSidebarComponent('default')
        }
      })
    },
    onCancel() {
      this.$emit('sidebar:navigate', 'cancel')
    }
  }
}
</script>
