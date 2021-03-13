<template lang="pug">
div
  header(v-if="!showJobPicker")
    .sidebar-control
      v-add-document-link(@click="onAddClick")
    .sidebar-control-tab
      v-delete-button(
        @delete:item="onDelete"
        :text="$t('documents_sidebar.document')"
      )
  .sidebar-overflow(v-if="!showJobPicker")
    form.sidebar-form
      .sidebar-form_field
        label.sidebar-form_label
          | {{ $t("documents_sidebar.doc_name") }}
        input.sidebar-form_input.is-fullwidth(v-model="name")
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
        v-if="jobTypes"
        :jobTypes="jobTypes"
        @cancel:jobType="onJobTypeCancel"
      )
      .sidebar-footer
        span {{ $t("documents_sidebar.label_add_document") }}
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onCancel") {{ $t("documents_sidebar.button_cancel") }}
          button.button.is-tmpst-info(@click.prevent="onDocumentSave") {{ $t("documents_sidebar.button_save") }}

  .sidebar-overflow(v-else)
    c-job-types-picker(
    )

    v-selected-job-types(
      :jobTypes="jobTypes"
      @cancel:jobType="onJobTypeCancel"
    )

    .sidebar-footer
      span {{ $t("documents_sidebar.add_types") }}
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onAddJobTypeCancel") {{ $t("documents_sidebar.button_cancel") }}
          button.button.is-tmpst-info(@click.prevent="onAddJobTypeSave") {{ $t("documents_sidebar.button_save") }}
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CJobTypesPicker from '@/components/shared/job-types-picker/CJobTypesPicker.vue'
import VSelectedJobTypes from '@/components/shared/selected-job-types/VSelectedJobTypes'
import VDeleteButton from '@/components/shared/sidebar-form/VDeleteButton'
import { jtMixin } from '@/mixins/jobTypeSelector.mixin'
import VAddDocumentLink from './VAddDocumentLink'

export default {
  components: {
    VAddDocumentLink,
    CJobTypesPicker,
    VSelectedJobTypes,
    VDeleteButton
  },
  mixins: [jtMixin],
  data() {
    return {
      showJobPicker: false,
      successMessage: this.$t('documents_sidebar.toast_save'),
      deleteMessage: this.$t('documents_sidebar.toast_error')
    }
  },
  computed: {
    ...mapState('documents/table', ['selected']),
    ...mapState('documents/edit', [
      'formItem',
      'itemSaved',
      'isFetching',
      'itemDeleted'
    ]),
    ...mapGetters('documents/edit', ['getErrors']),
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
  watch: {
    selected: function (item) {
      this.clearErrors()
      this.getDocument(item[0].id)
    }
  },
  mounted() {
    this.getDocument(this.selected[0].id)
    this.setFormItem(Object.assign({}, this.formItem))
    this.setSelectedJobTypes(this.jobTypes)
  },
  methods: {
    ...mapActions('documents', [
      'getDocument',
      'updateDocument',
      'deleteDocument'
    ]),
    ...mapActions('documents/edit', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem',
      'setChildItems'
    ]),
    isChecked(jt) {
      return this.formItem.jobTypes.find((item) => item.id == jt.id)
    },
    onDocumentSave() {
      this.clearErrors()
      this.updateDocument(this.formItem)
    },
    onDelete() {
      this.deleteDocument(this.formItem.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/variables';

.sidebar-form_field {
  &__expiration {
    display: flex;

    @media (max-width: $display-small-desktop) {
      flex-direction: column;
    }

    input {
      width: 100%;
    }
  }

  &--flex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      min-width: auto !important;
      padding-top: 0 !important;
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
