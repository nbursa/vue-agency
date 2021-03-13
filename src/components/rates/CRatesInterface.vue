<script>
import { mapActions, mapState } from 'vuex'

import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import sidebarOptions from './sidebar/sidebar.options'
import { rateTabs } from './search.options'
import ratesTableColumns from './ratesTable.config'

export default {
  //type scheduled needs support
  extends: BaseTablePage,
  data() {
    return {
      sidebarOptions: sidebarOptions.rates,
      tableFilterOptions: rateTabs,
      fetchFn: this.getAllPayrates,
      namespace: 'rates',
      type: 'rates/table',
      selectType: 'single'
    }
  },
  computed: {
    ...mapState('rates', [
      'payrates',
      'options',
      'activeTable',
      'meta',
      'status',
      'tableMode',
      'tableTab'
    ]),
    columns: function () {
      return [
        ...ratesTableColumns[this.activeTable],
        ...ratesTableColumns.rateCols[this.tableMode][this.activeTable]
      ]
    },
    tableData() {
      return this.payrates
    }
  },
  watch: {
    '$route.name': {
      handler: 'setActiveTable',
      deep: true
    }
  },
  created() {
    this.getClients()
    this.getDayTimes()
    this.getAllOptions()
    this.setActiveTable(this.$route.name)
    this.setSidebarComponent('default')
  },
  beforeDestroy() {
    this.resetQueryList()
  },
  methods: {
    ...mapActions('rates', [
      'getAllPayrates',
      'setActiveTable',
      'getAllOptions',
      'resetQueryList',
      'getClients',
      'getDayTimes'
    ]),
    ...mapActions('rates/sidebar', ['setSidebarComponent'])
  }
}
</script>
