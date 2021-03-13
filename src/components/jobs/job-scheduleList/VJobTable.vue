<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import VCandidateCell from './VCandidateCell'
import VStatusIndicator from './VStatusIndicator'

import sidebarOptions from './sidebar.options'
import tableFilterOptions from './tableFilter.options'
import positionComponent from './VPosition.vue'
import JobActions from './VJobActions.vue'

import _ from 'lodash'

export default {
  extends: BaseTablePage,
  data() {
    return {
      type: 'jobManagement/table',
      namespace: 'jobManagement',
      sidebarOptions: sidebarOptions,
      fetchFn: this.fetchJobs,
      activeView: 'VJobTable',
      columns: [
        {
          show: 'id',
          label: 'jobs.table_column_id',
          width: 0.25
        },
        {
          component: VStatusIndicator,
          label: 'jobs.table_column_0'
        },
        {
          show: 'startTime',
          label: 'jobs.table_column_1',
          type: 'date'
        },
        {
          show: 'jobTime',
          label: 'jobs.table_column_2'
        },
        {
          show: 'jobRequest.jobType.name',
          label: 'jobs.table_column_7'
        },
        {
          show: 'client.name',
          label: 'jobs.table_column_3'
        },
        {
          component: VCandidateCell,
          label: 'jobs.table_column_4'
        },
        {
          component: positionComponent,
          label: 'jobs.table_column_5'
        },
        {
          component: JobActions,
          label: 'candidates.table_column_4'
        }
      ]
    }
  },
  computed: {
    ...mapState('jobManagement', ['jobs', 'meta', 'status']),
    ...mapGetters('jobManagement', ['getJobsWithDateTime']),
    ...mapGetters('modals', ['showModal']),
    ...mapState({
      searchParams(state, getters) {
        return state[this.namespace].search.params
      }
    }),
    tableData: function () {
      return this.getJobsWithDateTime ? this.getJobsWithDateTime : []
    },
    tableFilterOptions: {
      get() {
        const opts = _.cloneDeep(tableFilterOptions)
        const params = this.searchParams.group
        if (
          this.searchParams.group &&
          this.searchParams.group !== 'all' &&
          this.searchParams.group !== ''
        ) {
          opts.advancedSearch[0].data = tableFilterOptions.advancedSearch[0].data.filter(
            (item) => {
              return item.group === params
            }
          )
        }
        return opts
      }
    }
  },
  created() {
    this.clearSelectedItems()
    this.setSidebarComponent('default')
  },
  methods: {
    ...mapActions('jobManagement', ['fetchJobs']),
    ...mapActions('jobManagement/table', ['clearSelectedItems'])
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
