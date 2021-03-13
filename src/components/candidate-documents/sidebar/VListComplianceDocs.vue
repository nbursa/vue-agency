<template lang="pug">
div
  header
    .sidebar-control.item-title
      div.item-title__back(@click="goBack")
        svgicon.item-title__arrow(name="user-roles/Arrow" :fill="false")
      div.item-title__label {{viewedDocument.name}}
    .sidebar-control.item-filecount
      span {{ $t("documents_sidebar.uploaded") }}
      | {{viewedDocument.userFiles.length}}
  section.sidebar-overflow
    div.documents-candidate.expiry-date(:class="{'flatpickr-show': datePickerShow}")
      flatpickr(
        v-if="hasExpiry"
        :options="config",
        :placeholder="$t('documents_sidebar.date_msg')"
        @change="onDateChange",
        @flatpickr-click="toggleFlatpickr"
        v-model="expiryDate",
        :showInternalInput="false"
        customClass="fullWidthInput blue"
      )
    multi-uploader(
      :uploadParam="passDate"
      :uploadRequireParam="hasExpiry"
      :uploaderUrl="uploadUrl"
      :config="uploader"
      @multi-file-uploader:file-uploaded="updateTable"
    )
    file-list(:files="viewedDocument.userFiles" @file-list:delete="deleteAction")
  .sidebar-footer.sidebar-footer__delete(v-if="toDelete")
    .action-panel.action-panel__delete
      div.action-panel__warning {{ $t("documents_sidebar.confirm_prompt") }}
      base-button.first(@click="toDelete = false" customClass="is-cancel is-small") 
        span {{ $t("documents_sidebar.button_cancel") }}
      base-button(@click="submitDelete" customClass="is-small") 
        span {{ $t("documents_sidebar.button_delete") }}
  .sidebar-footer.sidebar-footer__submit(v-if="!toDelete")
    .action-panel.action-panel__submit(:class="{'action-panel--is-disabled': isDisabled}")
        base-button(@click="submitRejection" customClass="is-cancel")
          span {{ $t("documents_sidebar.button_reject") }}
        base-button(@click="submitApproval") {{ $t("documents_sidebar.button_approve") }}

</template>

<script>
import { mapActions, mapState } from "vuex"

import AddDocument from "./VAddDocumentLink"
import FileList from "@/components/shared/file-list/CFileList"
import MultiUploader from "@/components/shared/multifile-uploader/VFileUploader.vue"
import flatpickr from "@/components/shared/flat-pickr"
import DateTimeUtils from "@/utils/dateUtils.js"




import "@/compiled-icons/user-roles"

const uploaderConfig = {
  mutationName: "candidateDocuments/edit/SET_VIEWED_DOCUMENT",
  toCommit: "userFiles"
}

