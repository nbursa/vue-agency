<template lang="pug">
  v-dashboard-card(:title="$t('dashboard.monthly_title')")
    .date-picker(slot="controls")
      v-date-controls(:selected-date="selectedDate" @next="nextMonth" @prev="previousMonth" @today="showToday")
    .chart(slot="chart")
      v-no-data(v-if="getSanatizedJobs.length == 0")
      v-shifts-chart(:width="lineWidth" :height="chartHeight" :chartData="chartData" :options="options" v-else)
</template>


<script>
import { mapActions, mapState, mapGetters } from "vuex"

import CMainContainer from "@/components/shared/triptih/CMainContainer.vue"
import VDashboardCard from "../VDashboardCard.vue"
import VShiftsChart from "./VLineChart"
import VDateControls from "./VDateControls"
import { DateTime, Interval } from "luxon"
import DateTimeUtils from "@/utils/dateUtils.js"
import VNoData from "../_shared/VNoData"
import { app } from "../../../main.js"

const opts = {
  responsive: true,
  maintainAspectRatio: true,
  legend: { display: false },
  tooltips: {
    callbacks: {
      title: () => {
        return ""
      },
      label: (tooltipItem, data) => {
        const txt = tooltipItem.yLabel > 1 ? app.$t("dashboard.jobs") : app.$t("dashboard.job")
        return ` ${
          tooltipItem.yLabel
        } ${txt}  |  ${DateTimeUtils.getDateWithMonthName(
          data.labels[tooltipItem.index]
        )}`
      }
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          callback: (value, index, values) => {
            return value.split(/-/g)[2]
          }
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: true
        },
        ticks: {
          callback: function(value, index, values) {
            if (value % 1 == 0) {
              return value
            }
          }
        }
      }
    ]
  }
}

export default {
  components: {
    CMainContainer,
    VDashboardCard,
    VShiftsChart,
    VDateControls,
    VNoData
  },
  data() {
    return {
      namespace: "dashboard",
      selectedDate: DateTime.local().setLocale(this.locale),
      lineWidth: 800,
      chartHeight: 275,
      chartData: null,
      options: opts
    }
  },
  computed: {
    ...mapGetters("jobManagement/calendar", ["getSanatizedJobs"]),
    locale: function() {
      return this.$i18n.locale === 'de_un' ? 'de' : this.$i18n.locale
    }
  },
  watch: {
    getSanatizedJobs: function() {
      let data = this.getSanatizedJobs.map(item => item.jobs)
      if (data.length > 0) {
        data.push(0)
      }
      let labels = this.getSanatizedJobs.map(item => item.date)

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: this.$t("jobs.graph_title"),
            backgroundColor: "rgb(35, 85, 130, 0.2)",
            borderColor: "rgb(35, 85, 130)",
            data: data
          }
        ]
      }
    },
    selectedDate: function(range) {
      const date_from = DateTime.fromISO(range, {locale: this.locale})
        .startOf("month")
        .toFormat("yyyy-LL-dd")

      const date_to = DateTime.fromISO(range, {locale: this.locale})
        .endOf("month")
        .toFormat("yyyy-LL-dd")

      const params = {
        date_from,
        date_to
      }

      this.fetchJobs({
        range: { ...params }
      })
    }
  },
  mounted() {
    this.fetchJobs()
  },
  methods: {
    ...mapActions("jobManagement/calendar", ["fetchJobs"]),
    getChartData() {},
    previousMonth() {
      this.selectedDate = DateTime.fromISO(this.selectedDate, {locale: this.locale}).set({
        month: this.selectedDate.month - 1
      })
    },
    nextMonth() {
      this.selectedDate = DateTime.fromISO(this.selectedDate, {locale: this.locale}).set({
        month: this.selectedDate.month + 1
      })
    },
    showToday() {
      this.selectedDate = DateTime.local()
    }
  }
}
</script>

<style lang="stylus" scoped>
.dashboard-container {
  width: 90%;
  margin: 1em auto;
}
</style>

