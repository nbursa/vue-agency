<template lang="pug">
.cell-box-wrapper
  .cell-box(
    @click="handleCellClick"
    :class="[ classApplied, {'is-loading': isLoading && isClicked} ]"
    )
    half-circle-spinner(
      class="spinner"
      v-if="isLoading && isClicked"
      :animation-duration="800"
      :size="45"
      color="#507DFF"
      )
    .cell-box__up.PLACEHOLDER-HOVER
      span.calendar__date {{ dayFormatted }}
      div.PLACEHOLDER-ADD(v-if="this.$route.name === 'candidate-details' && !this.payloadRender && isInPast") +

    .cell-box__down(v-if="payloadRender")
      component(
        :is="payloadRender.component"
        v-bind="payloadRender"
      )
      //- v-job-calendar-cell-stripes( v-bind="payloadRender" )
</template>
<script>
import _ from 'lodash'
import anime from 'animejs'

import { mapState } from 'vuex'
import { DateTime } from 'luxon'
import { HalfCircleSpinner } from 'epic-spinners'
export default {
  inject: ['namespace'],
  components: { HalfCircleSpinner },
  props: {
    day: {
      required: true,
      type: Object
    },
    isClicked: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      cellData(state) {
        return state[this.namespace].calendar.cellData
      }
    }),
    ...mapState(['isLoading']),
    /*
     * This is a complete payload, cell will be provided with
     */
    payload: function () {
      const { payload } = this.day
      return payload
    },
    /*
     * This is a part which should be rendered in cell template
     */
    payloadRender: function () {
      return _.pick(this.payload, ['render']).render
    },
    /*
     * Date represantion format, in cell
     */
    dayFormatted: function () {
      const { item } = this.day
      return item.toFormat('d')
    },
    /*
     * Checks if or not cell should be selected
     */
    isInPast: function() {
      const { item } = this.day
      return item.diffNow('days').days < -1
    },
    isSelected: function () {
      if (this.cellData) {
        const mappedItem = this.cellData.date
        return {
          'cell-box--is-highlighted': DateTime.fromISO(mappedItem).hasSame(
            this.day.item,
            'day'
          )
        }
      }
      return ''
    },
    /*
     * Checks if cell is selectable
     */
    notClickable: function () {
      const { className } = this.day.meta
      return className === 'tail' || className === 'head'
    },
    /*
     * Applies different classes base upon various meta data
     */
    classMeta: function () {
      let { meta, payload } = this.day
      let hasJobs = (payload.render || {}).count
      return {
        'cell-box--is-active': meta.className === 'normal',
        'cell-box--is-inactive': this.notClickable,
        'cell-box--is-today': meta.isToday || false,
        'cell-box--is-in-past': meta.isInPast || false,
        'cell-box--is-end-of-week': meta.isEndOfWeek && !hasJobs,
        'cell-box--is-saturday': meta.isSaturday && !hasJobs,
        'cell-box--is-affected': meta.isAffected || null,
        'cell-box--is-highlighted': meta.isHighlighted || null
      }
    },
    classApplied: function () {
      return Object.assign(this.classMeta, this.isSelected)
    }
  },
  methods: {
    handleCellClick() {
      if (this.notClickable) {
        return
      }
      this.$emit('cell-selected', this.day)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';

$cell-highlight-color = linear-gradient(225deg, #8DB0FF 0%, $primary 100%)

$custom-border-color = rgba(#4a4a4a, 10%);

.cell-box-wrapper {
  &:hover {
    .PLACEHOLDER-ADD {
      opacity: 1;
    }
  }
}

.PLACEHOLDER-ADD
  width 20px
  height 20px
  border-radius 15px
  background-color #4b9ed1
  color white
  display flex
  justify-content center
  align-items center
  font-weight bold
  margin-left 5px
  opacity 0

.cell-box-wrapper {
  position: relative;
  padding-bottom: 100%;
  transition: all 200ms ease-in;
}

// Style corner cells BEGIN
.tile.is-ancestor:nth-child(3) {
  .is-parent:first-child > .tile.is-child {
    .cell-box {
      border-top-left-radius: 8px;
      border-left: 1px solid $custom-border-color;
      border-top: 1px solid $custom-border-color;
    }
  }

  .is-parent:last-child > .tile.is-child {
    .cell-box {
      border-top-right-radius: 8px;
      border-top: 1px solid $custom-border-color;
      border-right: 1px solid $custom-border-color;
    }
  }
}

.tile.is-ancestor:nth-last-child(1) {
  .is-parent:first-child > .tile.is-child {
    .cell-box {
      border-bottom-left-radius: 8px;
      border-bottom: 1px solid $custom-border-color;
      border-left: 1px solid $custom-border-color;
    }
  }

  .is-parent:last-child > .tile.is-child {
    .cell-box {
      border-bottom-right-radius: 8px;
      border-bottom: 1px solid $custom-border-color;
      border-right: 1px solid $custom-border-color;
    }
  }
}

// Style corner cells END
.cell-box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 0.3px solid rgba(#CBCBCB, 50%);
  padding: 9px 9px 8px 8px;
  color: grey;
  background-color: white;
  cursor: pointer;
  transition: all 200ms ease-in;

  @media (max-width: $display-small-desktop) {
    padding: 3px 9px 6px 8px;
  }

  &.is-loading:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(white, 80%);
  }

  .spinner {
    opacity: 0.6;
    position: absolute;
    top: 9px;
    right: 10px;
  }

  &:hover {
	  box-shadow: 0 0 12px 0 rgba(0,0,0,0.1);
    z-index: 6;
    border-radius: 10px;
    transform: scale(1.1)
    opacity: 1 !important;
  }

  &--is-active {
    opacity: 1;

    .cell-box__up {
      span.calendar__date {
        color: #555;
      }
    }
  }

  &--is-inactive {
    opacity: 0.4;

    .cell-box__up {
      span.calendar__date {
        color: grey;
      }
    }
  }

  &--is-today {
    z-index: 4;
    box-shadow: 0px 0px 0px 3px  #7FA3FF;
    transform: scale(1.1);
    border-radius: 10px;
    &:hover {
      box-shadow: 0px 0px 0px 3px  #7FA3FF;
    }
    span.calendar__date {
      // background: white;
      // box-shadow: 0 0 0px 7px white, 0 0 0 10px $primary;
    }
  }

  &--is-highlighted {
    background: $cell-highlight-color;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.1);
    z-index: 5;
    opacity: 1 !important;
    border-radius: 10px;
    transform: scale(1.1)

    span.calendar__date {
      // box-shadow: inset 0 0 40px 13px $primary, 0 0px 0px 10px $primary !important;
      // background-color: $primary !important;
      color: white !important;
    }
  }

  &--is-highlighted, &--is-today &__up {
    span.calendar__date {
      color: black;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      text-align: center;
      display: inline-block !important;
    }
  }

  &--is-end-of-week, &--is-saturday {
    .cell-box__up {
      span.calendar__date {
        color: #B3B3B3;
      }
    }
  }

  &--is-affected {
    // box-shadow 0px 0px 28px lighten(#888, 36%)
    // transform scale(0.98)
    transition: all 0.26s;
    z-index: 1;
    // color white
    font-weight: bold;
    // background-image linear-gradient(
    // to top right, white, #7FDBFF
    // )
  }

  // &--is-affected &__up
  // span.calendar__date
  // text-shadow 1px 1px 5px black
  &__up {
    flex: 1;
    margin-left: auto;

    span.calendar__date {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      margin-right: 10px;
      font-size: 24px;
    }
  }

  &__down {
    position: relative;
  }
}

.cell-box.cell-box--is-in-past {
  opacity: 0.5
  .cell-box__down {

  }
}
</style>
