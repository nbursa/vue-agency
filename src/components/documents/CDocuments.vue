<script>
import { mapActions, mapState } from 'vuex'

import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import sidebarOptions from './sidebar/sidebar.options'
import searchConfig from '@/config/documentComplianceNav'

export default {
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions,
      tableFilterOptions: searchConfig,
      type: 'documents/table',
      namespace: 'documents',
      fetchFn: this.getDocuments,
      isTabbed: true,
      columns: [
        {
          show: 'name',
          label: 'documents.settings_column_0'
        },
        {
          show: 'isRequired',
          label: 'documents.settings_column_1'
        },
        {
          show: 'hasExpiry',
          label: 'documents.settings_column_2'
        }
      ]
    }
  },
  computed: {
    ...mapState('documents', ['documents', 'meta', 'status']),
    tableData: function () {
      return this.documents || []
    }
  },
  methods: {
    ...mapActions('documents', ['getDocuments'])
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
