<template lang="pug">
  div.job-rates(v-if="canSeeRates")
    transition-group(name="base-slide-out")
      .columns(:key="0")
        header
          div.left-align
            h1.font-semi-bold {{ $t("jobs_submit.job_rates_pay_and_bill") }}
          div.right-align
            span {{ $t("jobs_submit.job_rates_override_rates") }}
            v-switch(v-model="rateChangeable")
          
      .columns(:key="1" v-if="getPayRatesTimes")
        .column.is-6
          v-job-toggler( :tabs="getTabs")
        .column.is-6.shifts-info 
          span {{ $t("jobs_submit.job_rates_shifts_starting") }} {{activeTimeFrom}} - {{activeTimeTo}}
      v-pay-rates-display(
        :key="2" 
        v-if="displayTabRates"
        :rates="displayTabRates" 
        :job="job" )

</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import VSwitch from '@/components/shared/switcher/VSwitch'
import VJobToggler from './VJobToggler'
import VPayRatesDisplay from './VPayRatesDisplay'
import DateTimeUtils from '@/utils/dateUtils.js'

export default {
  components: {
    VSwitch,
    VJobToggler,
    VPayRatesDisplay
  },
  props: {
    job: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeTab: 0,
      rates: {}
    }
  },
  computed: {
    displayTabRates() {
      if (
        this.getRatesSorted &&
        this.getRatesSorted[this.getTabs[this.activeTab].id]
      ) {
        return this.getRatesSorted[this.getTabs[this.activeTab].id]
      }
      return false
    },
    ...mapState('_submitJob', ['canSeeRates']),
    activeTimeFrom: function () {
      return (
        this.getActiveTimes.from &&
        DateTimeUtils.formattedTime(this.getActiveTimes.from)
      )
    },
    activeTimeTo: function () {
      return (
        this.getActiveTimes.to &&
        DateTimeUtils.formattedTime(this.getActiveTimes.to)
      )
    },
    getTabs() {
      if (this.getPayRatesTimes.length > 0) {
        return this.getPayRatesTimes.map((item, i) => {
          return {
            text: item.name ? item.name : item.label,
            id: item.id,
            key: i,
            onTabClick: () => (this.activeTab = i)
          }
        })
      }
      return null
    },
    getActiveTimes() {
      return this.getPayRatesTimes[this.activeTab]
    },
    ...mapGetters('_submitJob', ['getPayRatesTimes', 'getRatesSorted']),
    rateChangeable: {
      get() {
        return this.job.isRateChangeable
      },
      set(val) {
        this.updateFieldValue({ isRateChangeable: val })
        this.updateFieldValue({
          rateOverride: {
            rate: null,
            margin: null,
            type: null,
            monetary: null
          }
        })
      }
    }
  },
  watch: {
    job: {
      handler: function () {
        this.getClientRates()
      },
      deep: true
    }
  },
  mounted() {
    this.getClientRates()
  },
  methods: {
    getClientRates() {
      this.getJobPayRates({
        day_times:
          this.getPayRatesTimes &&
          this.getPayRatesTimes.map(({ id }) => id).toString(),
        grades: this.job.gradeId.id,
        job_types: this.job.jobTypeId.id,
        // areas: this.job.clientId.area.id,
        client: this.job.clientId.id,
        per_page: 50
      })
    },
    setActiveTab(index) {
      this.activeTab = index
    },
    ...mapActions('_submitJob', ['getJobPayRates', 'updateFieldValue'])
  }
}
</script>
<style lang="stylus">
.job-rates {
  .column {
    padding: 0 .75rem
    margin-bottom: 10px
  }
  h1 {
    padding .75em
  }
  .shifts-info {
    align-self: center;
    span {
      color: #888888;
      font-size: 16px;
    }
  }
  .columns {
    width: 100%;
  }
  &__content {
    margin-top: 30px!important;
    .column {
      text-align: center;
      }
    }
    .text-left {
    text-align: left;
    align-self: center
    }
  display: flex;
  align-self : flex-start
  header {
    display: flex;
    align-items: center;
    width: 100%;
  }
  }

  .rate-layout {
  float: left;
  .input-label-group {
    margin: 0!important;
    margin-right: 10px;
    .control-label {
      font-size: 16px!important;
      top: -.1px!important;
      left: -1rem!important;
    }
    input {
      margin: 0!important;
      padding-top:0!important;
      height: 35px!important;
      width: 81px!important;
      background: #f2f2f2!important;
      color: #333333!important;
      font-size: 16px!important;
      line-height: 35px!important;
      padding-left: 0!important;
      text-align: center;
      border:none !important;
      border-radius: 8px!important;
      &.base-input--disabled {
        background: #fff!important;
        color: #888888!important;
        border: solid .5px #dcdcdc!important
      }
    }
  }
  &.wd-50 {
    .input-label-group {
      input {
        max-width: 81px!important;
      }
    }
    }
  &.fl-r {
    float:right!important;
    }

  }
</style>
