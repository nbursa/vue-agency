<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import sidebarOptions from './sidebar.options'
import searchOptions from './tableFilter.options'
import UserName from '@/components/shared/table/VUserName'
import CTableFilters from '@/components/shared/search-filters/CTableFilters.vue'

export default {
  components: {
    CTableFilters,
    BaseTablePage
  },
  extends: BaseTablePage,
  data() {
    return {
      tableFilterOptions: searchOptions,
      type: 'locationAdmins/table',
      sidebarOptions: sidebarOptions,
      namespace: 'locationAdmins',
      fetchFn: this.getLocationAdmins,
      jobs: this.locationAdmins,
      columns: [
        {
          show: 'id',
          label: 'client_locations.table_column_0',
          width: 0.25
        },
        {
          component: UserName,
          label: 'client_locations.table_column_1'
        },
        {
          show: 'clientNames',
          label: 'client_locations.filter_tab_0'
        },
        {
          show: 'email',
          label: 'client_locations.table_column_2'
        },
        {
          show: 'mobilePhone',
          label: 'client_locations.table_column_3'
        },
        {
          show: 'role.label',
          label: 'client_locations.table_column_4'
        }
      ]
    }
  },
  computed: {
    ...mapState('locationAdmins', ['locationAdmins', 'meta', 'status']),
    ...mapState('locationAdmins/edit', ['itemSaved']),
    ...mapGetters('locationAdmins', ['getLocationAdminsWithFullName']),
    tableData: function() {
      return this.locationAdmins
    }
  },

  methods: {
    ...mapActions('locationAdmins', ['getLocationAdmins'])
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
