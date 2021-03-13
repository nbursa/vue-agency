<template lang="pug">

  .documents
    .documents__table
      VTable(:columns="columns" :tableData="documents")


</template>

<script>
import VTable from "./VTable"
import { mapState, mapActions } from "vuex"
import documentsStatus from "./VDocumentsStatus.vue"

export default {
  components: { VTable },
  props: {
    candidateId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      columns: [
        {
          show: "name",
          label: this.$t("candidate_details.documents_table_col1")
        },
        {
          show: "isRequired",
          label: this.$t("candidate_details.documents_table_col2")
        },
        {
          component: documentsStatus,
          label: this.$t("candidate_details.documents_table_col3")
        }
      ]
    }
  },
  computed: {
    ...mapState({
      documents(state, getters) {
        return [...state.candidateDocuments.manage.compliancedocs].sort((x, y) => {
          let a = x.isRequired
          let b = y.isRequired
          return (a === b) ? 0 : a ? -1 : 1
        })
      }
    })
  },
  mounted() {
    this.getComplianceDocuments(this.candidateId)
  },
  methods: {
    ...mapActions("candidateDetails/documents", ["getComplianceDocuments"])
  }
}
</script>



<style lang="stylus" scoped>
</style>

