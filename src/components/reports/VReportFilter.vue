
<template lang="pug">
  div
    header
      .sidebar-control
        date-picker(
          @change="onFieldSelect"
          @control:reset-filters="resetFilters"
        )
    .sidebar-overflow
      .sidebar-form
        base-tree-select(
          :key="1"
          v-if="activeReport.filterList.includes('jobTypes') && jobTypes.children && jobTypes.children.length > 0"
          :items="jobTypes.children"
          optionName="jobTypes"
          :disableBranchNodes="true"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_0")}}

        base-tree-select(
          :key="2"
          v-if="activeReport.filterList.includes('grades') && grades.length > 0"
          :items="grades"
          optionName="grades"
          :disableBranchNodes="true"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_1")}}

        base-tree-select(
          :key="3"
          v-if="activeReport.filterList.includes('clients') && clients.length > 0"
          :items="clients"
          optionName="clients"
          :disableBranchNodes="true"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_2")}}

        base-tree-select(
          :key="4"
          v-if="activeReport.filterList.includes('attributes') && attributes.length > 0"
          :items="attributes"
          optionName="attributeValues"
          :disableBranchNodes="false"
          @input="onFieldSelect"
          valueFormat="object"
          :multiple="true"
          :normalizer="attributeNormalizer"
          :flat="true"
        )
          div(slot="label") {{$t("reporting.filter_3")}} 

        base-tree-select(
          :key="5"
          v-if="activeReport.filterList.includes('agencies') && agencies.length > 0"
          :items="agencies"
          optionName="agencies"
          :disableBranchNodes="false"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_4")}}

        base-tree-select(
          :key="6"
          v-if="activeReport.filterList.includes('status') && getJobStatusList.length > 0"
          :items="getJobStatusList"
          optionName="status"
          :disableBranchNodes="true"
          @input="onFieldSelect"
          :multiple="true"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_5")}}

        base-tree-select(
          :key="1"
          v-if="activeReport.filterList.includes('candidates') &&  candidates.length > 0"
          :items="getCandidatesWithFullName"
          optionName="users"
          :disableBranchNodes="true"
          @input="onFieldSelect"
          :multiple="true"
          :normalizer="candidateNormalizer"
          valueFormat="object"
        )
          div(slot="label") {{$t("reporting.filter_6")}}

        div.filter-container
          button.button.report-button.report-button--filter(@click="filterReport") {{ $t(activeReport.filterButtonLabel) }}
        .is-hidden
          a(href="" target="_blank" ref="fileOpener")

      .sidebar-footer
        .is-flex.is-wrapped
          //- button.button.report-button(@click="getReport('Mpdf')") {{ $t("reporting.button_pdf") }}
          button.button.report-button(@click="getReport('Csv')") {{ $t("reporting.button_csv") }}
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import VRoleSelector from "@/components/shared/role-selector/VRoleSelector"
import CDropdown from "@/components/shared/dropdown/CDropdown.vue"
import VPayRate from "@/components/rates/rates-filter/VPayRate"
import DatePicker from "./VReportDatePicker"
import reports from "./reports.options.js"


import qs from "qs"


import "flatpickr/dist/flatpickr.css"

export default {
  components: {
    CDropdown,
    VPayRate,
    flatpickr,
    DatePicker
  },
  data() {
    return {
      sidebarConfig: reports,
      columns: [
        "payroll_id",
        "job_times",
        "temp_attributes",
        "note",
        "job_type",
        "client"
      ]
    }
  },
  computed: {
    ...mapState({
        searchParams(state, getters) {
          return state.reports.search.params
      }
    }),
    ...mapState("jobTypes", ["jobTypes"]),
    ...mapState("attributes", ["attributes"]),
    ...mapState("clients", ["clients"]),
    ...mapState("grades", ["grades"]),
    ...mapState("agencies", ["agencies"]),
    ...mapGetters("attributes", ["getAttributeValues"]),
    ...mapGetters("reports", ["getQueryFilters", "getJobStatusList"]),
    ...mapGetters("candidates", ["getCandidatesWithFullName"]),
    ...mapGetters("reports/table", ["getColumns"]),
    ...mapState("reports", ["activeModule"]),
    ...mapState("candidates", ["candidates"]),
    // ...mapState("reports/table", ["dynamicColumns"]),

    activeReport() {
      return this.sidebarConfig[this.activeModule].sidebarFilters
    }
  },
  created() {
    this.getCandidates({responseType: "all"})
    this.getJobTypesWithChildren()
    this.getClientsWithChildren()
    this.getAgencies()
    this.getAttributes()
    this.getGrades()
  },
  methods: {
    ...mapActions("jobTypes", ["getJobTypesWithChildren"]),
    ...mapActions("clients", ["getClientsWithChildren"]),
    ...mapActions("grades", ["getGrades"]),
    ...mapActions("agencies", ["getAgencies"]),
    ...mapActions("attributes", ["getAttributes"]),
    ...mapActions("reports", ["updateFieldValue", "generateReport"]),
    ...mapActions("reports/reportTable", ["getCandidates"]),
    ...mapActions("reports/search", ["updateSearchParams"]),
    ...mapActions("candidates", ["getCandidates"]),
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    },
    onFieldSelect(value) {
      this.updateFieldValue(value)
    },
    resetFilters() {
      this.$children.filter(child => child.$options.name === 'BaseTreeSelect').forEach(filter => console.log(filter.$children[0].clear()))
    },
    getReport(type) {
      const columns = this.getColumns
        .filter(column => column.hasOwnProperty('id'))
        .map(column => {
          return this.columns[column.id - 1]
        })
        
      let columnsUrl = ''
      columns.forEach(column => columnsUrl += `,${column}`) 
      const filters = Object.assign({}, this.getQueryFilters, { fileType: type })
      const reportUrl = this.activeReport.reportGeneratorUrl
      const typeOption = {
        genFileType: type === 'pdf' ? "application/pdf" : "octet/stream"
      }
      const extensionType = type.replace('M', '').toLowerCase()

      this.generateReport({ filters, typeOption, reportUrl, columnsUrl }).then(file => {
        this.$refs.fileOpener.href = file.fileUrl
        this.$refs.fileOpener.download = `${this.$t(`reporting.reportFileName.${this.activeReport.reportFileName}`)}.${extensionType}`
        this.$refs.fileOpener.click()
        file.revoke()
      })
    },
    filterReport() {
      const filters = Object.assign({}, this.getQueryFilters, {page: 1} )
      const paramUpdate = Object.keys(filters).reduce( (acc, item) => {
        let obj = {
          [item]: filters[item]
        }
        acc.push(obj)
        return acc
      },  [])
      this.updateSearchParams(paramUpdate)
      // delete filters.dateFrom
      // delete filters.dateTo
    },
    candidateNormalizer: function(item) {
      return {
        id: item.id,
        label: item.fullName,
      }
    },
    attributeNormalizer: function(item) {
      return {
        id: item.id
          ? item.id
          : Math.floor(Math.random() * 10000 + 1),
        label: item.name || item.value,
        children: item.values
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/partials/action-buttons';

.sidebar-form {
  padding: 0 1em !important;

  header {
    overflow: visible;
  }
}

.button {
  margin-top: 0.5em;
  margin-right: 1em;
  &.report-button {
    width: 100%;
    flex: 1;
    color $primary;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 3px;
    border: 1px solid $primary;
    &:hover {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
    }
  }
}

.sidebar-control {
  min-height:60px;
  .button {
    background: #fff;
    font-size: 14px;
    height: 30px;
    border: 1px solid #dfe6eb;
  }
}

.sidebar-control__dropdown {
  flex: 1;
  margin-right: 1em;
}

.is-wrapped {
  flex-wrap: wrap;
  margin-right: -1em;
}
</style>