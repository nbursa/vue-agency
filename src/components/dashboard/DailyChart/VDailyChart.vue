<template lang="pug">
  .dashboard-daily
    v-dashboard-card(:title="$t('dashboard.daily_title')")
      .dashboard-daily_picker(slot="controls")
        v-daily-chart-controls(
          :date="calcDate"
          @dashboard-controls:next="showNextDay",
          @dashboard-controls:prev="showPrevDay",
          @dashboard-controls:today="showToday"
        )
      .dashboard-daily_chart(slot="chart")
        v-no-data(v-if="totalSafe == 0")
        .columns.is-gapless.is-multiline(v-else)
          .column.is-one-third-desktop.dashboard-daily_doughnut
            v-daily-chart.dashboard-daily_chart(:chartData="chartData" :width="width" :height="height")
            div.dashboard-daily_doughnut--label
              p {{ $t("dashboard.all_workers") }}
              P {{totalSafe}}
          .column.is-half
            v-legend(:propData="{ data: workers, filter: serverDate }" :total="totalSafe")
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex"
import { DateTime, Info } from "luxon"
import { padStart } from "lodash"

import VDashboardCard from "../VDashboardCard.vue"
import VDailyChart from "./VDoughnut.vue"
import VDailyChartControls from "./VControls.vue"
import VLegend from "./VLegend.vue"
import VNoData from "../_shared/VNoData"

export default {
  components: {
    VDashboardCard,
    VDailyChart,
    VDailyChartControls,
    VLegend,
    VNoData
  },
  props: {
    user: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      width: 252,
      height: 252,
      localdt: null,
      date: {}
    }
  },
  computed: {
    ...mapState("dailyOverview", ["workers", "total"]),
    calcDate() {
      return DateTime.fromObject(this.date)
    },
    totalWorkers() {
      return Object.keys(this.workers).reduce((acc, key) => {
        acc += this.workers[key]
        return acc
      }, 0)
    },
    chartData() {
      return this.workers ? this.getWorkersByRole(this.user.role) : {}
    },
    serverDate() {
      const formatDate = `${this.date.year}-${padStart(
        this.date.month,
        2,
        "0"
      )}-${padStart(this.date.day, 2, "0")}`

      return formatDate
    },
    totalSafe() {
      return this.total || this.totalWorkers
    }
  },
  created() {
    this.initDate()
  },
  methods: {
    ...mapActions("dailyOverview", ["getAllWorkers"]),
    ...mapGetters("dailyOverview", ["getFormattedWorkers", "getFormattedClientWorkers"]),
    initDate() {
      this.localdt = DateTime.local()
      let { day, month, year } = this.localdt
      this.date = {
        day,
        month,
        year
      }
      this.getAllWorkers(this.serverDate)
    },
    showPrevDay() {
      const newDate = DateTime.fromObject({
        year: this.date.year,
        month: this.date.month,
        day: this.date.day
      }).minus({ day: 1 })
      const { day, month, year } = newDate
      this.date = {
        day: day,
        month: month,
        year: year
      }
      this.getAllWorkers(this.serverDate)
    },

    showNextDay() {
      const newDate = DateTime.fromObject({
        year: this.date.year,
        month: this.date.month,
        day: this.date.day
      }).plus({ day: 1 })
      const { day, month, year } = newDate
      this.date = {
        day: day,
        month: month,
        year: year
      }
      this.getAllWorkers(this.serverDate)
    },
    showToday() {
      let { day, month, year } = this.localdt
      this.date = {
        day,
        month,
        year
      }
      this.getAllWorkers(this.serverDate)
    },
    getWorkersByRole(role) {
      const workerSets = {
        "agency-admin": this.getFormattedWorkers,
        "client-admin": this.getFormattedClientWorkers
      }
      return workerSets[role]();
    }
  }
}
</script>

<style lang="stylus">
.dashboard-daily {
  .columns {
    justify-content: space-between;
  }

  &_picker {
    margin-bottom: 15px;
  }

  &_doughnut {
    position: relative;
    margin-left: 20px !important;

    &--label {
      position: absolute;
      left: 50%;
      top: 90px;
      transform: translate(-50%, 0);

      p:first-child {
        opacity: 0.5;
        color: #202123;
        font-size: 0.875em;
      }

      P:last-child {
        color: #202123;
        font-size: 2.25em;
      }
    }
  }

  #doughnut-chart {
    margin: 0 auto;
  }
}
</style>
