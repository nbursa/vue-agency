<script>
import { mapActions, mapState, mapGetters } from "vuex"

import BaseTablePage from "@/components/shared/base-components/BaseTablePage"
import sidebarOptions from "./sidebar.options"
import searchOptions from "./search.options"
import UserName from "@/components/shared/table/VUserName"

export default {
  extends: BaseTablePage,
  data() {
    return {
      tableFilterOptions: searchOptions,
      type: "users/table",
      namespace: "users",
      sidebarOptions: sidebarOptions,
      fetchFn: this.getUsers,
      columns: [
        {
          show: "id",
          label: "internal_users.table_column_0",
          width: 0.25
        },
        {
          component: UserName,
          label: "internal_users.table_column_1"
        },
        {
          show: "email",
          label: "internal_users.table_column_2"
        },
        {
          show: "mobilePhone",
          label: "internal_users.table_column_3"
        },
        {
          show: "role.label",
          label: "internal_users.table_column_4"
        }
      ]
    }
  },
  computed: {
    ...mapState("users", ["users", "meta", "status"]),
    ...mapGetters("users", ["getUsersWithFullName"]),
    tableData: function() {
      return this.users
    }
  },
  methods: {
    ...mapActions("users", ["getUsers"])
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

