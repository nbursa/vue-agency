<template lang="pug">
  .create-shift--wrapper(
    @mouseover="() => this.displaySplit = true" @mouseout="() => this.displaySplit = false"
    )
      .badge(
        v-if="shift && shift.showBadge && !editable"
        v-tooltip.right-end="$t('tooltips.job_submit.crossover')"
        )
            span +1
      .shift-row(:key="1")
        .create-shift(
          @click="selectShift" 
          :class="[(selectable) && 'selectable', (active) && 'active', (bordered) && 'bordered', (!editable) && 'disabled' ]"
          )
          .columns
            .column(:class="{'is-6': editable,'pl-0':!bordered, 'is-4': !editable}")
              svgicon.shift-icon(width="20px" height="20px" v-if="icons" name="__submit-job/clock-icon" )
              simple-tree-select(
              :light="!bordered"  
              :value="[from]"
              :items="times"
              optionName="from"
              :multiple="false"
              @input="onUpdate"
              :isDisabled="!editable"
              :normalizer="decorateDate"
              )
            .column.pl-0(:class="{'is-6': editable, 'is-3': !editable}")
              span.text-label {{ $t("jobs_submit.job_create_shift_to") }}
              simple-tree-select(
                :light="!bordered"
                :value="[to]"
                :items="times"
                optionName="to"
                :multiple="false"
                @input="onUpdate"
                :isDisabled="!editable"
                :normalizer="decorateDate"
                ) 
            .column.is-4(v-if="!editable")
              svgicon.shift-icon( width="20px" height="20px" v-if="icons" name="__submit-job/client-icon" )
              base-input.new-layout(
                :class="{'light' : !bordered}"
                @input="onUpdate"
                :disabled="!editable"
                optionName="positions" 
                inputType="number" 
                :value="positions")  
          .columns(v-if="editable")
            .column.is-6(:class="{'pl-0':!bordered}")
              svgicon.shift-icon(width="20px" height="20px" v-if="icons" name="__submit-job/client-icon" )
              base-input.new-layout(
                :class="{'light' : !bordered}"
                @input="onUpdate"
                :disabled="!editable"
                optionName="positions" 
                inputType="number" 
                :value="positions")  
            .column.is-6.is-v-center.pl-0
              span {{ $t("jobs_submit.job_create_shift_position") }}  
      .split-remove-wrap(:key="0" v-if="selectable && displaySplit")
          .split-shift(v-if="selectable && displaySplit && (!shift.childId && !shift.parentId)" @click="onSplitClick")
              svgicon.shift-icon(width="20px" height="20px" name="__submit-job/add-rounded" color="#856FF9")  
          .remove-shift(v-if="selectable && displaySplit" @click="onRemoveShiftClick")
              svgicon.shift-icon(width="20px" height="20px" name="__submit-job/cancel-light-rounded")       
</template>
<script>
import SimpleTreeSelect from './SimpleTreeSelect'
import { getIncrementTimeOptions } from '@/components/submit-job/timeOptions'
import DateTimeUtils from '@/utils/dateUtils.js'
import '@/compiled-icons/__submit-job'

export default {
  components: { SimpleTreeSelect },
  props: {
    shift: {
      type: Object,
      required: false,
      default: () => {}
    },
    from: {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    },
    positions: {
      type: String,
      required: true,
      default: '1'
    },
    onUpdate: {
      type: Function,
      required: false,
      default: () => false
    },
    icons: {
      type: Boolean,
      required: false,
      default: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    },
    onSelect: {
      type: Function,
      required: false,
      default: () => false
    },
    bordered: {
      type: Boolean,
      required: false,
      default: false
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    onSplitClickAction: {
      type: Function,
      required: false,
      default: () => false
    },
    removeShift: {
      type: Function,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
      times: getIncrementTimeOptions(),
      displaySplit: false
    }
  },
  computed: {
    shiftsArray() {
      if (this.shift.child) return [this.shift, this.shift.child]
      return [this.shift]
    }
  },
  methods: {
    selectShift() {
      if (this.selectable) {
        const type = !this.active ? 'add' : 'remove'
        this.onSelect(this.shift, type)
      }
    },
    onSplitClick() {
      this.onSplitClickAction(this.shift)
    },
    onRemoveShiftClick() {
      this.onSelect(this.shift, 'remove')
      this.removeShift(this.shift.id)
    },
    decorateDate: function (item) {
      let formatTime =
        this.$localization && this.$localization.timeFormat
          ? DateTimeUtils.getFormattedTime(item.label)
          : item.label
      return {
        id: item.id,
        label: formatTime
      }
    }
  }
}
</script>
<style lang="stylus">
.pl-0 {
  padding-left: 0
}

.badge {
  position: absolute;
  background-color: #856ff9;
  color: #fff;
  border-radius: 16px;
  text-align: center;
  font-size: 10px;
  height: 20px;
  border: 2px solid #fff;
  display: flex;
  padding: 0 4px;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  font-weight: 600;
  margin-top: -8px;
  }

.create-shift--wrapper {
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  .is-v-center {
    align-items: center
  }
  .is-4 {
    min-width: 150px;
    }
  .is-3 {
    min-width: 110px
    }
  .split-remove-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    max-width: 455px;
    margin-left: 10px;
    align-self: center;
  }
  .split-shift {
    cursor: pointer;
  }
  // .split-shift {
  //   margin-top: 10px;
  //   padding: 0 10px;
  //   border: .5px dashed #dcdcdc;
  //   border-radius: 10px;
  //   max-width: 400px
  //   margin-left: 12px;
  //   cursor: pointer;
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: center;
  //   height: 64px;
  //   align-items: center;
  //   h4 {
  //     color: #856FF9
  //     margin-left: 7px;
  //   }
  // }
  .remove-shift {
    // margin-left: 15px;
    cursor: pointer;
  }
  .shift-row {
    max-width: 470px;
    display: flex;
    flex-direction: row;
    align-items: center
    .create-shift {
      // padding: 0 10px;
      &.selectable {
        cursor: pointer;
      }
      .shift-icon {
        // height: 20px!important;
        // width: 20px!important;
        align-self: center;
        margin-right 10px;
        color: #AFAFAF;
      }
      &.bordered {
        border: .5px solid #DCDCDC;
        border-radius: 10px;
        margin-left: 12px;
        min-width: 295px;
        &:hover {
          border: .5px solid #888;
          }
      }
      &.disabled {
        max-width: 420px;
        min-width: 420px;
      }
      &.active {
        border: 3px solid #856FF9;
        border-radius: 10px;
        &:hover {
          border: 3px solid #BFB4F9;
        }
      }
      .column {
        display: flex;
      }
      .text-label {
          line-height: 38px;
          margin-right: 10px;
        }
        input {
          // border: none!important;
          max-width: 95px;
          &.base-input--disabled {
            background: #f2f2f2!important
          }
        }
      }
  }
}
</style>
