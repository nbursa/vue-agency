<template lang="pug">
  div {{ totalTime }}
</template>

<script>
import DateTimeUtils from "@/utils/dateUtils"

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalTime() {
      let { hours , minutes } = DateTimeUtils.getDuration(this.options.startTime, this.options.endTime)
      let decorateHours = hours ? `${hours.toFixed(0)}h` : ''
      let decorateMinutes = minutes ? `${minutes.toFixed(0)}m` : ''
      return `${decorateHours} ${decorateMinutes}`
    }
  }
}
</script>

<style>

</style>