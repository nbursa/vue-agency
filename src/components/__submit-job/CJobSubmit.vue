<template lang="pug">
      .columns.job-submit-columns
        .column.job-submit-content-box
          .panel
            v-job-header(:nextEnabled="nextEnabledHeader" :onNextClick="onHeaderNext" :onCancelClick="() => this.$router.push({ path: '/' })")
            .panel-block.is-multiline.columns
                v-job-details.column.is-5-fullhd.is-6-widescreen.is-12-desktop.is-12-tablet.is-12-mobile(v-bind="{jobTypes, job, clients, agencies, attributes: getAttributesWithChildren, grades, bonuses, templates: getTemplatesFields, showReset: getClearForm}")
                c-job-rates.column.is-7-fullhd.is-6-widescreen.is-12-desktop.is-12-tablet.is-12-mobile(v-bind="{job}" v-if="showTime")

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import VJobHeader from './VJobHeader'
import VJobDetails from './VJobDetails'
import CJobRates from './CJobRates'

export default {
  components: {
    VJobHeader,
    VJobDetails,
    CJobRates
  },
  computed: {
    nextEnabledHeader() {
      const routesArray = []
      if (this.showTime) {
        routesArray.push('schedule')
      }
      if (this.getShiftsArray.length > 0 && this.showTime) {
        routesArray.push('candidates')
      }
      return routesArray
    },
    ...mapState({
      jobTypes: ({ jobTypes }) => jobTypes.jobTypes
    }),
    ...mapState('_submitJob', ['job', 'meta', 'status', 'templates']),
    ...mapGetters('_submitJob', [
      'getClearForm',
      'showTime',
      'getTemplatesFields'
    ]),
    ...mapGetters('_scheduleJob', ['getShiftsArray']),
    ...mapState('clients', ['clients']),
    ...mapGetters('attributes', [
      'getAttributeValues',
      'getAttributesWithChildren'
    ]),
    ...mapState('grades', ['grades']),
    ...mapState('bonuses', ['bonuses']),

    ...mapState('agencies', ['agencies'])
  },
  mounted() {
    this.getJobTypesWithChildren()
    this.getClientsWithChildrenAndDayTimes()
    this.getAttributes()
    this.getGrades()
    this.getAllBonuses({ responseType: 'all' })
    this.getTemplates()
    this.getDayTimes()
    this.getAgencies()
  },
  methods: {
    ...mapActions('jobTypes', ['getJobTypesWithChildren']),
    ...mapActions('clients', ['getClientsWithChildrenAndDayTimes']),
    ...mapActions('attributes', ['getAttributes']),
    ...mapActions('grades', ['getGrades']),
    ...mapActions('bonuses', ['getAllBonuses']),
    ...mapActions('_submitJob', ['getTemplates']),
    ...mapActions('rates', ['getDayTimes', 'getAllPayrates']),
    ...mapActions('agencies', ['getAgencies']),
    onHeaderNext() {
      this.$router.push({ path: '/schedule-job' })
    }
  }
}
</script>
<style lang="stylus">

@import '~@/assets/styles/global/variables';
@import '~@/assets/styles/global/components/JobSubmitPanels';
.job-submit-columns {
  margin: 0!important;
  background: #fff;
  height: 100%;
}
.job-submit-content-box {
    max-width: 100%;
    padding: 0!important;

    .panel-block {
      margin: 0!important;
    }
    .panel {
      box-shadow: none;
    }
    .left-align {
      flex:1;
      }
    .right-align {
      justify-content: flex-end;
      display: flex;
      align-items: center;
      }
  }
</style>
