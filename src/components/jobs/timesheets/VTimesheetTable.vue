<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import VStatusIndicator from '../job-scheduleList/VStatusIndicator'
import NetHours from './VJobNetHours'
import sidebarOptions from '../job-scheduleList/sidebar.options'
import tableFilterOptions from './tableFilter.options'
import VVarianceCell from './VVarianceCell'
import JobActions from '../job-scheduleList/VJobActions.vue'
import _ from 'lodash'
import DateUtils from '@/utils/dateUtils'

export default {
  extends: BaseTablePage,
  data() {
    return {
      type: 'timesheets/table',
      namespace: 'timesheets',
      sidebarOptions: sidebarOptions,
      fetchFn: this.fetchTimesheetJobs,
      activeView: 'VTimesheetTable',
      columns: [
        {
          show: 'id',
          label: 'timesheets.table_column_0',
          width: 0.25
        },
        {
          component: VStatusIndicator,
          label: 'timesheets.table_column_1'
        },
        {
          show: 'startTime',
          label: 'timesheets.table_column_2',
          type: 'date'
        },
        {
          show: 'jobTime',
          label: 'timesheets.table_column_3'
        },
        {
          component: NetHours,
          label: 'timesheets.net_hours'
        },
        {
          show: 'jobRequest.jobType.name',
          label: 'timesheets.table_column_4'
        },
        {
          show: 'client.name',
          label: 'timesheets.table_column_5'
        },
        {
          component: VVarianceCell,
          label: 'timesheets.table_column_9'
        },
        {
          component: JobActions,
          label: 'candidates.table_column_4'
        }
      ]
    }
  },
  computed: {
    ...mapState('timesheets', ['jobs', 'meta', 'status']),
    ...mapGetters('timesheets', ['getJobsWithDateTime']),
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
    ...mapActions('timesheets', ['fetchJobs']),
    ...mapActions('timesheets/table', ['clearSelectedItems']),
    ...mapActions({
      updateSearchParams(dispatch, payload) {
        return dispatch(this.namespace + '/search/updateSearchParams', payload)
      }
    }),
    fetchTimesheetJobs(query) {
      let queryStatus = query.status
        ? query
        : {
            ...query,
            status: 'sign_off_pending,admin_sign_off_pending,invoice_pending'
          }
      this.fetchJobs(queryStatus)
    }
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
