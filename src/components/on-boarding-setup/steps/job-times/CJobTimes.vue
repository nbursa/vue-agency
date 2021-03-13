<template lang="pug">
.section
  .content
    .columns
      .column.is-6
        doughnut-wheel( :timedata="jobtimes" :size={width: 360, height: 360} @timestate:update="timesUpdate" :activetool="wheelTool")
      .column.is-6
        v-job-time-tools(@timetool:action="activateTool")
        div.divider
        v-client-selector.spacer(
          v-if="getSetupStatus"
          :isMultiple="false",
          clientGetter="getClientsWithChildrenAndDayTimes",
          :value="selectedClient",
          @input="selectClientJobTimes"
          :placeholder="$t('global.select_client_name')"
        )
        .overflow
          div(v-for="(jobtime, index) in jobtimes" v-if="jobtimesactive.length !== 0")
            v-job-time-panel(:time="{jobtime: jobtime, index: index}" @jobtime-panel:update="timeUpdate" :active-times="jobtimesactive")
  .content

</template>
<script>
import DoughnutWheel from '@/components/shared/doughnut-wheel'
import VJobTimeTools from './VJobTimeTools'
import VJobTimePanel from './VJobTimePanel'
import VClientSelector from '@/components/shared/client-selector/VClientSelector'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    DoughnutWheel,
    VJobTimeTools,
    VJobTimePanel,
    VClientSelector
  },
  data() {
    return {
      wheelTool: 'move'
    }
  },
  computed: {
    ...mapState('onboarding/jobTimes', [
      'jobtimes',
      'jobtimesactive',
      'selectedClient'
    ]),
    ...mapGetters('userManagement', ['getSetupStatus'])
  },
  created() {
    this.getJobTimes()
    this.getJobTimesActive()
  },
  mounted() {},
  beforeDestroy() {
    this.selectClientJobTimes(null)
  },
  methods: {
    ...mapActions('onboarding/jobTimes', [
      'getJobTimes',
      'getJobTimesActive',
      'updateJobTimes',
      'updateJobTime',
      'resetJobTime',
      'submitJobTimes',
      'selectClientJobTimes'
    ]),
    timesUpdate(data) {
      this.updateJobTimes(data)
    },
    timeUpdate(data) {
      this.updateJobTime(data)
    },
    activateTool(tool) {
      if (tool === 'reset') {
        return this.resetJobTime()
      }
      this.wheelTool = tool
    }
  }
}
</script>

<style lang="stylus" scoped>
::-webkit-scrollbar {
  display: none;
}

.section {
  width: 100%;
  padding-top: 15px;

  .spacer {
    margin-bottom: 1.5rem;
  }

  .divider {
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #DFE6EB;
    opacity: 0.75;
  }

  .overflow {
    height: 40vh;
    overflow-y: auto;
    display: block;
  }
}
</style>
