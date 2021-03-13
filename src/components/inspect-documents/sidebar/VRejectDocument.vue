<template lang="pug">
div
  header
    .sidebar-control.item-title
      div.item-title__back(@click="goBack")
        svgicon.item-title__arrow(name="user-roles/Arrow" :fill="false")
      div.item-title__label {{complianceItem.document.name}}
  section.sidebar-overflow
    div.rejection-window
      div.rejection-window__title {{ $t("documents_sidebar.reject_reason") }}
      textarea.textarea(v-model="rejectionReason")

  .sidebar-footer
    span  {{ $t("documents_sidebar.confirm_prompt") }}
    .is-pulled-right
      a.button.is-cancelled(@click.prevent="goBack") {{ $t("documents_sidebar.button_cancel") }}
      base-button(@click="submitReject" customClass="is-small" :disabled="isAllowed") {{ $t("documents_sidebar.button_reject") }}
</template>

<script>
import { mapActions, mapState } from "vuex"

import AddDocument from "./VAddDocumentLink"

import "@/compiled-icons/user-roles"

export default {
  components: {
    AddDocument
  },
  data() {
    return {
      rejectionReason: ""
    }
  },
  computed: {
    ...mapState("inspectDocuments/table", ["selected"]),
    isAllowed: function() {
      return this.rejectionReason.length <= 1
    },
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
    ...mapActions("inspectDocuments/edit", ["rejectComplianceDocuments"]),
    goBack() {
      this.$emit("sidebar:navigate", "edit")
    },
    submitReject() {
      const payload = {
        userId: this.complianceItem.user.id,
        documentId: this.complianceItem.document.id,
        rejectionReason: this.rejectionReason
      }
      this.rejectComplianceDocuments({
        data: payload,
        callback: "inspectDocuments/getDocuments"
      }).then(() => {
        this.$emit("sidebar:navigate", "default")
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

.rejection-window {
  padding: 15px;
  margin-top: 50px;

  &__title {
    color: $fontDark;
    text-align: left;
    padding-bottom: 10px;
  }

  textarea {
    resize: none;
    width: 100%;
    height: 150px;
  }
}

.action-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
