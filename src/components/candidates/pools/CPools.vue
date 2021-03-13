<script>
import filterOptions from './filter.options'
import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import { mapActions, mapState, mapGetters } from 'vuex'
import sidebarOptions from './sidebar.options'
import searchOptions from './filter.options'
import VPoolActions from './VPoolActions'

export default {
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions,
      tableFilterOptions: searchOptions,
      fetchFn: this.getCandidatePools,
      namespace: 'candidatePools',
      type: 'candidatePools/table',
      columns: [
        {
          show: 'id',
          label: 'candidate_pool.table_column_0',
          width: 0.25
        },

        {
          show: 'name',
          label: 'candidate_pool.table_column_1',
          type: 'name',
          width: 5
        },
        {
          show: 'users.length',
          label: 'candidate_pool.number_of_candidates',
          width: 5
        },
        {
          component: VPoolActions,
          label: 'candidates.table_column_4'
        }
      ]
    }
  },
  computed: {
    ...mapState('candidatePools', ['pools', 'meta', 'status']),
    tableData: function () {
      return this.pools
    }
  },
  methods: {
    ...mapActions('candidatePools', ['getCandidatePools'])
  }
}
</script>
