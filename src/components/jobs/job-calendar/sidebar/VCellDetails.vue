<template lang="pug">
.card
  .card-header
    .sidebar-control
      router-link(:to="{name: 'submit-job'}")
        base-button {{ $t("jobs_sidebar.submit") }}
  .card-header
    .card-header-title.is-centered
      | {{ renderDate }}
  //- .card-header.total
  //-   .card-header-title.is-space-between
  //-     span {{ $t("job_cal.total") }}
  //-     span.tag.is-rounded {{ totalJobs || 0 }}

  .card-items
    v-detail-expand-block(:title="$t('job_cal.list_0')" :itemCheck="totalJobs")
      .card-content(v-if="jobs")
        template(v-for="([status, count], index) in orderedStatuses" v-if="count !== 0")
          v-progress(
            @click.native="jobs[status] !== 0 && tblViewWithStatus(jobs[status], status)"
            v-model="jobs[status]"
            :label="$t( `job_cal.${status}` )"
            :maxValue="totalJobs"
            :colorClass="status==='cancelled'?`is-${status}-2`:`is-${status}`"
            )
    v-detail-expand-block(:title="$t('job_cal.list_1')" :itemCheck="totalHolidays")
      v-candidate-list(:list="cellData.holidays")
    v-detail-expand-block(:title="$t('job_cal.list_2')" :itemCheck="totalSickdays")
      v-candidate-list(:list="cellData.sickDays")
    v-detail-expand-block(:title="$t('job_cal.list_3')" :itemCheck="totalUnavailable")
      v-candidate-list(:list="cellData.unavailabilities")
  .card-header.shadow-0(v-if="calendarDay")
    a(@click="toggleTableView" style="margin: 10px auto; display: block") {{ $t("job_cal.see_shifts") }} {{ calendarDay | nice-date }}
</template>

<script>
import { mapState, mapActions } from "vuex"
import { DateTime } from "luxon"
import { startCase, snakeCase } from "lodash"
import statuses from "@/config/jobStatuses"
import VDetailExpandBlock from "./VDetailExpandBlock"
import VCandidateList from "./VCandidateList"
import VProgress from "./VProgress"
export default {
  components: { VProgress, VDetailExpandBlock, VCandidateList },
  data() {
    return {
      statuses
    }
  },
  computed: {
    ...mapState("jobManagement/calendar", ["cellData", "calendarDay"]),
    /*
     * Date formated key, under which job data is stored
     * There will be only one such field in this case, and we retrieve it by
     * index, as we don't know the name
     */
    dateKey() {
      return this.cellData.date
    },
    /*
     *  Jobs only object, nested under the above key
     */
    jobs() {
      return this.cellData.jobs
    },
    orderedStatuses() {
      return this.statuses.all
        .reduce((acc, status) => {
          acc.push([status, this.jobs[status]])
          return acc
        }, [])
        .sort((prev, next) => {
          return next[1] - prev[1]
        })
    },
    /*
     * Sum of all jobs
     */
    totalHolidays() {
      if (this.cellData.holidays) {
        return this.cellData.holidays.length
      }
      return 0
    },
    totalSickdays() {
      if (this.cellData.sickDays) {
        return this.cellData.sickDays.length
      }
      return 0
    },
    totalUnavailable() {
      if (this.cellData.unavailabilities) {
        return this.cellData.unavailabilities.length
      }
      return 0
    },
    totalJobs() {
      if (this.jobs) {
        return Object.keys(this.jobs).reduce((sum, key) => {
          return sum + this.jobs[key]
        }, 0)
      }
      return 0
    },

    subtotalJobsByKeys() {
      if (this.jobs) {
        return function(pick) {
          return Object.keys(this.jobs)
            .filter(key => pick.includes(key))
            .reduce((sum, key) => {
              return sum + this.jobs[key]
            }, 0)
        }
      }
      return 0
    },
    /*
     * Date representation of a currently selected calendar cell,
     * to be displayed in action header in template
     * This possibly could be extracted into some helper function!
     */
    renderDate() {
      // Format date as you wish
      return DateTime.fromISO(this.dateKey)
        .setLocale(this.$langMap[this.$i18n.locale].locale)
        .toLocaleString(DateTime.DATE_HUGE)
    }
  },
  created() {
    console.log("cell data: ", this.cellData)
  },
  methods: {
    ...mapActions("jobManagement/search", [
      "resetSearchParams",
      "updateSearchParams"
    ]),
    humanCase: startCase,
    /*
     * Switch table view, with query = statuses
     */
    tblViewWithStatus(jobCount, status) {
      this.resetSearchParams()
      this.updateSearchParams([
        { dateFrom: this.calendarDay },
        { dateTo: this.calendarDay },
        { status: snakeCase(status) },
        { calendarLink: true }
      ])
      this.$router.push({ name: "job-schedule" })
    },
    /*
     * Switch table view, with query = selected day
     */
    toggleTableView() {
      this.resetSearchParams()
      this.updateSearchParams([
        {
          dateFrom: this.calendarDay
        },
        {
          dateTo: this.calendarDay
        },
        {
          calendarLink: true
        }
      ])
      this.$router.push({ name: "job-schedule" })
    }
  }
}
</script>
<style lang="stylus" scoped>
span.tag {
  background-color: #4B9ED1;
  color: white;
  font-size: 16px;
  border-radius: 14px;
  height: 28px;
}

.card {
  box-shadow: none;
  height: 75vh;
  overflow-y: auto;
}

.card-header {
  &.shadow-0 {
    box-shadow: none;
  }

  &.total {
    box-shadow: none;
    border-bottom: 1px solid #EBEBEB;
  }
}

.card-header-title.is-centered {
  font-weight: normal;
  margin: 0 auto;
}

.card-header-title.is-space-between {
  justify-content: space-between;
  padding: 8px 12px 8px 21px;
  box-shadow: none;
}

.card-content {
  padding: 14px 0px;
}

.subsection {
  padding: 0.4rem 10px;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;

  span {
    color: rgba(#202123, 43%);
  }
}

.sidebar-control {
  width: 100%;
}

h6.subtitle {
  margin-bottom: 0;
  color: #202123;
  opacity: 0.43;
  font-weight: 600;
  font-size: 16px;
}
</style>
