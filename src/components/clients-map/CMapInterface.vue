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
          activeView="VJobCalendar"
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
              | {{$t("clients_map.panel_title")}}
            .panel-block.panel-block--overflow
              div(slot="view").column.is-12.map-slot
                v-map(:mapConfig="mapOptions" :mapData="getMapData" :selected="getSelectedMapMarker")

  v-sidebar-component(
    slot="actions"
    :sidebarOptions="sidebarOptions"
    :namespace="namespace"
  )

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import sidebarOptions from "./sidebar.options"
import searchOptions from "./search.options"
import SearchFilters from "../shared/search-filters/VSearchFiltersPreset.vue"

import CMainContainer from "@/components/shared/triptih/CMainContainer.vue"
import VSidebarComponent from "@/components/shared/sidebar/VSidebar"

import mapOptions from "./mapOptions"
import VMap from "./VMap"
import VSwitcher from "../shared/search-filters/VSwitcher"

export default {
  components: {
    SearchFilters,
    CMainContainer,
    VSidebarComponent,
    VMap,
    VSwitcher
  },
  data() {
    return {
      mapOptions: mapOptions,
      sidebarOptions: sidebarOptions,
      namespace: "clientsMap",
      isTabbed: true,
      searchConfig: searchOptions
    }
  },
  computed: {
    ...mapState({
      sidebarComponent(state, getters) {
        return state[this.namespace].sidebar.sidebarComponent
      },
      searchParams(state, getters) {
        return state[this.namespace].search.params
      },
      ...mapGetters("clients", ["getMapData", "getSelectedMapMarker"])
    })
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
  border-radius: 0px 0px 4px 4px;
  border-bottom: 2px solid #DFE6EB;
  padding: 0;

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

.map-slot {
  padding: 0;
  height: 100%;
}
</style>
