<template lang="pug">
c-main-container
  c-table-filters(
    :options="tableFilterOptions"
    slot="manipulations"
    :activeView="activeView"
    :namespace="namespace"
    :enableFilterReset="isResetActive"
  )

  div.documents(slot="view")
    table-component(
      v-if="tableData && tableData.length > 0"
      :data="tableData"
      :fullData="tableData"
      :type="type"
      :columns="columns"
      :selectType="selectType"
      :isLoading="status"
      :namespace="namespace"
    )

    div.documents__table-notification(v-else)
      span {{msgNoTableData}}
    pagination(
      :v-if="tableData && tableData.length > 0"
      slot="actions"
      :pageData="meta"
      :namespace="namespace"
    )

  v-sidebar-component(
    slot="actions"
    :sidebarOptions="sidebarOptions"
    :namespace="namespace"
  )


  //rework this to something sane, like a modal component loader
  v-audit-modal(
    v-if="showAuditModal && showModal"
    slot="modal"
  )

  c-location-modal(
    v-if="showGeolocationModal && showModal"
    slot="modal"
  )

  c-sign-off-modal(
    v-if="!showAuditModal && !showGeolocationModal && !showRepushModal && hasSignOff && showModal" 
    :namespace="namespace"
    slot="modal"
  )

  c-repush-modal(
    v-if="showRepushModal && showModal"
    slot="modal"
  )
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import tableComponent from '@/components/shared/table/VTable.vue'
import pagination from '@/components/shared/paginator'
import TextSearch from '@/components/shared/search-filters/VSearchFiltersText.vue'
import AdvancedSearch from '@/components/shared/search-filters/VSearchFiltersAdvanced.vue'
import CLocationModal from '@/components/shared/modals/location/CLocationModal.vue'
import CSignOffModal from '@/components/shared/modals/VSignOffModal.vue'
import CTableFilters from '@/components/shared/search-filters/CTableFilters.vue'
import CMainContainer from '@/components/shared/triptih/CMainContainer.vue'
import VSidebarComponent from '@/components/shared/sidebar/VSidebar'
import CRepushModal from '@/components/shared/modals/CRepushModal'
import VAuditModal from '@/components/shared/modals/audit/VAuditModal'

export default {
  name: 'BaseTablePage',
  components: {
    CMainContainer,
    tableComponent,
    VSidebarComponent,
    pagination,
    TextSearch,
    CTableFilters,
    CLocationModal,
    AdvancedSearch,
    CSignOffModal,
    CRepushModal,
    VAuditModal
  },
  data() {
    return {
      activeView: 'false',
      selectType: 'single', //single / multi / none
      isResetActive: true,
      msgNoTableData: this.$t('global.empty_table_msg')
    }
  },
  computed: {
    ...mapGetters('modals', ['modalComponent', 'modalData']),
    ...mapState({
      selected(state) {
        return state[this.namespace].table.selected
      },
      checked(state) {
        if (!state[this.namespace] && !state[this.namespace].table) {
          return
        }
        return state[this.namespace].table.checked
      },
      sidebarComponent(state) {
        if (!state[this.namespace] && !state[this.namespace].sidebar) {
          return
        }
        return state[this.namespace].sidebar.sidebarComponent
      },
      searchParams(state) {
        return state[this.namespace].search.params
      },
      hasSignOff(state) {
        return state.auth.user.permissions.includes('admin-signOff-job')
      }
    }),
    showAuditModal() {
      return this.modalComponent === 'audit'
    },
    showGeolocationModal() {
      return this.modalComponent == 'location'
    },
    showRepushModal() {
      return this.modalComponent == 'repush'
    },
    showModal: () => {
      return false
    }
  },
  watch: {
    checked: {
      handler: 'setSidebar',
      immediate: true
    },
    selected: {
      handler: 'setSidebar',
      immediate: true
    },
    searchParams: {
      handler: 'fetchData',
      deep: true
    }
  },
  created() {
    this.overrideTableFilters()
  },
  mounted() {
    this.initTableData()
  },
  methods: {
    ...mapActions({
      setSidebarComponent(dispatch, payload) {
        if (!this.namespace) {
          throw new Error('Namespace not set')
        }
        return dispatch(
          this.namespace + '/sidebar/setSidebarComponent',
          payload
        )
      },
      deselectItem(dispatch, payload) {
        return dispatch(this.namespace + '/table/deselectItem', payload)
      },
      resetSearchParams(dispatch, payload) {
        return dispatch(this.namespace + '/search/resetSearchParams', payload)
      },
      updateSearchParams(dispatch, payload) {
        return dispatch(this.namespace + '/search/updateSearchParams', payload)
      }
    }),
    initTableData() {
      let x = Object.keys(this.$route.query)
      if (x.length > 0) {
        this.resetSearchParams()
      }
      const params = x.map((key) => {
        let o = {}
        o[key] = this.$route.query[key]
        return o
      })
      this.updateSearchParams(params)
      this.fetchData()
    },
    overrideTableFilters() {
      if (this.tableFilterOptions && this.$route.meta.override) {
        const override = this.$route.meta.override
        this.tableFilterOptions = Object.assign(
          {},
          this.tableFilterOptions,
          override
        )
      }
    },
    setSidebar(value) {
      if (this.sidebarComponent === 'edit' && value.length <= 0) {
        this.setSidebarComponent('default')
      }
      if (value.length > 0) {
        this.setSidebarComponent('edit')
      }
    },
    fetchData() {
      let searchQuery = { ...this.searchParams }
      Object.keys(searchQuery).forEach(
        (key) => searchQuery[key] == null && delete searchQuery[key]
      )
      this.$router.replace({ query: searchQuery })
      if (searchQuery.attributes) {
        searchQuery.attribute_values = [{ id: searchQuery.attributes }]
      }
      if (searchQuery.group && searchQuery.status) {
        delete searchQuery.group
      }
      this.fetchFn(searchQuery)
    }
  }
}
</script>
<style lang="stylus">
.documents {
  &__table-notification {
    margin: 24px 15px;
    display: flex;
    height: 80px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
  }
}
</style>
