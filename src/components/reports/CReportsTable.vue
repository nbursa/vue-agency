<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import sidebarOptions from './sidebar.options'
import tableFilters from './search.options'
import reports from './reports.options.js'
// import tableFilterOptions from '../jobs/job-scheduleList/tableFilter.options'

export default {
  name: 'CReportsTable',
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions,
      tableFilterOptions: tableFilters,
      isResetActive: true,
      fetchFn: this.fetchTableData,
      reports: reports,
      namespace: 'reports',
      type: 'reports/table',
      selectType: 'none',
      columns: []
    }
  },
  computed: {
    ...mapState('reports', ['activeModule']),
    ...mapState('reports/reportTable', ['candidates', 'meta', 'status']),
    activeStore: function () {
      return this.reports[this.activeModule].store
    },
    tableData: function () {
      let data
      if (this.activeStore.tableFiller.type === 'getters') {
        data = this.$store.getters[this.activeStore.tableFiller.name]
      } else {
        data = this.$store.state.reports.reportTable[
          this.activeStore.tableFiller.name
        ]
      }
      return data
    },
    tableColumns: function () {
      return this.reports[this.activeModule].table || []
    }
  },
  created() {
    this.clearReportFilters()
    this.activateModule()
    this.setSidebarComponent('create')
  },
  mounted() {
    this.resetSearchParams()
    // console.log('creae: ', this.reports, this.activeModule, this.tableFilterOptions)
    // if (this.reports.reportPayroll.csvDownload) {
    //   Object.assign(this.tableFilterOptions, { csvDownload: this.reports.reportPayroll.csvDownload})
    // }
    // console.log('tffo: ', this.tableFilterOptions)
  },
  beforeUpdate() {
    this.activateModule()
  },
  destroyed() {
    this.destroyActiveStoreModule()
    this.resetSearchParams()
  },
  methods: {
    ...mapActions('reports', [
      'clearReportFilters',
      'destroyActiveStoreModule',
      'setActiveStoreModule'
    ]),
    ...mapActions('reports/search', ['resetSearchParams']),
    activateModule() {
      if (!this.activeModule) {
        let { store, type } = this.reports[this.$route.name]
        this.setActiveStoreModule({ store, type })
      }
      this.columns = this.tableColumns
    },
    fetchTableData(filters) {
      // console.log('fethc tabel dasta: ', this.reports, this.activeModule)
      this.$store.dispatch(
        `reports/reportTable/${
          this.reports[this.activeModule].store.tableAction
        }`,
        filters
      )
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
