<template lang="pug">
div.v-table-content
  div.v-table-content__loader(v-show="isLoading")
    half-circle-spinner(
      :animation-duration="1500"
      :size="50"
      :color="$colorMap.primary"
      )

  div.table
    .table__header
      div.table__header--checkbox(v-if="hasCheckbox" @click="selectAll ? unCheckAllItems() : getAllItems()")
        base-checkbox.table__checkbox(v-model="selectAll")
      div.table__header--label(
        v-for="column in tableColumns"
        v-show="column.hideCell ? !hidden.has(column.hideCell) : true"
        :key="column.id"
        :class="tableHeaderSorter(column)"
        :style="{ flex: column.width }"
        @click="sortBy(column.label)"
      ) 
        span {{ $t(column.label) }} 
        span.arrows(
          v-if="sortableColumns.includes(column.label) && column.label !== selectedSorter"
        )
    .table__body
      v-table-item(
        v-for="(item, index) in data"
        :item="item"
        :key="index"
        :columns="tableColumns"
        :hidden="hidden"
        :isSelected="false"
        :hasCheckbox="hasCheckbox"
        :namespace="type"
        :selectType="selectType"
      )
      div.table__empty(v-if="data.length === 0 && !isLoading")
        | {{emptyMsg}}
</template>

<script>
import VTableItem from './VTableItem.vue'
import { mapActions, mapState } from 'vuex'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  components: {
    VTableItem,
    HalfCircleSpinner
  },
  props: {
    emptyMsg: {
      type: String,
      required: false,
      default() {
        return this.$t('global.empty_table_msg')
      }
    },
    type: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    selectType: {
      type: String,
      required: false,
      default: 'single'
    },
    hasId: {
      type: Boolean,
      required: false,
      default: false
    },
    namespace: {
      type: String,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      isChecked: false,
      isSelected: false,
      selectAll: false,
      label: '',
      order: 'asc',
      sortableColumns: [
        'jobs.table_column_1',
        'jobs.table_column_3',
        'jobs.table_column_4',
        'jobs.table_column_id',
        'candidates.table_column_1'
      ]
    }
  },
  computed: {
    ...mapState({
      state(state) {
        return state[this.type]
      },
      hidden(state, getters) {
        return getters[this.type + '/hidden']
      },
      checkedLength(state, getters) {
        return getters[this.type + '/checkedLength']
      },
      searchParams(state) {
        return this.namespace ? state[this.namespace].search.params : {}
      },
      tableColumns(state, getters) {
        return getters[this.type + '/getColumns']
      }
    }),
    ...mapState('shifts/table', ['checked']),
    hasCheckbox: function () {
      return this.selectType === 'multi'
    },
    cellNumber: function () {
      return this.columns.length
    },
    sortingCriteria: function () {
      if (this.searchParams.orderBy && this.searchParams.orderBy !== 'ID') {
        return this.searchParams.orderBy
      } else if (this.searchParams.orderByRelation) {
        return this.searchParams.orderByRelation
      }
      return ''
    },
    selectedSorter: function () {
      if (this.searchParams.orderBy === 'ID') {
        return ''
      }
      return this.label
    }
  },
  watch: {
    checkedLength: function (val) {
      if (val === 0) {
        this.selectAll = false
      }
    },
    sortingCriteria: function (val) {
      if (!val || val === 'ID') {
        this.label = ''
        this.order = ''
      }
    },
    columns: {
      deep: true,
      handler: 'setColumns',
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      setColumns(dispatch, columns) {
        return dispatch(this.type + '/setColumns', columns)
      }
    }),
    ...mapActions({
      updateSearchParams(dispatch, payload) {
        return dispatch(this.namespace + '/search/updateSearchParams', payload)
      }
    }),
    sortBy(column) {
      if (this.label === column) {
        this.order === 'asc' ? (this.order = 'desc') : (this.order = 'asc')
      } else {
        this.order = 'asc'
      }
      this.label = column
      switch (column) {
        case 'jobs.table_column_1':
          this.updateParams('start_time', this.order)
          break
        case 'jobs.table_column_3':
          this.updateParams('clients:client_id|clients.name', this.order)
          break
        case 'jobs.table_column_4':
          this.updateParams('users.first_name,last_name', this.order)
          break
        case 'jobs.table_column_id':
          this.updateParams('id', this.order)
          break
        case 'candidates.table_column_1':
          this.updateParams('users.first_name,last_name', this.order)
          break
        default:
          this.label = ''
          return
      }
    },
    updateParams(criteria, order) {
      if (
        ['users.first_name', 'users.first_name,last_name'].includes(criteria)
      ) {
        return this.updateSearchParams({
          sortBy: order,
          orderBy: null,
          orderByRelation: criteria
        })
      }
      this.updateSearchParams({
        sortBy: order,
        orderByRelation: null,
        orderBy: criteria
      })
    },
    getAllItems() {
      if (this.type === 'jobSubmission/table') {
        this.checkAllItems(this.$props.data)
      } else if (this.type === 'shifts/table') {
        this.getShifts({
          response_type: 'all',
          client_id: this.$route.query['client_id']
        })
          .then((res) => {
            this.checkAllItems(res)
          })
          .catch((e) => {
            console.log('error ', e)
          })
      }
      return
    },
    ...mapActions('shifts', ['getShifts']),
    ...mapActions({
      checkAllItems(dispatch, payload) {
        return dispatch(this.type + '/checkAllItems', payload)
      },
      unCheckAllItems(dispatch) {
        return dispatch(this.type + '/clearCheckedItems')
      }
    }),
    tableHeaderSorter: function (column) {
      return {
        sortable: this.sortableColumns.includes(column.label),
        active: column.label === this.selectedSorter,
        asc:
          column.label === this.selectedSorter &&
          this.searchParams.sortBy === 'asc',
        desc:
          column.label === this.selectedSorter &&
          this.searchParams.sortBy === 'desc'
      }
    }
  }
}
</script>
<style lang="stylus">

