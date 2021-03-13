<template lang="pug">
div
  header(v-if="!showJobPicker")
    .sidebar-control
  .sidebar-overflow(v-if="!showJobPicker")
    form.sidebar-form
      .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("documents_sidebar.doc_name") }}
          input.sidebar-form_input.is-fullwidth(
            v-model="name"
            type="text"
          )
          .help.is-danger(v-if="getErrors.hasOwnProperty('name')") {{getErrors.name[0]}}
      .sidebar-form_field.sidebar-form_field--flex
          label.sidebar-form_label
            | {{ $t("documents_sidebar.is_required") }}
          input.sidebar-form_input(v-model="isRequired" type="checkbox")
      .sidebar-form_field.sidebar-form_field--flex
          label.sidebar-form_label
            | {{ $t("documents_sidebar.has_expiry") }}
          input.sidebar-form_input(v-model="hasExpiry" type="checkbox")
      .border-line
      .sidebar-form_field.sidebar-form_field--job-type
          .help.is-danger(v-if="getErrors.hasOwnProperty('jobTypes')") {{getErrors.jobTypes[0]}}
          label.sidebar-form_label
            | {{ $t("documents_sidebar.job_type") }}
          a.is-pulled-right(@click.prevent="onJobTypeClick") + {{ $t("documents_sidebar.button_add_job") }}

      v-selected-job-types(
        v-if="jobTypes && jobTypes.length > 0"
        :jobTypes="jobTypes"
        @cancel:jobType="onJobTypeCancel"
      )
      .sidebar-footer
        span  {{ $t("documents_sidebar.label_add_document") }}
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onCancel") {{ $t("documents_sidebar.button_cancel") }}
          button.button.is-tmpst-info(@click.prevent="onDocumentSave" type="submit") {{ $t("documents_sidebar.button_save") }}

  .sidebar-overflow(v-else)
    .sidebar-type-picker
      c-job-types-picker(
      )

      v-selected-job-types(
        v-if="jobTypes && jobTypes.length > 0"
        :jobTypes="jobTypes"
        @cancel:jobType="onJobTypeCancel"
      )

    div
      .sidebar-footer
        span {{ $t("documents_sidebar.add_types") }}
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onAddJobTypeCancel") {{ $t("documents_sidebar.button_cancel") }}
          button.button.is-tmpst-info(@click.prevent="onAddJobTypeSave" type="submit") {{ $t("documents_sidebar.button_save") }}
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CJobTypesPicker from '@/components/shared/job-types-picker/CJobTypesPicker.vue'
import VSelectedJobTypes from '@/components/shared/selected-job-types/VSelectedJobTypes'
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import Document from '@/models/Document'
import { jtMixin } from '@/mixins/jobTypeSelector.mixin'

import FormModule from '@/store/modules/form'

import { errorDefaults, successDefaults } from '@/config/notifications'

export default {
  components: {
    CJobTypesPicker,
    VSidebarInput,
    VSelectedJobTypes
  },
  mixins: [jtMixin],
  data() {
    return {
      namespace: 'documents',
      showJobPicker: false,
      successMessage: this.$t('documents_sidebar.toast_success')
    }
  },
  computed: {
    ...mapState('documents/create', ['formItem', 'itemSaved', 'isFetching']),
    ...mapGetters('documents/create', ['getErrors']),
    ...mapState('jobTypeSelector', ['selectedJobTypes']),
    name: {
      get() {
        return this.formItem.name
      },
      set(value) {
        this.updateItemField({ value: value, name: 'name' })
      }
    },
    isRequired: {
      get() {
        return this.formItem.isRequired
      },
      set(value) {
        this.updateItemField({ value: value, name: 'isRequired' })
      }
    },
    hasExpiry: {
      get() {
        return this.formItem.hasExpiry
      },
      set(value) {
        this.updateItemField({ value: value, name: 'hasExpiry' })
      }
    },
    jobTypes: {
      get() {
        return this.formItem.jobTypes
      }
    }
  },
  mounted() {
    this.setFormItem(Object.assign({}, new Document()))
    this.resetSelectedJobType()
  },
  methods: {
    ...mapActions('documents', ['saveDocument']),
    ...mapActions('documents/create', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem',
      'setChildItems'
    ]),

    onDocumentSave() {
      this.clearErrors()
      this.saveDocument(this.formItem)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

.right-sidebar {
  .sidebar-form {
    margin-top: 3.5em;
  }
}

.sidebar-form_field {
  &--flex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      min-width: auto !important;
    }
  }

  &--job-type {
    padding-bottom: 10px !important;

    @media (max-width: $display-small-desktop) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
