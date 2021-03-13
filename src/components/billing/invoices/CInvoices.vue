<script>
import { mapActions, mapState, mapGetters } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import * as sidebarOptions from "../sidebar/sidebar.options"
import searchOptions from "../search.options"
import tableConfig from "../tableColumn.config.js"

export default {
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions.optionsInvoices,
      tableFilterOptions: searchOptions.invoiceFilters,
      fetchFn: this.getInvoices,
      namespace: "invoices",
      type: "invoices/table",
      columns: tableConfig.invoices
    }
  },
  computed: {
    ...mapState("invoices", ["invoices", "meta", "status"]),
    tableData: function() {
      return this.invoices || []
    }
  },
  methods: {
    ...mapActions("invoices", ["getInvoices"])
  }
}
</script>

<style lang="stylus" scoped>
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

