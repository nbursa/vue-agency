<template lang="pug">
c-main-container
  div.documents(slot="view")
    .search-filters
      .columns
        search-filters(
          :options="searchConfig.presetFilters"
          :namespace="namespace"
          :isTabbed="isTabbed"
        )

        v-switcher(
          activeView="VJobTable"
        )

    .section
      .columns
        .column(
          class="\
          clients-content-box\
          "
          )
          .panel
            .panel-heading
              | {{$t("client_locations.panel_title")}}
            .panel-block.panel-block--overflow
              div(slot="view").column.is-12.job-types
                  tree-menu(
                    v-if="clients && clients.children"
                    :node="clients",
                    :isLast="false"
                  )
              CErrorValidation(v-if="clientError")
            .panel-footer.is-clearfix

  v-sidebar-component(
    slot="actions"
    :sidebarOptions="sidebarOptions"
    :namespace="namespace"
  )

</template>

<script>
const searchConfig = {
  presetFilters: [
    {
      id: 1,
      label: 'client_locations.filter_tab_0',
      url: '/clients',
      slug: { path: '/clients' }
    },
    {
      id: 2,
      label: 'client_locations.filter_tab_1',
      url: '/client-admins',
      slug: { path: '/client-admins' }
    }
  ]
}

import { mapActions, mapState, mapGetters } from 'vuex'
import TreeMenu from './VClient'
import sidebarOptions from './sidebar.options'
import SearchFilters from '../shared/search-filters/VSearchFiltersPreset'
import CMainContainer from '@/components/shared/triptih/CMainContainer'
import VSidebarComponent from '@/components/shared/sidebar/VSidebar'
import VSwitcher from '../shared/search-filters/VSwitcher'
import CErrorValidation from '@/components/on-boarding-setup/steps/_shared/CErrorValidation.vue'
import { formMessages } from '@/mixins/formMessages.mixin'

export default {
  components: {
    TreeMenu,
    SearchFilters,
    CMainContainer,
    VSidebarComponent,
    VSwitcher,
    CErrorValidation
  },
  mixins: [formMessages],
  provide() {
    const localError = {}
    Object.defineProperty(localError, 'message', {
      enumerable: true,
      get: () => this.clientError
    })
    return { localError }
  },
  data() {
    return {
      newNode: '',
      sidebarOptions: sidebarOptions,
      namespace: 'clients',
      isTabbed: true,
      searchConfig: searchConfig,
      fetchFn: this.getClients,
      successMessage: this.$t('timesheets.client_timesheet_send'),
      errorMessage: this.$t('timesheets.client_timesheet_error')
    }
  },
  computed: {
    ...mapState('clients', ['clients', 'selected']),
    ...mapState('clients/timesheet', ['formItem', 'itemSaved']),
    ...mapGetters('clients/timesheet', ['getErrors']),
    ...mapState({
      sidebarComponent(state) {
        return state[this.namespace].sidebar.sidebarComponent
      },
      searchParams(state) {
        return state[this.namespace].search.params
      },
      clientError(state) {
        return state[this.namespace].errors &&
          state[this.namespace].errors.length
          ? state[this.namespace].errors
          : null
      }
    })
  },
  mounted() {
    this.fetchData()
    this.setSelected({
      id: null
    })
  },
  methods: {
    ...mapActions('clients', ['client', 'getClients', 'setSelected']),
    ...mapActions('clients/timesheet', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem'
    ]),
    fetchData() {
      this.getClients()
    }
  }
}
</script>

<style lang="stylus" scoped>


.section {
  margin-top: 3em;
  padding: 0rem 1.5rem;
}

.clients-content-box {
  max-width: 872px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.is-tmpst-info {
  height: 40px;
  width: 140px;
  border-radius: 3px;
  background: linear-gradient(225deg, $primary 0%, $secondary 100%);
  color: white;
  border: 0;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
  }
}

.is-custom {
  padding: 1em;
  background-color: white;
}

.panel {
  border-radius: 3px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  position: relative;
}

.panel-heading:first-child {
  color: $fontDark;
  font-size: 0.875rem !important;
  line-height: 1.188rem;
  padding: 20px 30px;
  border: 0;
  border-radius: 3px 4px 0 0;
  border-bottom: 1px solid #DFE6EB;
}

.panel-block {
  border: 0;
  border-radius: 3px 3px 0 0;
  border-bottom: 2px solid #DFE6EB;
  position: relative;

  &--overflow {
    height: 55vh;
    overflow-y: auto;
    display: block;
  }
}

.panel-footer {
  display: flex;
  justify-content: flex-end;
  border: 0;
  border-radius: 0 0 4px 4px;
  padding: 1em;
  box-shadow: 0 -2px 5px 1px rgba(0, 0, 0, 0.03);

  button {
    margin-right: 1em;
  }
}

.panel-heading {
  background-color: white;
  color: orange;
}

.search-filters {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;

  .columns {
    padding: 0px 15px;
    border-bottom: 1px solid #DFE2E3;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
