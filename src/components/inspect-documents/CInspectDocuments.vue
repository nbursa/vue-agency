

<script>
import { mapActions, mapState } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import sidebarOptions from "./sidebar/sidebar.options"
import SearchFilters from "../shared/search-filters/VSearchFiltersPreset.vue"
import searchConfig from "@/config/documentComplianceNav"

export default {
  extends: BaseTablePage,
  data() {
    return {
      tableFilterOptions: searchConfig,
      sidebarOptions: sidebarOptions,
      type: "inspectDocuments/table",
      namespace: "inspectDocuments",
      fetchFn: this.getDocuments,
      columns: [
        {
          show: "document.name",
          label: "documents.inspect_column_0"
        },
        {
          show: "user.firstName",
          label: "documents.inspect_column_1"
        },
        {
          show: "createdAt",
          label: "documents.inspect_column_2",
          type: "date"
        }
      ]
    }
  },
  computed: {
    ...mapState("inspectDocuments", ["documents", "meta"]),
    ...mapState({
      sidebarComponent(state, getters) {
        return state["inspectDocuments"].sidebar.sidebarComponent
      },
      selected(state, getters) {
        return state["inspectDocuments"].table.selected
      },
      isLoadingSidebar(state, getters) {
        return state["inspectDocuments"].edit.status
          ? state["inspectDocuments"].edit.status
          : false
      },
      status(state, getters) {
        return state["inspectDocuments"].status === "fetching" ? true : false
      }
    }),
    ...mapState("inspectDocuments/edit", {
      selectedDocument(state, getters) {
        return state["inspectDocuments"].table.selected
      }
    }),
    tableData: function() {
      return this.documents || []
    }
  },
  methods: {
    ...mapActions("inspectDocuments", ["getDocuments"]),
    ...mapActions({
      setSidebarComponent(dispatch, payload) {
        return dispatch("inspectDocuments/sidebar/setSidebarComponent", payload)
      }
    })
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
