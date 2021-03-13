
<script>
import filterOptions from "./filter.options"
import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import { mapActions, mapState, mapGetters } from "vuex"
import sidebarOptions from "./sidebar.options"
import searchOptions from "./filter.options"

export default {
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions,
      tableFilterOptions: searchOptions,
      fetchFn: this.getUserRequests,
      namespace: "userUnavailiability",
      type: "userUnavailiability/table",
      columns: [
        {
          show: "id",
          label: "requests.table_column_0",
          width: 0.25
        },

        {
          show: "dates[0].date",
          label: "requests.table_column_1",
          type: "date"
        },
        {
          show: "prettyType",
          label: "requests.table_column_2"
        },
        {
          show: "user.fullName",
          label: "requests.table_column_3"
        }
      ]
    }
  },
  computed: {
    ...mapState("userUnavailiability", ["userRequests", "meta", "status"]),
    ...mapGetters("userUnavailiability", ["getWithFullName"]),
    tableData: function() {
      return this.getWithFullName
    }
  },
  methods: {
    ...mapActions("userUnavailiability", ["getUserRequests"])
  }
}
</script>

