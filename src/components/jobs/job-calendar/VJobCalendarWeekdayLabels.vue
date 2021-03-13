<template lang="pug">
.tile.is-ancestor.is-padded
  .tile.has-text-centered(v-for="day in weekdays")
    .dayname
      span.calendar__weekday {{ day }}
</template>
<script>
export default {
  props: {
    weekdays: {
      required: true,
      type: Array
    }
  }
}
</script>
<style lang="stylus" scoped>
.is-padded
  padding 10px 0
.calendar__weekday
  font-weight bold
  justify-content center
.tile.has-text-centered
  justify-content center
</style>
