
<template lang="pug">
div
  header(v-if="!showJobPicker")
    .sidebar-control
      v-new-candidate-link
    .sidebar-control-tab(style="height:40px; padding:0;")
      v-uploader(
      @upload="uploadCsv"
      :status="getUploadStatus"
    )
  .clear
  .sidebar-overflow(v-if="!showJobPicker")
    v-candidate-form(
      :candidate="formItem"
      action="save"
      :updateFn="updateItemField"
      :errorsFromBack="getErrors"
      @form:save="saveForm(formItem)"
      @form:cancel="onCancel"
      @form:addJobType="onJobTypeClick"
    )

    v-selected-job-types(
      v-if="jobTypes && jobTypes.length > 0"
      :jobTypes="jobTypes"
      @cancel:jobType="removeChildItem"
    )
    div(style="padding-top: 150px")


  .sidebar-overflow(v-else)
    .sidebar-type-picker
      c-job-types-picker(
        :hasGrades="true"
      )

      v-selected-job-types(
        :jobTypes="jobTypes"
        @cancel:jobType="removeChildItem"
      )
      div(style="padding-top: 100px")

    .sidebar-footer
      span {{ $t('candidates_sidebar.label_add_job') }}
        .is-pulled-right
          a.button.is-cancelled(@click.prevent="onAddJobTypeCancel")
            span {{ $t('candidates_sidebar.cancel') }}
          base-button(@click="onAddJobTypeSave" customClass="is-small")  {{ $t('candidates_sidebar.save') }}
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import VCandidateForm from "./VCandidateForm"
import CJobTypesPicker from "@/components/shared/job-types-picker/CJobTypesPicker.vue"
import VSelectedJobTypes from "@/components/shared/selected-job-types/VSelectedJobTypes"
import VUploader from "@/components/shared/uploader/VUploader"
import FormModule from "@/store/modules/form/"
import Candidate from "@/models/Candidate"
import VNewCandidateLink from "./VNewCandidateLink.vue"
import { jtMixin } from "@/mixins/jobTypeSelector.mixin"


export default {
  components: {
    VCandidateForm,
    CJobTypesPicker,
    VSelectedJobTypes,
    VUploader,
    VNewCandidateLink
  },
  mixins: [jtMixin],
  data() {
    return {
      showJobPicker: false,
      successMessage: this.$t("candidates_sidebar.toast_success")
    }
  },
  computed: {
    ...mapState("candidates/table", ["selected"]),
    ...mapState("candidates/create", ["formItem", "itemSaved", "isFetching"]),
    ...mapGetters("candidates/create", ["getErrors", "getUploadStatus"]),
    ...mapState("jobTypeSelector", ["selectedJobTypes"]),
    jobTypes: {
      get() {
        return this.formItem.jobTypes
      }
    }
  },
  created() {
    this.setFormItem(Object.assign({}, new Candidate()))
    this.resetSelectedJobType()
  },
  beforeDestroy() {
    this.clearErrors()
    this.setUploadStatus(0)
  },
  methods: {
    ...mapActions("candidates", ["saveCandidate", "uploadCsv"]),
    ...mapActions("candidates/create", [
      "setUploadStatus",
      "updateItemField",
      "clearErrors",
      "setFormItem",
      "addChildItem",
      "removeChildItem",
      "setChildItems"
    ]),
    saveForm(formItem) {
      this.saveCandidate(formItem)
      this.clearErrors()
    }
  }
}
</script>
<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/variables';
@import '~@/assets/styles/global/partials/action-buttons';


@media (max-width: $display-small-desktop) {
  .right-sidebar {
    .sidebar-overflow {
      height: 82.5vh;
    }
  }
}

.sidebar-control.has-buttons {
  display: flex;
  justify-content: center;
  border-top: 1px solid #ddd;

  @media (max-width: $display-small-desktop) {
    flex-wrap: wrap;
    justify-content: space-around;
  }

  svg {
    color: #CB1B1B;
  }

  // justify-content flex-end
  button {
    margin-left: 1em;

    @media (max-width: $display-small-desktop) {
      margin: 0 5px 0;
    }

    &.is-fullwidth {
      width: 100%;

      @media (max-width: $display-small-desktop) {
        margin: 0 0 10px;
        width: 45%;
        font-size: 14px;
      }
    }
  }
}

.sidebar-control.hours-tab {
  border-top: 1px solid #ddd;

  > div {
    width: 50%;

    @media (max-width: $display-small-desktop) {
      font-size: 14px;
    }
  }

  .hours {
    width: 50px;
    float: right;
    text-align: center;
    border-radius: 13px;
    background-color: #f1f1f1;
  }
}

.sidebar-overflow {
  padding-bottom: 9em !important;
  @media (max-width: $display-small-desktop) {
    padding-top: 38px;
  }
}

.action-panel__warning {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


