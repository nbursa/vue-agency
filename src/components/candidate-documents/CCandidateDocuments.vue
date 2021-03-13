<script>
import { mapActions, mapState } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import ItemCounter from "@/components/shared/table-item-count/ItemCounter"
import sidebarOptions from "./sidebar/sidebar.options"

import searchConfig from "@/config/documentComplianceNav"

export default {
  extends: BaseTablePage,
  data() {
    return {
      tableFilterOptions: searchConfig,
      sidebarOptions: sidebarOptions,
      type: "candidateDocuments/table",
      namespace: "candidateDocuments",
      fetchFn: this.getCandidates,
      columns: [
        {
          show: "firstName",
          label: "documents.candidates_column_0",
          width: 0.7
        },
        {
          component: ItemCounter,
          label: "documents.candidates_column_1",
          width: 0.15
        },
        {
          show: "documentExpirationDate",
          label: "documents.candidates_column_2",
          type: "date",
          width: 0.15
        }
      ]
    }
  },
  computed: {
    ...mapState("candidateDocuments", ["candidates", "meta", "status"]),
    ...mapState({
      sidebarComponent(state, getters) {
        return state["candidateDocuments"].sidebar.sidebarComponent
      },
      selected(state, getters) {
        return state["candidateDocuments"].table.selected
      },
      tableData(state, getters) {
        return state[this.namespace].candidates || []
      }
    })
  },
  methods: {
    ...mapActions("candidateDocuments", [
      "getCandidates",
      "getComplianceDocuments"
    ]),
    ...mapActions({
      setSidebarComponent(dispatch, payload) {
        return dispatch(
          "candidateDocuments/sidebar/setSidebarComponent",
          payload
        )
      }
    }),
    onSearchChange() {}
  }
}
</script>

<style lang="stylus">
.search-filters {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;

  .columns {
    padding: 0px 15px;
    border-bottom: 1px solid #DFE2E3;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
