<template lang="pug">

  .overview
    .overview__statistics(style="display: none")
      .overview__statistics-category
        VRadioFilter(:radioFilters="radioFilters")
      .overview__statistics-boxes
        VStatisticsBox(:statisticsBoxes="statisticsBoxes")
    .overview__table
      VTable(:columns="columns", :tableData="getJobsWithDateTime")

</template>

<script>
import VRadioFilter from "./VRadioFilter"
import VStatisticsBox from "./VStatisticsBox"
import VTable from "./VTable"
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  components: { VRadioFilter, VStatisticsBox, VTable },
  data() {
    return {
      options: {
        status: "accepted"
      },
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
  methods: {
    ...mapActions("jobManagement", ["fetchJobs"])
  },
  mounted() {
    this.options.userId = this.$route.params.candidateId
    this.options.orderBy = "start_time"
    this.options.sortBy = "asc"
    this.fetchJobs(this.options)
  }
}
</script>



<style lang="stylus" scoped>
.overview {
  &__statistics {
    padding: 5px 20px 20px;
    display: flex;
    border-bottom: 2px solid #F4F4F4;
  }

  &__statistics-category {
    flex: 0 0 15%;
  }

  &__statistics-boxes {
    display: flex;
    flex: 1;
    padding-left: 37px;
  }
}
</style>

