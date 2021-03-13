<template lang="pug">
div
  header
    .sidebar-control
      add-document(namespace="documents")
  section.sidebar-overflow
    compliance-list(:icons="statusIcons" :data="compliancedocs" groupBy="isRequired" :nameBy="groupNamingConf" :customSort="sortConf" :itemSelected="selectedDocument" @compliancelist:selected="setSelectedDocument" @compliancelist:view-documents="switchView")

    .sidebar-footer
      .status-sheet
        div.status-sheet__item
          svgicon(name="documents-compliance/approved" :original="true" )
          span {{ $t("documents_sidebar.list_info_0") }}
        div.status-sheet__item
          svgicon(name="documents-compliance/uploaded" :original="true" )
          span {{ $t("documents_sidebar.list_info_1") }}
        div.status-sheet__item
          svgicon(name="documents-compliance/rejected" :original="true" )
          span {{ $t("documents_sidebar.list_info_2") }}
        div.status-sheet__item
          svgicon(name="documents-compliance/expiringsoon" :original="true" )
          span {{ $t("documents_sidebar.list_info_3") }}
        div.status-sheet__item
          svgicon(name="documents-compliance/expired" :original="true" )
          span {{ $t("documents_sidebar.list_info_4") }}


</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import complianceList from "@/components/shared/compliance-list/VComplianceList"
import DateTimeUtils from "@/utils/dateUtils"
import AddDocument from "./VAddDocumentLink"

import "@/compiled-icons/documents-compliance"


//complience file status codes
const statusIcons = {
  1: "uploaded",
  2: "approved",
  3: "expiringsoon",
  4: "expired",
  5: "rejected"
}

const customSort = {
  action: result => {
    const resultOrdered = {}
    Object.keys(result)
      .sort()
      .forEach(function(key) {
        resultOrdered[key] = result[key].sort((a, b) => {
          return DateTimeUtils.getDuration(a.expiryDate, b.expiryDate, ['milliseconds']).milliseconds
        })
      })
    return resultOrdered
  }
}

export default {
  components: {
    complianceList,
    AddDocument
  },
  data() {
    return {
      groupNamingConf: {
        true: this.$t("documents.list_group_0"),
        false: this.$t("documents.list_group_1")
      },
      sortConf: customSort,
      statusIcons: statusIcons
    }
  },
  computed: {
    ...mapState("candidateDocuments/table", ["selected"]),
    ...mapState("candidateDocuments/edit", [
      "compliancedocs",
      "selectedDocument",
      "isFetching"
    ]),
    ...mapGetters("candidateDocuments/edit", ["getErrors"]),
    isDisabled: function() {
      return (
        Object.keys(this.selectedDocument).length === 0 ||
        this.selectedDocument.status !== 1
      )
    }
  },
  watch: {
    selected: function(item) {
      console.log("watcher trigger")
      this.getComplianceDocuments(item[0].id)
    }
  },
  mounted() {
    this.getComplianceDocuments(this.selected[0].id)
  },
  methods: {
    ...mapActions("candidateDocuments", ["getComplianceDocuments"]),
    ...mapActions("candidateDocuments/edit", [
      "setSelectedDocument",
      "setViewedDocument",
      "approveComplianceDocuments",
      "rejectComplianceDocuments"
    ]),
    switchView(item) {
      this.setSelectedDocument(item)
      this.setViewedDocument(item)
      this.$emit("sidebar:navigate", "manage")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/partials/action-buttons';

.sidebar-footer {
  box-shadow: none !important;
  border-top: 2px solid #F4F4F4;
}

.status-sheet {
  // box-shadow: inset 0 -10px 10px -10px rgba(0,0,0,0.15);
  // border-bottom: 1px solid #dfe2e3;
  // margin: -15px -15px 15px -15px;
  // padding: 10px 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  &__item {
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      min-height: 25px;
      text-align: left;
      display: inline-block;
      padding-left: 5px;
      font-size: 0.875rem;
      color: #fff;
    }
  }
}

.action-panel {
  display: flex;
  justify-content: space-between;

  &--is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
