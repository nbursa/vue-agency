<template lang="pug">
c-main-container(
  mode="press"
)
  c-table-filters(
    :options="scheduleFilterOptions"
    slot="manipulations"
    :activeView="activeView"
    :namespace="namespace"
  )
  div(slot="view")
    tempest-scheduler(
      :namespace="namespace"
      :schedule="scheduleData"
      :searchParams="searchParams"
      :options="schedulerOptions"
      :filterComponent="scheduleFilterOptions.scheduleCellFilter"
      @scheduler:date-changed="setSearchDateRange(...arguments)"
      @scheduler:page-changed="lazyLoadHandler"
    )
  v-sidebar-component(
    slot="actions"
    :sidebarOptions="sidebarOptions"
    :namespace="namespace"
  )
  base-modal(
    slot="modal"
    :namespace="namespace"
    customStyle="width: 560px; height: 500px"
  )
    component(
      slot="content"
      :is="modalComponent"
    )


</template>

<script>
import { mapActions, mapState } from "vuex"
import CTableFilters from "@/components/shared/search-filters/CTableFilters.vue"
import CMainContainer from "@/components/shared/triptih/CMainContainer.vue"
import VSidebarComponent from "@/components/shared/sidebar/VSidebar"
import TempestScheduler from "@/components/shared/scheduler/VTempestScheduler.vue"

import { DateTime } from "luxon"

export default {
  components: {
    TempestScheduler,
    CTableFilters,
    CMainContainer,
    VSidebarComponent
  },
  data() {
    return {
      activeView: "false",
      modals: {}
    }
  },
  computed: {
    ...mapState({
      sidebarComponent(state) {
        if (!state[this.namespace] && !state[this.namespace].sidebar) {
          return
        }
        return state[this.namespace].sidebar.sidebarComponent
      },
      searchParams(state) {
        return state[this.namespace].search.params
      },
      schedulerPage(state) {
        return state[this.namespace].scheduler.page
      },
      selected(state, getters) {
        return state[this.namespace].scheduler.selected
      },
      schedulerModalName(state) {
        return state[this.namespace].modal ? state[this.namespace].modal.modalComponent : null
      },
      interval(state) {
        return state[this.namespace].scheduler.interval
      }
    }),
    modalComponent() {
      return this.modals[this.schedulerModalName]
    }
  },
  watch: {
    searchParams: {
      handler: "fetchData",
      deep: true
    },
    selected: {
      handler: "setSidebar",
      deep: true
    }
  },
  mounted: function() {
    const vm = this
    vm.resetSearchParams()
    vm.fetchData()
  },
  methods: {
    ...mapActions({
      setSidebarComponent(dispatch, payload) {
        if (!this.namespace) {
          throw new Error("Namespace not set")
        }
        return dispatch(
          this.namespace + "/sidebar/setSidebarComponent",
          payload
        )
      },
      resetSearchParams(dispatch, payload) {
        return dispatch(this.namespace + "/search/resetSearchParams", payload)
      },
      updateSearchParams(dispatch, payload) {
        return dispatch(this.namespace + "/search/updateSearchParams", payload)
      },
      updateSchedulerPage(dispatch, payload) {
        return dispatch(this.namespace + "/scheduler/setPage", payload)
      }
    }),
    setSidebar(value) {
      if (this.sidebarComponent !== "default" && value === null) {
        this.setSidebarComponent("default")
      }
      if (value) {
        if(value.cellInfo.storeModuleName) {
          this.setSidebarComponent(value.cellInfo.storeModuleName)
        } else {
          this.setSidebarComponent("edit")
        }
      }
    },
    setSearchDateRange({range}) {
      let r
      if (range) {
        const { start, end } = range
        const dateFrom = DateTime.fromISO(start).toFormat("yyyy-LL-dd")
        const dateTo = DateTime.fromISO(end).toFormat("yyyy-LL-dd")
        r = [{dateFrom}, {dateTo}]
      }
      this.updateSearchParams(r)
    },
    lazyLoadHandler() {
      this.fetchDataLazy()
    },
    prepareSearchQuery(opts) {
      let searchQuery = Object.assign({}, { ...this.searchParams }, { page: this.schedulerPage } )
      Object.keys(searchQuery).forEach(
        key => searchQuery[key] == null && delete searchQuery[key]
      )
      this.$router.replace({ query: searchQuery })
      if (searchQuery.attributes) {
        searchQuery.attribute_values = [ {id: searchQuery.attributes} ]
      }
      if (searchQuery.group && searchQuery.status) {
        delete searchQuery.group
      }
      return searchQuery
    },
    fetchData() {
      this.updateSchedulerPage(1)
      let query = this.prepareSearchQuery()
      this.fetchFn(query)
    },
    fetchDataLazy() {
      this.updateSchedulerPage(this.schedulerPage + 1)
      let query = this.prepareSearchQuery()
      this.fetchFnLazy(query)
    }
  }
}
</script>


