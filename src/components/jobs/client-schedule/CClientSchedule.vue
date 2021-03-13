<script>
import { mapActions, mapState, mapGetters } from "vuex"
import { forEach } from "lodash"
import BaseScheduler from "@/components/shared/base-components/BaseSchedulePage"
import scheduleFilter from "./scheduleFilter.options.js"
import sidebarOptions from "./sidebar.options.js"
import ClientHeader from "./VClientHeader"
import ClientJobCell from "./VClientJobCell"
import ClientWorkerCell from "./VClientWorkerCell"
import VAddCandidate from "./VAddCandidate"
import VClientWorkers from "./VClientWorkers"

const modalList = {
  addCandidate: VAddCandidate,
  clientWorkers: VClientWorkers
}

export default {
  extends: BaseScheduler,
  data() {
    return {
      modals: modalList,
      scheduleFilterOptions: scheduleFilter,
      sidebarOptions: sidebarOptions,
      type: "clientSchedule/schedule",
      namespace: "clientSchedule",
      fetchFn: this.getClientSchedule,
      fetchFnLazy: this.getClientScheduleLazy,
      schedulerOptions: {
        headerTitle: this.$t("jobs.client_schedule_title")
      }
    }
  },
  computed: {
    ...mapState("clientSchedule", ["schedule"]),
    scheduleData() {
      return this.prepareSchedule(this.schedule)
    }
  },
  methods: {
    ...mapActions("clientSchedule", ["getClientSchedule", "getClientScheduleLazy"]),
    flattenClients(arr) {
      const collection = []
      let refRootName = null
      const iterator = function(arr, rootName = {}) {

        forEach(arr, item => {
          //think this through a bit prettier

          if(refRootName) {
            item.rootName = refRootName
          }

          if(item.parentId === null) {
            item.rootName = null
            refRootName = item.name
          }

          if(item.children) {
            iterator(item.children)
          } else {
            collection.push(item)
          }
        })
      }
      iterator(arr)
      return collection
    },
    prepareSchedule(schedule) {
      let _schedule = [...schedule]
      const flagTimetableItem = (options) => {
        let { dates, jobs, flagAs, component, storeModuleName } = options
        return dates.map(item => {
          
          let findJobs = jobs.filter(job => job.startTime.indexOf(item.date) > -1)
          return Object.assign({}, { _cellType: flagAs, _component: component, _startPropName: "date", _storeModuleName: storeModuleName,  cellData: {...item, jobs: findJobs } })
        })
      }
      let orderedSchedule = this.flattenClients(_schedule).map(item => {

        return {
          header: {
            _component: ClientHeader,
            headerData: {
              clientId: item.id,
              rootName: item.rootName,
              name: item.name
            },
          },
          timetable: [...flagTimetableItem( { dates: item.dates, jobs: item.jobs, flagAs: "job", component: this.interval === 'day' ? ClientWorkerCell : ClientJobCell, storeModuleName: "edit"} )]
        }
      })
      // console.log("CLIENT PREP", orderedSchedule)
      return orderedSchedule
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
