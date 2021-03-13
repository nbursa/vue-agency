<template lang="pug">

  .job-history
    .job-history__table
      VTable(:columns="columns", :tableData="getJobsWithDateTime")


</template>

<script>
import VRadioFilter from "./VRadioFilter"
import VStatisticsBox from "./VStatisticsBox"
import VTable from "./VTable"
import { mapActions, mapState, mapGetters } from "vuex"

const statuses = [
  "swap_pending",
  "pass_on_pending",
  "in_progress",
  "sign_off_pending",
  "invoice_pending",
  "invoiced",
  "arbitration_pending",
  "cancelled",
  "never_filled",
  "admin_sign_off_pending"
]

export default {
  components: { VRadioFilter, VStatisticsBox, VTable },
  data() {
    return {
      options: {responseType: 'all'},
      radioFilters: [
        {
          id: "1",
          label: this.$t("candidate_details.candidate_info_radio_week"),
          name: "group1",
          checked: true
        },
        {
          id: "2",
          label: this.$t("candidate_details.candidate_info_radio_month"),
          name: "group1",
          checked: false
        },
        {
          id: "3",
          label: this.$t("candidate_details.candidate_info_radio_year"),
          name: "group1",
          checked: false
        }
      ],
      statisticsBoxes: [
        {
          icon: "total-earned",
          title: this.$t("candidate_details.statistics_box_1"),
          value: 4880,
          text: "Lorem ipsum dolor sit amet dolor"
        },
        {
          icon: "hours-worked",
          title: this.$t("candidate_details.statistics_box_2"),
          value: 116,
          text: "Lorem ipsum dolor sit amet dolor"
        },
        {
          icon: "total-earned",
          title: this.$t("candidate_details.statistics_box_3"),
          value: 1102,
          text: "Lorem ipsum dolor sit amet dolor"
        }
      ],
      columns: [
        {
          id: 0,
          label: "ID",
          show: "id"
        },
        {
          id: "idColumn1",
          label: this.$t("candidate_details.overview_table_col1"),
          show: "status.name"
        },
        {
          id: "idColumn2",
          label: this.$t("candidate_details.overview_table_col2"),
          show: "client.name"
        },
        {
          id: "idColumn3",
          label: this.$t("candidate_details.overview_table_col3"),
          show: "startTime",
          type: "date"
        },
        {
          id: "idColumn4",
          label: this.$t("candidate_details.overview_table_col4"),
          show: "jobTime"
        }
      ]
    }
  },
  computed: {
    ...mapGetters("jobManagement", ["getJobsWithDateTime"])
  },
  mounted() {
    this.options.userId = this.$route.params.candidateId
    this.options.orderBy = "start_time"
    this.options.sortBy = "asc"
    this.options.status = statuses.toString()
    this.fetchJobs(this.options)
  },
  methods: {
    ...mapActions("jobManagement", ["fetchJobs"])
  }
}
</script>



<style lang="stylus" scoped>
</style>

