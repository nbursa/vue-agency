<template lang="pug">
  c-main-container
    .reporting(slot="view")
      .reporting-line
        .reporting-line__title
          | {{ $t("reporting.title") }}
      .columns(v-for="{ cardName, cardDescription, routeName, store, type, permission } in reports")
        .column.is-narrow.no-padding-top(v-if="$can(permission, 'Report')")
          .reporting__button(@click="onNavigate( { routeName, store, type } )")
            | {{ $t(`reporting.${cardName}`) }}
        .column.no-padding-top(v-if="$can(permission, 'Report')")
          .reporting__panel
              .reporting__panel-item
                | {{ $t(`reporting.${cardDescription}`) }}

    v-sidebar-component(
      slot="actions"
      :sidebarOptions="sidebarOptions"
      :namespace="namespace"
    )

</template>

<script>
import { mapActions } from 'vuex'
import CMainContainer from '@/components/shared/triptih/CMainContainer.vue'
import VSidebarComponent from '@/components/shared/sidebar/VSidebar'
import textSearch from '../shared/search-filters/VSearchFiltersText.vue'
import sidebarOptions from './sidebar.options'
import reportsOptions from './reports.options.js'

export default {
  components: {
    CMainContainer,
    VSidebarComponent,
    textSearch
  },
  data() {
    return {
      namespace: 'reports',
      reports: reportsOptions,
      sidebarOptions: sidebarOptions
    }
  },
  created() {
    this.setSidebarComponent('default')
  },
  methods: {
    ...mapActions('reports/sidebar', ['setSidebarComponent']),
    ...mapActions('reports', ['setActiveStoreModule']),
    onNavigate(payload) {
      let { routeName, store, type } = payload
      this.setActiveStoreModule({ store, type })
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-filters {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
}

.no-padding-top {
  padding-top: 0px;
  padding-bottom: 15px;
}

.reporting {
  padding: 1em;

  .reporting-line {
    overflow: hidden;
    clear: both;
    position: relative;
    margin-bottom: 20px;
    width: 106%;

    &__title {
      width: 10%;
      color: #aaa;
    }

    &__horizontal {
      box-sizing: border-box;
      position: absolute;
      width: 90%;
      left: 4em;
      top: 0.7em;
      border-bottom: 1px solid #ddd;
    }
  }

  &__panel {
    border-radius: 3px;

    &-item {
      user-select: none;
      padding: 1em 0;
    }
  }

  &__button {
    padding: 1em 0;
    width: 281.07px;
    border-radius: 3px;
    text-align: center;
    background-color: #FFFFFF;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 2px  #5476FC;
    }
  }
}
</style>
