<script>
import { mapActions, mapGetters, mapState } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import sidebarOptions from "./sidebar/sidebar.options"
import { rateTabs } from "./search.options"
import ratesTableColumns from "./ratesTable.config"



export default {
  extends: BaseTablePage,
  data() {
     return {
      sidebarOptions: sidebarOptions.margins,
      tableFilterOptions: rateTabs,
      fetchFn: this.getAllMargins,
      namespace: "margins",
      type: "margins/table",
    }
  },
  computed: {
     ...mapState("margins", [
      "margins",
      "meta",
      "status",
      "tableMode",
    ]),
    ...mapState("rates", ["tableMode"]),
    columns: function() {
      return [  ...ratesTableColumns["margins"], ...ratesTableColumns.marginCols[this.tableMode] ]
    },
    tableData() {
      return this.margins
    }
  },
  created() {
    this.setSidebarComponent("default")
  },
  methods: {
    ...mapActions("margins", [
      "getAllMargins"
    ]),
    ...mapActions("margins/sidebar", ["setSidebarComponent"]),
  }
}
</script>
