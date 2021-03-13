<template lang="pug">
  div
    header
      .sidebar-control
        | {{ $t("margins_sidebar.header") }}
    section.sidebar-overflow
      div.v-table-content__loader(v-show="sidebarStatus")
        atom-spinner(
          :animation-duration="1000"
          :size="60"
          :color="'#856ff9'"
        )
      .margins
        p.margins__title-label {{$t("margins_sidebar.filter_label")}}
        base-tree-select(
          :key="1"
          v-if="jobTypes.children && jobTypes.children.length > 0"
          :items="jobTypes.children"
          :value="computedFilters['jobTypes']"
          optionName="jobTypes"
          :disableBranchNodes="false"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_0")}}

        base-tree-select(
            :key="3"
            v-if="clients.length > 0"
            :value="computedFilters['clients']"
            :items="clients"
            optionName="clients"
            :disableBranchNodes="false"
            @input="onFieldSelect"
            :multiple="true"
            valueFormat="object"
          )
            div(slot="label") {{$t("reporting.filter_2")}}

        base-tree-select(
          :key="2"
          v-if="grades.length > 0"
          :items="grades"
          :value="computedFilters['grades']"
          optionName="grades"
          :disableBranchNodes="false"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_1")}}

        calculator(:singleMode="true" @change="updateMarginType" :margin-value="margin" :margin-type="marginType" :rate-value="rate")

      div.sidebar-footer
        div.pay-rates__rate-controls
          base-button(@click="reset" customClass="is-cancel is-small")
            span {{ $t("margins_sidebar.action_button_0") }}
          base-button(@click="submitFilter" customClass="is-cancel is-small")
            span {{ $t("margins_sidebar.action_button_1") }}
          base-button(@click="submitUpdate" customClass="is-small") {{ $t("margins_sidebar.action_button_2") }}
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import Calculator from "../VMarginCalculator"
import { snakeCase, camelCase } from "lodash"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { AtomSpinner } from "epic-spinners"
import CDropdown from "@/components/shared/dropdown/CDropdown.vue"
import VPayRate from "@/components/rates/rates-filter/VPayRate"

export default {
  components: {
    AtomSpinner,
    Calculator
  },
  data() {
    return {
      rate: null,
      margin: null,
      marginType: null,
    }
  },
  computed: {
    ...mapState("margins", ["sidebarStatus", "filters"]),
    ...mapState("rates", ["tableMode"]),
    ...mapState("margins/table", ["selected"]),
    ...mapState("jobTypes", ["jobTypes"]),
    ...mapState("clients", ["clients"]),
    ...mapState("grades", ["grades"]),
    selectedMargin() {
      return this.selected[0]
    },
    validChildren: function() {
      const validChildren = this.$children.filter(child => {
        return child.optionName
      })
      return validChildren
    },
    selectedOptions: function() {
      let result = Object.keys(this.filters).reduce( (acc, keyName) => {
        if(this.filters[keyName]) {
          acc[`${snakeCase(keyName)}`] = this.filters[keyName].map(item => {
            return { id: item.id }
          })
        }
        return acc
      }, {})
      return result
    },
    computedFilters: function() {
      return {
        clients: this.selectedMargin ? [this.selectedMargin.client] : [],
        jobTypes: this.selectedMargin ? [this.selectedMargin.jobType] : [],
        grades: this.selectedMargin ? [this.selectedMargin.grade] : []
      }
    },

    marginName() {
      return this.createPropName("Margin")
    },
    marginTypeName() {
      return this.createPropName("MarginType")
    },

  },
  watch: {
    activeTable: {
      handler: "updateMarginData",
    },
    tableMode: {
      handler: "updateMarginData",
    },
    selectedMargin: {
      handler: "updateMarginData",
      deep: true
    }
  },
  created() {
    this.clearSelectedItems()
    this.getJobTypesWithChildren()
    this.getClientsWithChildren()
    this.getGrades()
  },
  methods: {
    ...mapActions("jobTypes", ["getJobTypesWithChildren"]),
    ...mapActions("clients", ["getClientsWithChildren"]),
    ...mapActions("grades", ["getGrades"]),
    ...mapActions("margins", ["updateFieldValue", "updateBulkMargins", "filterMargins"]),
    ...mapActions("margins/table", ["clearSelectedItems"]),
    onFieldSelect(value) {
      this.updateFieldValue(value)
    },
    submitUpdate() {
        let payload = Object.assign({}, this.selectedOptions, {
          [this.marginName]: this.margin,
          [this.marginTypeName]: this.marginType //margin type deviates
        })
        this.updateBulkMargins(payload)
    },
    submitFilter() {
      this.filterMargins(this.selectedOptions)
    },
    createPropName(name) {
      return camelCase(`${this.tableMode}_${name}`)
    },
    updateMarginType(value) {
      console.log("margin update", value)
      this.marginType = value.type,
      this.margin = value.margin
    },
    updateMarginData() {
      this.marginType = this.selectedMargin && this.selectedMargin[this.marginTypeName]
      this.margin = this.selectedMargin && this.selectedMargin[this.marginName]
    },
    reset() {
      this.clearSelectedItems()
      this.pickTime = null
      this.rate = null
      this.margin = null
      this.validChildren.forEach(item => {
        item.selected = []
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/components/RateEditSidebar';

.right-sidebar {
  section {
    &.sidebar-overflow {
      padding-top: 3em !important;
    }
  }
}

</style>
