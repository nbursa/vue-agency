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
      sidebarOptions: sidebarOptions.optionsShifts,
      tableFilterOptions: searchOptions.shiftsFilters,
      fetchFn: this.getShifts,
      msgNoTableData: this.$t("billing.empty_msg"),
      namespace: "shifts",
      type: "shifts/table",
      selectType: "multi",
      columns: tableConfig.shifts
    }
  },
  computed: {
    ...mapState("shifts", ["shifts", "meta", "status"]),
    ...mapState("shifts/search", ["params"]),
    ...mapState("shifts/table", ["checked"]),
    ...mapGetters("shifts", ["getShiftsWithDateTime"]),
    tableData() {
      return this.getShiftsWithDateTime ? this.getShiftsWithDateTime : []
    }
  },
  mounted() {
    //this might be better implemented in BaseTable but leaving it here for now
    if (this.checked.length > 0) this.setSidebarComponent("edit")
  },
  methods: {
    ...mapActions("shifts", ["getShifts"])
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

