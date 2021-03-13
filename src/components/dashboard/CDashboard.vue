<template lang="pug">
  div
    .dashboard-container
      v-daily-chart(:user="user" v-if="user.role === 'agency-admin'")
      shifts-chart(:title="$t('dashboard.monthly_title')")
        .date-picker(slot="controls")
          div Date controlls go here
        .chart(slot="chart")
          line-chart(:width="lineWidth" :propData="{}" :chartData="{}")



</template>


<script>
import { mapActions, mapState } from "vuex"
import { DateTime, Info } from "luxon"

import VDailyChart from "./DailyChart/VDailyChart.vue"
import CMainContainer from "@/components/shared/triptih/CMainContainer.vue"
import VDashboardCard from "./VDashboardCard.vue"
import ShiftsChart from "./MonthlyChart/VShiftsChart"

export default {
  components: {
    CMainContainer,
    VDashboardCard,
    ShiftsChart,
    VDailyChart
  },
  data() {
    return {
      namespace: "dashboard",
      lineWidth: 800
    }
  },
  computed: {
    ...mapState("candidates", ["candidates", "meta", "status"]),
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("candidates", ["getCandidates"]),
    fetchData(pageNo) {
      const options = {
        page: pageNo
      }

      this.getCandidates(options)
    },
    onSearchChange(searching) {
      console.log(searching)
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

