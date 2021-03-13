<template lang="pug">
    c-main-container
      c-table-filters(
        :options="tableFilterOptions"
        slot="manipulations"
        :namespace="namespace"
      )

      div.documents(slot="view")
        v-job-calendar(
          @cell-selected="fetchByDay(...arguments, $event)"
          @date-changed="fetchJobsByRange(...arguments)"
          :cellFilter="true"
          :jobs="jobs",
          :cellModule="stripeCellModule"
        )

      v-sidebar-component(
        slot="actions"
        :sidebarOptions="sidebarOptions"
        namespace="jobManagement"
      )

</template>

<script>
import VJobCalendar from "./VJobCalendar"
import { mapState, mapActions } from "vuex"
import { isEmpty } from "lodash"
import sidebarOptions from "./sidebar/sidebar.options"
import { DateTime, Info } from "luxon"

import CMainContainer from "@/components/shared/triptih/CMainContainer.vue"
import VSidebarComponent from "@/components/shared/sidebar/VSidebar"
import tableFilterOptions from "./tableFilter.options"
import CTableFilters from "@/components/shared/search-filters/CTableFilters.vue"
import VJobCalendarCellList from "./cellModules/VJobCalendarCellList"


//import JobFilters from "@/components/jobs/CSearchFilters"

export default {
  components: {
    VJobCalendar,
    CMainContainer,
    VSidebarComponent,
    CTableFilters
  },

  data() {
    return {
      stripeCellModule: VJobCalendarCellList,
      sidebarOptions: sidebarOptions,
      tableFilterOptions: tableFilterOptions,
      namespace: "jobManagement/calendar"
    }
  },

  computed: {
    ...mapState("jobManagement/calendar", ["jobs", "cellData"]),
    ...mapState({
      sidebarComponent(state, getters) {
        return state["jobManagement"].sidebar.sidebarComponent
      }
    })
  },

  created() {
    //ABSENCE ROUTES - TO BE REMOVED
    this.overrideTableFilters()
    //
    if (this.cellData) {
      this.setSidebarComponent("cellDetails")
    } else {
      this.setSidebarComponent("default")
    }
  },

  methods: {
    ...mapActions("jobManagement/calendar", ["fetchJobs", "fetchJobsByDay"]),
    ...mapActions("jobManagement/sidebar", ["setSidebarComponent"]),

    fetchJobsByRange: async function({ range }) {
      let r
      if (range) {
        const { start, end } = range

        const dateFrom = DateTime.fromISO(start).toFormat("yyyy-LL-dd")
        const dateTo = DateTime.fromISO(end).toFormat("yyyy-LL-dd")
        r = {
          dateFrom,
          dateTo
        }
      }
      await this.fetchJobs({
        range: { ...r }
      })
    },

    async fetchByDay({ item, meta, payload, cb }, rng) {
      /*
      * Prepare url param for fetching a single day jobs
      * This will hit route /calendar/yyyy-mm-dd
      */
      // console.log("item event", item)
      const urlParam = item.toFormat("yyyy-LL-dd")
      // console.log(payload)

      await this.fetchJobsByDay({
        dayFormatted: urlParam,
        shouldFetch: !isEmpty((payload.render || {})),
        updateRng: rng // Pass through date range, so we can dispatch all jobs for minimal set of dates
      })

      /*
      * Call passed in callback func, pass item to render and if update of cell component is required
      */
      cb(item, false)
      /*
       * After we retreive job data, show sidebar component
       */
      this.setSidebarComponent("cellDetails")
    },
    overrideTableFilters() {
      if(this.tableFilterOptions && this.$route.meta.override) {
        const override = this.$route.meta.override
        this.tableFilterOptions = Object.assign({}, this.tableFilterOptions, override )
      }
    },
  }
}
</script>
