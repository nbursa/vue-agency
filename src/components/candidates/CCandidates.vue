<script>
import { mapActions, mapState, mapGetters } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import sidebarOptions from "./sidebar.options"
import searchOptions from "./search.options"
import CandidateName from "@/components/shared/table/VCandidateName"
import CandidateActions from "./VCandidateActions"

export default {
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions,
      tableFilterOptions: searchOptions,
      fetchFn: this.getCandidates,
      namespace: "candidates",
      type: "candidates/table",
      testData: 10,
      columns: [
        {
          show: "id",
          label: "candidates.table_column_0",
          width: 0.25
        },
        {
          component: CandidateName,
          label: "candidates.table_column_1",
        },
        {
          show: "email",
          label: "candidates.table_column_2"
        },
        {
          show: "mobilePhone",
          label: "candidates.table_column_3",
          width: 0.6
        },
        {
          component: CandidateActions,
          label: "candidates.table_column_4",
        }
      ]
    }
  },
  computed: {
    ...mapState("candidates", ["candidates", "meta", "status"]),
    tableData: function() {
      return this.candidates
    }
  },
  methods: {
    ...mapActions("candidates", ["getCandidates"])
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

