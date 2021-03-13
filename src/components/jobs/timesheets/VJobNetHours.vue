<template lang="pug">
  div {{ netHours }}
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
    netHours() {
      const newEnd = !this.options.jobRequest.isBreakPayable
        ? DateTimeUtils.getDateTimeFromJS(
            new Date(
              Date.parse(this.options.endTime) -
                this.options.breakMinutes * 60000
            )
          )
        : this.options.endTime
      const { hours, minutes } = DateTimeUtils.getDuration(
        this.options.startTime,
        newEnd
      )
      const decorateHours = hours ? `${hours.toFixed(0)}h` : ''
      const decorateMinutes = minutes ? `${minutes.toFixed(0)}m` : ''
      return `${decorateHours} ${decorateMinutes}`
    }
  }
}
</script>