@import '~@/assets/styles/global/variables';

.v-table-content {
  position: relative;
  margin-left: 0 !important;
  margin-right: 0 !important;

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 400px;
    background-color: rgba(white, 0.75);
    pointer-events: none;
    z-index: 1;
  }
}

.table {
  background-color: transparent;
  margin-left: 15px;
  margin-right: 15px;
  user-select: none;

  &__header {
    display: flex;

    &--label {
      position: relative;
      color: $gray;
      flex: 1;
      align-self: center;
      font-size: 0.875rem;
      font-weight: bold;
      line-height: 1.188rem;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 0 10px;

      @media (max-width: $display-small-desktop) {
        padding: 0 5px;
      }

      &.sortable {
        cursor: pointer;
        transition: color 0.25s ease-in-out;

        &:hover {
          color: $primary;

          .arrows {
            color: $primary;
          }
        }
      }

      &.active {
        color: $primary;
      }

      &.asc {
        &:after {
          content: '';
          display: inline-block;
          margin-left: 10px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid $primary;
        }
      }

      &.desc {
        &:after {
          content: '';
          display: inline-block;
          margin-left: 10px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid $primary;
        }
      }
    }

    &--checkbox {
      align-self: center;
      cursor: pointer;

      .table__checkbox {
        cursor: pointer;
      }
    }
  }

  .arrows {
    position: relative;
    margin-left: 15px;
    color: #999999;
    transition: color 0.25s ease-in-out;

    &:before {
      position: absolute;
      right: 0;
      top: 3px;
      content: '';
      display: inline-block;
      margin-left: 10px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid;
    }

    &:after {
      position: absolute;
      right: 0;
      bottom: 3px;
      content: '';
      display: inline-block;
      margin-left: 10px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid;
    }
  }

  &__empty {
    margin: 20px;
    display: flex;
    height: 80px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
  }

  &__checkbox {
    margin-left: 10px;
    margin-right: 10px;
  }

  &__row {
    display: flex;
    min-height: 40px;
    border-radius: 3px;
    background-color: $white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
    border: 1px solid transparent;
    transition: border 0.3s ease;

    &:hover {
      cursor: pointer;
    }

    &--no-select {
      &:hover {
        cursor: default;
      }
    }

    &--checkbox {
      align-self: center;
    }

    &--active {
      border-color: $lightBlue;
    }

    &--cell {
      flex: 1;
      align-self: center;
      color: $fontDark;
      font-size: 0.875rem;
      padding: 0 10px;
      word-break: break-word;

      @media (max-width: $display-small-desktop) {
        font-size: 13px;
        padding: 0 5px;
      }
    }
  }
}
</style>
