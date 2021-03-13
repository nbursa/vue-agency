<template lang="pug">
.section
  v-job-calendar-controls(
    :date="propDate"
    :cellFilter="cellFilter"
    @cal-controls:previous-month="showPreviousMonth"
    @cal-controls:next-month="showNextMonth"
    @cal-controls:today="showToday"
    )
  v-job-calendar-weekday-labels(:weekdays="weekdays")
  .tile.is-ancestor(v-for="week in weeks" :key="week[0].ts")
    .tile.is-parent.is-paddingless(v-for="( day, index ) in week")
      .tile.is-child
        v-job-calendar-cell(
          @cell-selected="cellSelected"
          :isClicked="+day.item === +eventItem"
          :day="day"
        )
</template>
<script>
import { DateTime, Info } from "luxon"
import VJobCalendarControls from "./VJobCalendarControls"
import VJobCalendarCell from "./VJobCalendarCell"
import VJobCalendarWeekdayLabels from "./VJobCalendarWeekdayLabels"
import CalendarCollection from "../classes/CalendarCollection.js"
import Calendar from "../classes/Calendar.js"
import { mapGetters } from "vuex"
export default CalendarCollection.extend({
  provide() {
    return { namespace: this.namespace }
  },
  props: {
    jobs: {
      type: Array,
      required: false,
      default() {
        return {}
      }
    },
    cellModule: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    cellFilter: {
      type: Boolean,
      required: false,
      default: false
    },
    namespace: {
      type: String,
      required: false,
      default: 'jobManagement'
    }
  },
  data() {
    return {
      dt: null,
      /*
      * Current date instance the calendar is based on
      */
      date: {},
      calendar: null, // This will be holding class instance
      computedDays: [],
      eventItem: null,
      monthRange: {
        start: null,
        end: null
      }
    }
  },

  components: {
    VJobCalendarControls,
    VJobCalendarCell,
    VJobCalendarWeekdayLabels
  },
  watch: {
    date: {
      handler: function() {
        this.refill()
      },
      deep: true
    },
    jobs: function(newJobs) {
      this.fillJobs(newJobs)
    }
  },

  created() {
    this.initialize()
    this.calendar = new Calendar(this.days, this.date)
    // this.refill() - not needed as date watcher fires on component creation anyway
  },

  methods: {
    refill() {
      this.computeDays().then(() => {
        this.$emit("date-changed", { range: this.monthRange })
      })
    },
    computeDays() {
      return new Promise((resolve, reject) => {
        this.init() // Empty out all days, before constructing new cell sheet

        let initial = DateTime.fromObject(this.date)
        let daysInMonth = initial.daysInMonth

        // Starting day of month
        const rngStart = initial.startOf("month")
        // keep in local state
        this.monthRange.start = rngStart
        // Ending day of month
        const rngEnd = initial.endOf("month")
        // keep in local state
        this.monthRange.end = rngEnd

        let cursor = 0
        let item

        /* Add current month's days */
        do {
          item = rngStart.plus({ days: cursor })
          this.add(item)
          cursor++
        } while (cursor < daysInMonth)

        /* Add previous month's days to start */
        cursor = 0
        if (+rngStart !== +rngStart.startOf("week")) {
          do {
            cursor++
            item = rngStart.minus({ days: cursor })
            this.head(item)
          } while (+item !== +item.startOf("week"))
        }

        /* Add tailing days to end */
        cursor = 0
        if (+rngEnd !== +rngEnd.endOf("week")) {
          do {
            cursor++
            item = rngEnd.plus({ days: cursor })
            this.tail(item)
          } while (+item !== +item.endOf("week"))
        }

        /* Instantiate Calendar class */
        this.calendar.days = this.days
        this.computedDays = this.days
        resolve(this.days)
      })
    },
    /*
     * Sets labels for jobs in currently selected cell, from getter
     * @hasJobsCount is a flag, that shows if jobs are present for this cell
     */
    updateCellContent(item, shouldUpdate) {
      if (shouldUpdate) {
        this.calendar.feedIntoCell(item, {
          render: {
            component: this.cellModule,
            statuses: this.nonZeroJobStatuses
          }
        })
      }
    },
    cellSelected({ item, meta, payload }) {
      /*
       * Store emitted item, so that we can find clicked cell
       * by comparing item (DateTime instances) values
       */
      this.eventItem = item
      /*
       * Emit event
       */
      this.$emit(
        "cell-selected",
        {
          item,
          meta,
          payload,
          cb: this.updateCellContent
        },
        this.monthRange
      )
    },
    initialize() {
      this.dt = DateTime.local()
      let { month, year } = this.dt
      this.date = {
        month,
        year
      }
    },

    showToday() {
      this.initialize()
    },

    showPreviousMonth() {
      if (--this.date.month === 0) {
        this.date.month = 12
        this.date.year--
      }
    },

    showNextMonth() {
      if (++this.date.month % 12 === 1) {
        this.date.month = 1
        this.date.year++
      }
    },
    fillJobs(arr) {
      if (arr) {
        arr.map(item => {
          const d = DateTime.fromISO(item.date)
          this.calendar.feedIntoCell(d, {
            render: {
              component: this.cellModule,
              data: item
            },
          })
        })
      }
    }
  },

  computed: {
    ...mapGetters("jobManagement/calendar", ["nonZeroJobStatuses"]),
    propDate() {
      return DateTime.fromObject(this.date)
    },

    weekdays() {
      return Info.weekdays("short", { locale: this.locale })
    },

    weeks() {
      let temporal = []
      for (let i = 0; i < this.computedDays.length; i += 7) {
        temporal.push(this.computedDays.slice(i, i + 7))
      }
      return temporal
    },
    locale: function() {
      if (this.$i18n.locale === 'de_un') {
        return 'de'
      }
      return this.$i18n.locale
    }
  }
})
</script>
 <style scoped lang="stylus">
.section
  padding-top 0px
</style>
