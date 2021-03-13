<template lang="pug">
  div.scheduler-cont(:class="`is-${interval}`")
    scheduler-controls(
      @scheduler-control-event="changeDate"
      @scheduler-control-now="init"
      @scheduler-control-interval="changeInterval"
      :date="date"
      :dateRange="dateRange"
      :interval="interval"
      :filterComponent="filterComponent"
      :namespace="namespace"
    )
    div.scheduler
      scheduler-header(
        :date="date"
        :interval="interval"
        :options="options"
        :headerDays="headerDays"
        :currentWeekday="currentWeekday"
        :loadingStatus="loadingStatus"
        @scheduler-header-date="changeDate"
      )
      perfect-scrollbar.scheduler__body(ref="vBarContainer" @ps-y-reach-end="vBarHookScroll")
        div(v-for="(row, index) in generatedSchedule")
          schedule-row(
            :rowData="row"
            :rowIndex="index"
            :selectedCell="selectedCell"
            :namespace="namespace"
            :interval="interval",
          )
      transition(name="fade")
        div.scheduler__body--loader(v-show="loadingStatus")
          half-circle-spinner.spinner(
            :animation-duration="800"
            :size="50"
            color="#4f7dff"
          )
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex"
import { HalfCircleSpinner } from "epic-spinners"
import { DateTime, Info, Interval } from "luxon"
import { debounce } from "lodash"
import vueBarLazyLoad from "@/mixins/vueBarLazyLoad"
import SchedulerControls from "./VSchedulerControls"
import SchedulerHeader from "./VSchedulerHeader"
import ScheduleRow from "./VScheduleRow"
import SchedulerCollection from "./SchedulerCollection"
import Scheduler from "./Scheduler"

export default SchedulerCollection.extend({
  components: {
    ScheduleRow,
    SchedulerHeader,
    SchedulerControls,
    HalfCircleSpinner
  },
  mixins: [vueBarLazyLoad],
  props: {
    namespace: {
      type: String,
      required: true,
      default: ""
    },
    schedule: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    cellModule: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {
          headerTitle: "Scheduler"
        }
      }
    },
    searchParams: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    filterComponent: {
      type: Object,
      required: true,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      dt: null,
      date: null, // Source of truth date
      scheduler: null, // scheduler instance
      computedDays: [],
      generatedSchedule: [],
      interval: "week",
      dateRange: {
        start: null,
        end: null
      }
    }
  },
  computed: {
    ...mapState({
      loadingStatus(state, getter) {
        return state[this.namespace].status
      },
      selectedCell(state) {
        return state[this.namespace].scheduler.selected || {}
      },
      locale: function() {
        if (this.$i18n.locale === 'de_un') {
          return 'de'
        }
        return this.$i18n.locale
      }
    }),
    headerDays() {
      let daysFormated = this.days.map(day => {
        return {
          dayName: Info.weekdays("short", { locale: this.locale })[day.date.weekday - 1],
          smallDate: this.getSmallDate(day.date),
          monthDay: day.date.toFormat("dd"),
          fullDate: day.date.toFormat(this.$localization.dateFormat), // iterated => luxon date object prop that returns day num
          isWeekend: ["Sat", "Sun"].includes(Info.weekdays("short")[day.date.weekday - 1]) ? true : false
        }
      })
      return daysFormated
    },
    currentWeekday() {
      return DateTime.local().toFormat(this.$localization.dateFormat)
    }
  },
  watch: {
    date: {
      handler: function() {
        this.fillScheduler()
      },
      deep: true
    },
    schedule: {
      handler: function(data) {
        this.generateSchedule()
      },
      deep: true
    },
    interval: {
      handler: function() {
        this.fillScheduler()
      }
    }
  },
  created() {
    this.init()
    this.scheduler = new Scheduler(this.days, this.date, this.interval)
  },
  methods: {
    ...mapActions({
      setInterval(dispatch, payload) {
        return dispatch(
          this.namespace + "/scheduler/setInterval",
          payload
        )
      }
    }),
    init() {
      this.dt = DateTime.local()
      let { day, month, year } = this.dt
      this.date = {
        day,
        month,
        year
      }
    },
    changeDate(payload) {
      let { day, month, year } = payload.date
      this.date = {
        day,
        month,
        year
      }
    },
    changeInterval(payload) {
      let { newInterval } = payload
      this.setInterval(newInterval)
      this.interval = newInterval
    },
    generateDays() {
      return new Promise((resolve, reject) => {
        this.collectionInit()
        const daysInWeek = 7
        let count = 0
        let _collection = []
        let initialDate = DateTime.fromObject(this.date)
        let daysInInterval =
          this.interval === "day" ? 1 : this.interval === "month" ? initialDate.daysInMonth : daysInWeek
        let rangeStart = initialDate.startOf(this.interval)
        let rangeEnd =  initialDate.endOf(this.interval)
        count = 0
        do {
          this.add({
            date: rangeStart.plus({ days: count }),
            sqlDate: rangeStart.plus({ days: count }).toSQLDate()
          })
          count++
        } while (count < daysInInterval)
        this.dateRange = {
          start: rangeStart,
          end: rangeEnd
        }
        resolve({})
      })
    },
    generateSchedule() {
      let _intSchedule = [...this.schedule]
      let _newSchedule = _intSchedule.map(item => {
        let _timetable = [...item.timetable]
        let _days = [...this.days]
        return {
          ...item,
          timetable: this.order(_timetable, _days)
        }
      })
      this.generatedSchedule = _newSchedule
    },
    fillScheduler() {
      this.generateDays().then(() => {
        this.generateSchedule()
        this.$emit("scheduler:date-changed", { range: this.dateRange })
      })
    },
    vBarScrollCallback() {
      this.$emit("scheduler:page-changed")
    },
    getSmallDate(date) {
      return this.$localization.dateFormat === "dd.MM.yyyy." ? date.toFormat("dd.MM.") : date.toFormat("MM/dd") 
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/components/Scheduler';
</style>
