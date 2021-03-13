<script>
import { mapActions, mapState } from "vuex"
import BaseScheduler from "@/components/shared/base-components/BaseSchedulePage"
import scheduleFilter from "./scheduleFilter.options.js"
import sidebarOptions from "./sidebar.options.js"
import TeamHeader from "./VTeamHeader"
import TeamJobCell from "./VTeamJobCell"
import TeamUnavailabilityCell from "./VTeamUnavailabilityCell"

export default {
  extends: BaseScheduler,
  data() {
    return {
      scheduleFilterOptions: scheduleFilter,
      sidebarOptions: sidebarOptions,
      type: "teamSchedule/schedule",
      namespace: "teamSchedule",
      fetchFn: this.getTeamSchedule,
      fetchFnLazy: this.getTeamScheduleLazy,
      schedulerOptions: {
        headerTitle: this.$t("jobs.team_schedule_title")
      }
    }
  },
  computed: {
    ...mapState("teamSchedule", ["schedule"]),
    scheduleData() {
      return this.prepareSchedule(this.schedule)
    }
  },
  methods: {
    ...mapActions("teamSchedule", ["getTeamSchedule", "getTeamScheduleLazy"]),
    prepareSchedule(schedule) {
      const scheduleCopy = [...schedule]
      const flagTimetableItem = (options) => {
        let { arr, flagAs, component, optCallback, storeModuleName } = options
        return arr.map(item => {
          return Object.assign({}, { _cellType: flagAs, _storeModuleName: storeModuleName, _component: component, cellData: typeof optCallback === "function" ? optCallback(item) : item })
        })
      }
      const formatUnavailabilities = arr => {
        let _unavailabilities = [...arr]
        let acc = []
        _unavailabilities.forEach(unavail => {
          unavail.dates.forEach(date => {
            acc.push( {
              status: unavail.status,
              type: unavail.type,
              startTime: date.date,
              id: unavail.id
            })
          })
        })
        return acc
      }
      const orderedSchedule = scheduleCopy.map(item => {
        return {
          header: {
            _component: TeamHeader,
            headerData: {
              id: item.id,
              firstName: item.firstName,
              lastName: item.lastName,
              image: item.image,
              hoursWorked: item.hoursWorked,
              weeklyHours: item.weeklyHours,
              monthlyHours: item.monthlyHours
            }
          },
          timetable: [...flagTimetableItem({ arr: item.jobs, flagAs: "job", component: TeamJobCell, storeModuleName: "editJob" }), ...flagTimetableItem({ arr: formatUnavailabilities(item.unavailabilities), flagAs: "unavailability", component: TeamUnavailabilityCell, storeModuleName: "editLeave" })]
        }
      })
      return orderedSchedule
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
