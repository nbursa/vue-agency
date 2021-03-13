<template lang="pug">
  .job-rates__content()
        .columns
          .column.is-2
          .column.is-3
            span {{ rateText }}
          .column.is-4
            span {{ $t("jobs_submit.pay_rates_display_margin") }}
          .column.is-3
            span {{ $t("jobs_submit.pay_rates_display_charge") }}
        .columns.editable(v-if="showOverride")
          .column.is-2.text-left
            span {{ $t("jobs_submit.pay_rates_display_apply_to_all") }}
          .column.is-3
            base-input.rate-layout(:value="rate", @input="onRateChange" :label="'€'")  
          .column.is-4
            base-input.rate-layout.wd-50(:value="margin.value", @input="onMarginValChange" :label="'€'") 
            base-input.rate-layout.wd-50.fl-r(:value="margin.percent" @input="onMarginPercentChange" :label="'%'") 
          .column.is-3
            base-input.rate-layout(:value="total", disabled :label="'€'")    
        .columns(v-for="({dayType, rate, margin, marginType}, index) in getRates" :key="index")
          .column.is-2.text-left
            span {{dayType.name}}
          .column.is-3
            base-input.rate-layout(:value="`€${rate}`", disabled)  
          .column.is-4
            base-input.rate-layout.wd-50(:value="`€${getMarginValue(rate, marginType, margin)}`", disabled) 
            base-input.rate-layout.wd-50.fl-r(:value="`${getMarginPecent(rate, marginType, margin)}%`", disabled) 
          .column.is-3
            base-input.rate-layout(:value="`€${(rate + getMarginValue(rate, marginType, margin))}`", disabled)
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    rates: {
      type: [Array, Object],
      required: true
    },
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
      rate: 0,
      margin: {
        value: 0,
        percent: 0
      }
    }
  },
  computed: {
    getRates() {
      return this.rates.map((rates) => {
        if (this.job.paymentType === 1) {
          const { hourlyMargin, hourlyMarginType, hourlyRate } = rates
          return {
            ...rates,
            margin: hourlyMargin,
            marginType: hourlyMarginType,
            rate: hourlyRate
          }
        }
        const { dailyMargin, dailyMarginType, dailyRate } = rates
        return {
          ...rates,
          margin: dailyMargin,
          marginType: dailyMarginType,
          rate: dailyRate
        }
      })
    },
    rateText() {
      if (this.job.paymentType === 1) {
        return this.$t('jobs_submit.pay_rates_display_hourly_rate')
      }
      return this.$t('jobs_submit.pay_rates_display_daily_rate')
    },
    total() {
      return parseFloat(this.rate + this.margin.value)
    },
    showOverride() {
      return !!this.job.isRateChangeable
    }
  },
  watch: {
    total: function (total) {
      this.updateFieldValue({
        rateOverride: {
          rate: this.rate,
          margin: this.margin.value,
          type: 1,
          monetary: this.margin.value
        }
      })
    },
    showOverride: function (showOverride) {
      if (showOverride) {
        this.rate = 0
        this.margin = {
          value: 0,
          percent: 0
        }
      }
    }
  },
  methods: {
    getMarginValue(rate, type, margin) {
      // percent
      if (type === 2) {
        return (margin / 100) * rate
      }
      return margin
    },
    getMarginPecent(rate, type, margin) {
      if (type === 2) return margin
      const result = (margin / rate) * 100
      return typeof result === 'number' ? result.toFixed(2) : 0
    },
    onRateChange(val) {
      this.rate = parseFloat(val)
      if (this.margin.percent > 0)
        this.onMarginPercentChange(this.margin.percent)
      if (this.margin.value > 0) this.onMarginValChange(this.margin.value)
    },
    onMarginValChange(val) {
      this.margin.value = parseFloat(val)
      this.margin.percent = this.getMarginPecent(this.rate, 1, val)
    },
    onMarginPercentChange(val) {
      this.margin.percent = parseFloat(val)
      this.margin.value = this.getMarginValue(this.rate, 2, val)
    },
    ...mapActions('_submitJob', ['updateFieldValue'])
  }
}
</script>
<style lang="stylus" scoped>
.editable {
      padding-bottom: 10px;
      margin-bottom: 25px!important;
      border-bottom: solid .5px #dcdcdc;
      max-width: 504px!important;
    }
.column.is-2, .column.is-3 {
  width: 109px!important
}
.column.is-4 {
  width: 192px!important;
}
</style>
