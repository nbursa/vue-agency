<template lang="pug">
  div.schedule-row-container(:class="`is-${interval}`")
    div.schedule-row
      div.schedule-row__header
        component(
          v-if="rowData.header._component"
          :is="rowData.header._component"
          :data="rowData.header.headerData"
        )
      div.schedule-row__content(v-for="cell in cells" v-if="cells")
        div.dymic-size-on-date-placeholder(style="width: 100%")
          component(
            v-if="cell.payload"
            :is="cell.payload._component"
            :data="cell.payload.cellData"
            :schedulerInterval="interval"
            :class="{'selected': isSelected(cell)}"
            @click.native="selectCell({header: rowData.header.headerData, payload: cell.payload.cellData, cellInfo: { type: cell.payload._cellType, storeModuleName: cell.payload._storeModuleName, date: cell.sqlDate, rowIndex }})"
          )
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    rowData: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    rowIndex: {
      type: Number,
      required: false,
      default: 0
    },
    daysShown: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    namespace: {
      type: String,
      required: false,
      default: ""
    },
    interval: {
      type: String,
      required: true,
      default: "week"
    },
    selectedCell: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    cells() {
      return this.rowData.timetable
    }
  },
  methods: {
    ...mapActions({
      setSelected(dispatch, payload) {
        return dispatch(`${this.namespace}/scheduler/setSelectedCell`, payload)
      }
    }),
    selectCell(payload) {
      this.setSelected(payload)
    },
    isSelected(cell) {
      if(this.selectedCell.cellInfo) {
        let { date, rowIndex } = this.selectedCell.cellInfo
        return cell.sqlDate === date && this.rowIndex === rowIndex
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.schedule-row-container
  .schedule-row
    border-bottom 1px solid #CBCBCB
    border-right 1px solid #CBCBCB
    min-height 60px
    display flex
    flex-flow row
    flex-wrap nowrap
    &__header
      position relative
      flex 1
      min-width 200px
      max-width 200px
      padding 10px
      &:after
        right -1px
        top 0
        position absolute
        height 100%
        content ""
        border-left 1px solid #CBCBCB
    &__content
      position relative
      flex 1
      width 0 // forces item width to rely only on flexbox
      min-width 0 //forces firefox to do the same

      //multicell spread affecting
      display flex
      align-items center
      //

      padding 0px 5px
      word-break break-all
      transition all 200ms ease-in
      &:after
        right -1px
        top 0
        position absolute
        height 100%
        content ""
        border-left 1px solid #CBCBCB
  &.is-week
    .schedule-row
      &__content
        &:after
          border-left none
  &.is-day
    .schedule-row
      border none
      min-height: 78px;
      &__header 
        border-bottom 1px solid #CBCBCB
      &__content
        &:after
          border-left none

</style>
