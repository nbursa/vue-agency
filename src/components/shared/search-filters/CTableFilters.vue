<template lang="pug">
  div.search-filters
    div.columns.is-multiline
      v-tabbed-nav(
        v-if="options.tabbedNav && !clientAdminCheck"
        :options="options.tabbedNav"
      )

      v-query-filters(
        v-if="tableOpts"
        :options="tableOpts"
        :namespace="namespace"
      )

      v-calendar-switcher(
        :activeView="options.activeView"
        @toggle:list="onListClick"
        v-if="options.activeView"
        @toggle:calendar="onCalendarClick"
      )

      v-rate-switcher(
        v-if="options.rateSwitcher"
        :options="options.rateSwitcher"
      )

    div.columns(v-if="options.advancedSearch")
      v-advanced-search(
        v-if="options.advancedSearch"
        :options="options.advancedSearch"
        ref="advancedSearch"
      )

      v-search-input(
        v-if="options.inlineTextSearch"
        :options="options.inlineTextSearch"
      )

    div.columns(v-if="(options.datepicker || options.typeahead || options.textSearch || options.clientSearch || (options.tableColumnSwitcher && showTableColumnSwitcher)) && secondColumnDisplay")
      v-text-search(
        v-if="options.typeahead"
        :options="options.typeahead"
      )

      v-search-input(
        v-if="options.textSearch"
        :options="options.textSearch"
      )

      v-client-filter(
        v-if="options.clientSearch"
        :options="options.clientSearch"
        :namespace="namespace"
      )

      v-search-request-id(
        v-if="options.jobRequestSearch"
      )

      v-date-picker(
        v-if="options.datepicker"
        :options="options.datepicker"
        :namespace="namespace"
      )

      v-type-switcher(
        v-if="options.typeSwitcher"
        :options = "options.typeSwitcher"
      )

      v-table-column-switcher(
        v-if="options.tableColumnSwitcher"
        :options="options.tableColumnSwitcher"
        :visibility="checkingVisibility"
      )

      div.reset-button(v-if="enableFilterReset")
        button(@click="resetSearchParams")
          svgicon.icon(name="job-schedule/delete-filters-active"  width="15px" height="12px" :fill="false")

</template>

<script>
import {
  VAdvancedSearch,
  VDatePicker,
  VQueryFilters,
  VTextSearch,
  VTypeSwitcher,
  VRateSwitcher,
  VSearchRequestId,
  VTableColumnSwitcher,
  VClientFilter
} from '@/components/shared/search-filters'

import { mapActions, mapState } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faReset from '@fortawesome/fontawesome-free-solid/faRedo'
import VCalendarSwitcher from './VCalendarSwitcher.vue'
import VTabbedNav from './VSearchFiltersPreset'
import VSearchInput from './VSearchInput'
import '@/compiled-icons/job-schedule'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    VAdvancedSearch,
    VDatePicker,
    VQueryFilters,
    VTextSearch,
    FontAwesomeIcon,
    VTabbedNav,
    VCalendarSwitcher,
    VSearchInput,
    VTypeSwitcher,
    VRateSwitcher,
    VSearchRequestId,
    Treeselect,
    VTableColumnSwitcher,
    VClientFilter
  },
  provide() {
    return { namespace: this.namespace }
  },
  props: {
    activeView: {
      required: false,
      type: String,
      default: ''
    },
    options: {
      required: true,
      type: Object
    },
    namespace: {
      required: true,
      type: String
    },
    enableFilterReset: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      resetIcon: faReset
    }
  },
  computed: {
    ...mapState(['auth'], 'auth'),
    secondColumnDisplay: function () {
      if (this.options.tableFilterDisplay) {
        return this.options.tableFilterDisplay.secondColumn === this.$route.name
      } else {
        return true
      }
    },
    tableOpts: function () {
      return this.options.queryFilters
    },
    showTableColumnSwitcher: function () {
      return this.$route.name === this.options.tableColumnSwitcher.showOnRoute
    },
    selectedColumns: {
      get() {
        if (this.tableColumns.length) {
          let filtered = this.tableColumns.filter((column) => {
            if (column.hasOwnProperty('id')) {
              return column.id
            }
          })
          return filtered.map((column) => column.id)
        }
        return []
      },
      set(columns) {
        columns.map((column) => column.id)
        return this.onColumnsChange(columns)
      }
    },
    sortCheck() {
      return this.options.hasSort || false
    },
    checkingVisibility: function () {
      const { path } = this.$route
      return path === '/reports-worklog' || path === '/timesheets'
        ? true
        : false
    },
    clientAdminCheck: function () {
      return this.auth.user.role === 'client-admin'
    }
  },
  methods: {
    onCalendarClick() {
      this.$emit('toggle:calendar')
    },
    onListClick() {
      this.$emit('toggle:list')
    },
    ...mapActions({
      resetSearchParams(dispatch, payload) {
        if (!this.namespace) {
          throw new Error('Namespace not set')
        }
        return dispatch(this.namespace + '/search/resetSearchParams', payload)
      }
    }),
    ...mapActions('reports/table', ['addColumn', 'removeColumn']),
    onColumnsChange(columns) {
      const selected = []
      columns.forEach((column) => {
        selected.push(this.optionalColumns.find((item) => item.id === column))
        const newColumn = this.optionalColumns.find(
          (item) => item.id === column
        )
        const notExists = this.tableColumns.indexOf(newColumn) === -1
        if (notExists) {
          this.addColumn(newColumn)
        }
      })
      const dif = this.optionalColumns.filter(
        (item) => !selected.includes(item)
      )
      dif.forEach((item) => {
        this.removeColumn(item.label)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-column {
  min-height: 50px;
}
.search-filters {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  background-color: #fff;

  .columns {
    padding: 0px 15px;
    border-bottom: 1px solid #DFE2E3;
    margin-left: 0;
    margin-right: 0;
    position: relative;
    align-items: center;
  }
}

.reset-button {
  position: absolute;
  cursor: pointer;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);

  &:after {
    content: '';
    position: absolute;
    left: -12px;
    top: 5px;
    width: 1px;
    height: 19px;
    background: #d7d7d7;
  }

  button {
    background: transparent;
    border: 0;
    height: 26px;
    width: 26px;
    padding: 0;
    border-radius: 3px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;

    svg {
      margin-right: 1px;
    }
  }
}
</style>
