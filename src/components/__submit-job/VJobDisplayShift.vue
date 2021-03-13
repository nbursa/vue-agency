<template lang="pug">
  .shift-item--wrapper(
    @mouseover="() => this.hover = true" 
    @mouseout="() => this.hover = false"
    @click="selectShift" 
    :class="{'selectable' : !selected, 'selected' : selected }")
    .column.is-7
      svgicon.shift-icon( name="__submit-job/clock-icon" width="20px" height="20px" :class="{'selected' : selected}")
      h4 {{from}} - {{to}}
    .column.is-4
      svgicon.shift-icon( name="__submit-job/client-icon" width="20px" height="20px"  :class="{'selected' : selected}")
      h4 {{shift.positions}} {{ $t("jobs_submit.job_display_shift_position") }}
    .column.is-1
      //- svgicon.candidate-icon(width="20px" height="16px" name="__submit-job/eye" color="##22CB87" v-if="hover" )
      .badge.mt-0(
        v-if="shift && shift.showBadge "
        v-tooltip.right-end="$t('tooltips.job_submit.crossover')"
        )
            span +1    
</template>
<script>
import DateTimeUtils from '@/utils/dateUtils.js'
export default {
  props: {
    shift: {
      type: Object,
      required: true,
      default: () => {}
    },
    times: {
      type: [Array, Object],
      required: true
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    onSelect: {
      required: false,
      type: Function,
      default: () => false
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    from() {
      return DateTimeUtils.getFormattedTime(
        this.times.filter(({ id }) => id === this.shift.from)[0].label
      )
    },
    to() {
      return DateTimeUtils.getFormattedTime(
        this.times.filter(({ id }) => id === this.shift.to)[0].label
      )
    }
  },

  methods: {
    selectShift() {
      const type = !this.selected ? 'add' : 'remove'
      this.onSelect(this.shift, type)
    }
  }
}
</script>
<style lang="stylus" scoped>
.mt-0 {
  margin-top: 0!important
  }
.shift-item {
  &--wrapper {
     display: flex;
     padding: 0 10px;
     border: .5px solid #DCDCDC;
     border-radius: 10px;
     margin-left: 12px;
     max-width: 412px;
     height: 54px;
     margin-bottom: 30px!important
     &.selected {
       background: #856FF9;
       color: #ffffff
     }
     .shift-icon {
       margin-right: 15px;
       color: #afafaf;
       &.selected {
         color: #ffffff
       }
     }
     .column {
       display flex;
       align-items: center
     }
     &.selectable {
      cursor: pointer;
    }
  }
}
</style>
