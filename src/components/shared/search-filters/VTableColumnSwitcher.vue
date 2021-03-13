<template lang="pug">
  div.table-column-switch(:class="[options.customClass]" v-if="visibility")
    treeselect(
      class="column-filters"
      v-model="selectedColumns" 
      :multiple="true" 
      :options="translatedOptions"
      :placeholder="placeholder"
      :clearable="true"
      :normalizer="normalizer"
      :searchable="false"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Treeselect from '@riophae/vue-treeselect'

export default {
  inject: ['namespace'],
  components: {
    Treeselect
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    visibility: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      tableColumns(state, getters) {
        return getters[this.namespace + '/table' + '/getColumns']
      }
    }),
    translatedOptions() {
      return this.options.optionalColumns.map((column) => {
        return {
          ...column,
          label: this.$t(column.label)
        }
      })
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
    placeholder: function () {
      return !this.selectedColumns.length
        ? this.$t(this.options.selectorPlaceholder)
        : ''
    }
  },
  methods: {
    ...mapActions({
      addColumn(dispatch, payload) {
        if (!this.namespace) {
          throw new Error('Namespace not set')
        }
        return dispatch(this.namespace + '/table/addColumn', payload)
      },
      removeColumn(dispatch, payload) {
        if (!this.namespace) {
          throw new Error('Namespace not set')
        }
        return dispatch(this.namespace + '/table/removeColumn', payload)
      }
    }),
    normalizer: (item) => {
      return {
        id: item.id,
        label: item.label
      }
    },
    onColumnsChange(columns) {
      let { optionalColumns } = this.options
      const selected = []
      columns.forEach((column) => {
        selected.push(optionalColumns.find((item) => item.id === column))
        const newColumn = optionalColumns.find((item) => item.id === column)
        const notExists = this.tableColumns.indexOf(newColumn) === -1
        if (notExists) {
          this.addColumn(newColumn)
        }
      })
      const dif = optionalColumns.filter((item) => !selected.includes(item))
      dif.forEach((item) => {
        this.removeColumn(item.label)
      })
    }
  }
}
</script>
<style lang="stylus">
.margin-right {
  margin-right: 50px !important;
}
.table-column-switch {
  margin 0 !important
  padding .75em 3em .75em 0
  display flex
  .vue-treeselect {
    &__control {
      background rgba(26,57,74,0.06)
      border none
      min-width: 300px;
      width: auto;
      height: 32px;
      .vue-treeselect__value-container {
        &:after {
          position absolute
          top 7px
          left 5px
          opacity .65
        }
      }
    }
    &__menu-container {
      .vue-treeselect__menu {
        box-shadow 0 2px 10px 0 rgba(0,0,0,0.09) !important
        .vue-treeselect__checkbox {
          width 17px
          height 17px
          border-color #5C69FF
          margin auto 16px
          &--checked {
            background #5C69FF
            .vue-treeselect__check-mark {
              transform scale(1.3)
              left 4px
              top 3px
            }
          }
        }
        .vue-treeselect__label {
          color #202123
          font-family Aileron//"Nunito Sans"
          font-size 16px
          letter-spacing 0
          padding-left 25px
        }
      }

    }
    &__multi-value {
      margin-bottom 0px
      .vue-treeselect__placeholder {
        display flex
        align-items center
        line-height: 2.1
        color #868686
        font 400 13.3333px Arial
      }
    }
    &__value-container {
      width auto
    }
    &__multi-value-item-container {
      padding-top 3px
    }
    &--has-value {
      .vue-treeselect__control {
        background-color #f2f4f5
        border #f2f4f5 !important
        border-radius 5px
        &:hover {
          background-color #f2f4f5
        }
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.table-column-switch {
  .column-filters {
    position relative
    min-height auto
    margin auto 0 auto auto
    display inline-flex
    min-width 300px
    flex 1
    background none !important
    margin-left 20px
    >>> .vue-treeselect__control {
      border-radius 3px
    }
  }
}
</style>