export default {
  components: {
    MultiUploader,
    AddDocument,
    FileList,
    flatpickr

  },
  data() {
    return {
      rejectionReason: "",
      toDelete: null,
      uploader: uploaderConfig,
      expiryDate: null,
      datePickerShow: false,
      config: {
        mode: "single",
        dateFormat: this.$localization.flatpickrFormat,
        enableTime: false,
        minDate: "today",
        inline: true
      }
    }
  },
  computed: {
    ...mapState("candidateDocuments/table", ["selected"]),
    ...mapState("candidateDocuments/search", ["params"]),
    ...mapState("candidateDocuments/edit", [
      "viewedDocument",
      "isFetching",
      "compliancedocs",
      "selectedDocument",
      "isFetching"
    ]),
    uploadUrl() {
      return `/users/${this.selected[0].id}/compliance/${this.viewedDocument.id}?include=userFiles` || ""
    },
    passDate() {
      return {
        name: "expiry_date",
        value: this.expiryDate !== null ? DateTimeUtils.getDateTimeFromClient(this.expiryDate) : null
      }
    },
    hasExpiry() {
      return this.selectedDocument.hasExpiry || false
    },
    isDisabled: function() {
      return (
        Object.keys(this.selectedDocument).length === 0 ||
        this.selectedDocument.status !== 1
      )
    }
  },
  watch: {
    selected: {
      handler: "goBack"
    },
    expiryDate: function(newVal, oldVal) {
      console.log(oldVal, newVal)
      if(newVal !== null) {
        this.datePickerShow = false
      }
    }
  },
  methods: {
    ...mapActions("candidateDocuments/edit", ["deleteDocumentFile", "approveComplianceDocuments", "rejectComplianceDocuments"]),
   ...mapActions("candidateDocuments", [
      "getCandidates"
    ]),
    toggleFlatpickr() {
      this.datePickerShow = !this.datePickerShow
    },

    onDateChange(date) {
      console.log(date)
    },
    goBack() {
      this.$emit("sidebar:navigate", "edit")
    },
    deleteAction(item) {
      this.toDelete = item
    },
    async submitDelete() {
      console.log("DELETE ITEM ID", this.toDelete.id)

      try {
        const payload = {
          userId: this.selected[0].id,
          documentId: this.viewedDocument.id,
          fileId: this.toDelete.id
        }
          this.toDelete = null

        await this.deleteDocumentFile(payload)
        this.updateTable()
      } catch(e) {
        console.log("error-delete", e)
      }
    },
    submitApproval() {
      const payload = {
          userId: this.selected[0].id,
          documentId: this.selectedDocument.id
      }
      this.approveComplianceDocuments({
        data: payload,
        callback: "candidateDocuments/getComplianceDocuments",
        callbackPayload: this.selected[0].id
      }).then(() => {
        this.goBack()
      })
    },
    submitRejection() {
      this.$emit("sidebar:navigate", "reject")
    },
    updateTable() {
      this.getCandidates(this.params)
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/variables';

.documents-candidate {
  &.expiry-date {
    position: relative;
    padding: 5px 15px 10px 15px;
    .blue {
      color: #8695FE;
      border-color: #8695FE;
      &::placeholder {
        color: #8695FE
      }
    }
    &.flatpickr-show {
      .flatpickr-calendar.inline {
        display: block;
      }
    }
    .flatpickr-calendar.inline {
      display: none;
      position: absolute;
      top: 89px;
      width: calc(100% - 30px);
      z-index: 3;
      .flatpickr-rContainer{
        margin-top:2em;
        padding:0;
        width:100%;
        margin:0 auto;
      }
      .dayContainer {
        max-width: 100%;
        min-width: inherit;
        width: 100% !important;
      }
      .flatpickr-day{
        margin:0.4em 0;
        max-width:100px;
        @media (max-width: $display-small-desktop) {
          font-size: 13px;
          height: 29px;
          line-height: 29px;
          margin: 2px 0;
        }
      }
      .flatpickr-days{
        width:100%;
      }
    }
  }
}

</style>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/partials/action-buttons';

.item-title {
  display: flex;
  align-items: center;
  min-height: 70px;
  justify-content: flex-start !important;
  border-bottom: 1px solid #F4F4F4;

  &__arrow {
    transform: rotate(90deg);
    padding-right: 2px;
  }

  &__back {
    height: 22px;
    border-right: 1px solid #DFDFDF;
    padding-right: 20px;
    padding-left: 10px;
    cursor: pointer;
  }

  &__label {
    padding-left: 20px;
    color: $fontDark;
  }
}

.item-filecount {
  display: flex;
  justify-content: space-between !important;
  align-items: center;

  span {
    opacity: 0.44;
  }
}

.action-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__delete {
    >.first {
      margin-right: 5px;
    }
  }
  &__submit {

  }
  &--is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &__warning {
    color: #fff;
  }
}

.sidebar-footer {
  &__delete {
    bottom: 63px !important;
  }
  &__submit {

  }
}
</style>
