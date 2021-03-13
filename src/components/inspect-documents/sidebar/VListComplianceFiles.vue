<template lang="pug">
div
  header
    .sidebar-control
      add-document(namespace="documents")

  section.sidebar-overflow
    file-list(:files="complianceItem.files" @file-list:delete="deleteAction" :showDelete="showDelete")
  .sidebar-footer
    .action-panel(v-if="toDelete")
      div.action-panel__warning {{ $t("documents_sidebar.confirm_prompt") }}
      a.button.is-cancelled(@click.prevent="toDelete = false") {{ $t("documents_sidebar.button_cancel") }}
      base-button(@click="submitDelete" ) {{ $t("documents_sidebar.button_delete") }}
    .action-panel( v-else)
      a.button.is-cancelled(@click.prevent="submitRejection") {{ $t("documents_sidebar.button_reject") }}
      base-button(@click="submitApproval" customClass="is-small") {{ $t("documents_sidebar.button_approve") }}
</template>

<script>
import { mapActions, mapState } from "vuex"

import AddDocument from "./VAddDocumentLink"
import FileList from "@/components/shared/file-list/CFileList"

import "@/compiled-icons/user-roles"

export default {
  components: {
    AddDocument,
    FileList
  },
  data() {
    return {
      rejectionReason: "",
      toDelete: null,
      showDelete: false
    }
  },
  computed: {
    ...mapState("inspectDocuments/table", ["selected"]),
    complianceItem: function() {
      return this.selected[0]
    }
  },
  watch: {
    selected: {
      handler: "goBack"
    }
  },
  methods: {
    ...mapActions("inspectDocuments/edit", ["deleteDocumentFile"]),
    ...mapActions("inspectDocuments/edit", [
      "approveComplianceDocuments",
      "rejectComplianceDocuments"
    ]),
    ...mapActions("inspectDocuments", ["getDocuments"]),
    submitApproval() {
      const payload = {
        userId: this.complianceItem.user.id,
        documentId: this.complianceItem.document.id
      }
      this.approveComplianceDocuments({
        data: payload,
        callback: "inspectDocuments/getDocuments"
      }).then(() => {
        this.$emit("sidebar:navigate", "default")
      })
    },
    submitRejection() {
      this.$emit("sidebar:navigate", "reject")
    },
    goBack() {
      this.$emit("sidebar:navigate", "edit")
    },
    deleteAction(item) {
      this.toDelete = item
    },
    submitDelete() {
      const payload = {
        userId: this.complianceItem.user.id,
        documentId: this.complianceItem.document.id,
        fileId: this.toDelete.id,
        target: this.selected[0].files
      }
      this.deleteDocumentFile(payload).then(() => {
        this.toDelete = null
        this.getDocuments()
      })
    }
  }
}
</script>

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
  a {
    color: white;
  }
  &--is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
