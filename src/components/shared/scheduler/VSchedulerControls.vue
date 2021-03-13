<template lang="pug">
.scheduler-controls
  .scheduler-controls__button-group
    button.button.is-small(
        @click="showPreviousMonth"
      )
      font-awesome-icon(:icon="icons.calPrev")
    button.button.is-small.is-outlined.now(style="pointer-events: none")
      span(style="min-width: 75px; display: inline-block") {{ printDate }}
    button.button.is-small(
        @click="showNextMonth"
      )
      font-awesome-icon(:icon="icons.calNext")
  .scheduler-controls__button-group
    button.button.is-small(
        v-if="interval ==='week'"
        @click="showPreviousWeek"
      )
      font-awesome-icon(:icon="icons.calPrev")
    button.button.is-small.is-outlined.now(
        @click="showNow"
      )
      span(v-if="interval === 'week'") {{ $t("scheduler.btt_now") }}
      span(v-else) {{ $t("scheduler.btt_now_month") }}
    button.button.is-small(
        v-if="interval ==='week'"
        @click="showNextWeek"
      )
      font-awesome-icon(:icon="icons.calNext")
  .scheduler-controls__button-group
    button.button.is-small.is-interval(
        :class="{'active': interval === 'day'}"
        @click="intervalMode('day')"
      )
      span {{$t("scheduler.btt_day")}}
    button.button.is-small.is-outlined.is-interval.now(
        :class="{'active': interval === 'week'}"
        @click="intervalMode('week')"
      )
      span {{$t("scheduler.btt_week")}}
    button.button.is-small.is-interval(
        :class="{'active': interval === 'month'}"
        @click="intervalMode('month')"
      )
      span {{$t("scheduler.btt_month")}}

  div(style="flex: 1")
  component.scheduler-controls__filter-group(
    v-if="filterComponent"
    :is="filterComponent"
    :date="date"
    :dateRange="dateRange"
    :namespace="namespace"
  )
</template>
<script>
import { DateTime, Info } from "luxon"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft"
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight"

export default {
  components: { FontAwesomeIcon },
  props: {
    interval: {
      type: String,
      required: false,
      default: "week"
    },
    date: {
      required: false,
      type: Object,
      default() {
        return {}
      }
    },
    dateRange: {
      required: false,
      type: Object,
      default() {
        return {}
      }
    },
    namespace: {
      type: String,
      required: true,
      default: ""
    },
    filterComponent: {
      type: Object,
      required:false,
      default() {
        return null
      },
    }
  },
  data() {
    return {
      scheduler: {
        fmtDate: {
          month: "long",
          year: "numeric"
        }
      },
      icons: {
        calPrev: faAngleLeft,
        calNext: faAngleRight
      }
    }
  },
  computed: {
    printDate() {
      return Info.months("short", { locale: this.locale })[this.date.month - 1]
    },
    locale: function() {
      if (this.$i18n.locale === 'de_un') {
        return 'de'
      }
      return this.$i18n.locale
    }
  },
  methods: {
    showNow() {
      this.$emit("scheduler-control-now")
    },
    showPreviousMonth() {
      let date = DateTime.fromObject(this.date).minus({month: 1})
      this.$emit("scheduler-control-event", { date })
    },
    showNextMonth() {
      let date = DateTime.fromObject(this.date).plus({month: 1})
      this.$emit("scheduler-control-event", { date })
    },
    showNextWeek() {
      let date =  DateTime.fromObject(this.date).startOf("week").plus({days: 7})
      this.$emit("scheduler-control-event", { date })

    },
    showPreviousWeek() {
      let date =  DateTime.fromObject(this.date).startOf("week").minus({days: 7})
      this.$emit("scheduler-control-event", { date })
    },
    intervalMode(newInterval) {
      this.$emit("scheduler-control-interval", {newInterval})
    }
  }
}
</script>
<style lang="stylus" scoped>
.scheduler-controls
  padding 12px 15px
  background-color #ffffff
  display flex
  margin-bottom 15px
  &__button-group
    padding-right 15px
    display flex
    align-items center
    button
      min-height 32px
      padding 5px 10px
      display inline-block
      border-radius 6px
      &:first-child
        border-top-right-radius 0
        border-bottom-right-radius 0
        border-right none
      &:last-child
        border-left none
        border-top-left-radius 0
        border-bottom-left-radius 0
      &.is-outlined
        border-left 0
        border-right 0
        border-radius 0
      span
        color #202123
        font-size 1rem
        line-height 1rem
      &.active
        span
          color white
        background-color $primary
      &.now
        border-right 1px solid rgb(219, 219, 219)
        border-left 1px solid rgb(219, 219, 219)
      &.is-interval 
        min-width 75px
  &__filter-group
    justify-self flex-end

</style>




