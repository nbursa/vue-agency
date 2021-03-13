<script>
import { mapActions, mapGetters, mapState } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import sidebarOptions from "./sidebar/sidebar.options"
import { bonusTabs } from "./search.options"
import ratesTableColumns from "./ratesTable.config"



export default {
  extends: BaseTablePage,
  data() {
     return {
      sidebarOptions: sidebarOptions.bonuses,
      tableFilterOptions: bonusTabs,
      fetchFn: this.getAllBonuses,
      namespace: "bonuses",
      type: "bonuses/table",
    }
  },
  computed: {
     ...mapState("bonuses", [
      "bonuses",
      "meta",
      "status"
    ]),
    ...mapState("bonuses/table", ["selected"]),

    columns: function() {
      return ratesTableColumns.bonuses
    },
    tableData() {
      return this.bonuses
    }
  },
  created() {
    if (this.selected && this.selected.length > 0 && this.selected[0].id) {
      return this.setSidebarComponent("edit")
    }
    this.setSidebarComponent("default")
  },
  methods: {
    ...mapActions("bonuses", [
      "getAllBonuses"
    ]),
    ...mapActions("bonuses/sidebar", ["setSidebarComponent"]),
  }
}
</script>

