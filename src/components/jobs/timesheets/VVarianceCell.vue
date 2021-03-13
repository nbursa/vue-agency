<template lang="pug">
  div {{ totalVariance }}
</template>

<script>
import DateTimeUtils from '@/utils/dateUtils'

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalVariance() {
      let {
        startTime,
        endTime,
        initialStartTime,
        initialEndTime
      } = this.options
      if (startTime && endTime && initialStartTime && initialEndTime) {
        let initialDuration = DateTimeUtils.getDurationLength(
          initialStartTime,
          initialEndTime
        ).milliseconds
        let endDuration = DateTimeUtils.getDurationLength(startTime, endTime)
          .milliseconds
        let diff = endDuration - initialDuration
        let getSign = diff < 0 ? '-' : '+'
        let {
          hours: varianceHour,
          minutes: varianceMinute
        } = DateTimeUtils.getTimeWithMilis(Math.abs(diff))
        let variance = {
          hours: varianceHour,
          minutes: varianceMinute
        }
        return this.decorator(variance, getSign)
      } else {
        return '--'
      }
    }
  },
  methods: {
    decorator(variance, sign) {
      let { hours, minutes } = variance
      let decorateHours = hours ? `${hours.toFixed(0)}h` : ''
      let decorateMinutes = minutes ? `${minutes.toFixed(0)}m` : ''
      return hours || minutes
        ? `${sign} ${decorateHours} ${decorateMinutes}`
        : '--'
    }
  }
}
</script>

<style></style>
