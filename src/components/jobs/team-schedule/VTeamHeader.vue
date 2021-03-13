<template lang="pug">
div.team-header
  div.team-header__profile-img
    p.team-header__profile-img--img(v-if="data.image")
      img(:src="data.image")
    p.team-header__profile-img--placeholder(v-else)
      span {{ `${data.firstName.charAt(0).toUpperCase()}${data.lastName.charAt(0).toUpperCase()}` }}
  div.team-header__info
    p.team-header__info--name {{ data.firstName }} {{data.lastName}}
    p.team-header__info--hours
      svgicon.icon(name="job-schedule/work-time")
      span {{hoursWorked}}/{{hoursAvailable}}
</template>

<script>

import { mapState } from "vuex"
import DateTimeUtils from "@/utils/dateUtils.js"

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState("teamSchedule/scheduler", ["interval"]),
    hoursWorked() {
      return DateTimeUtils.getMinifiedTime(this.data.hoursWorked)
    },
    hoursAvailable() {
      let candidate = this.data
      let totalHours =
        this.interval === "week"
          ? candidate.weeklyHours
          : candidate.monthlyHours === "0" ||
            candidate.monthlyHours === null
          ? candidate.weeklyHours * 4
          : candidate.monthlyHours
      return totalHours
    }
  }
}
</script>

<style lang="stylus" scoped>
.team-header
  display flex
  align-items center
  &__profile-img
    width 44px
    height 44px
    margin-right 10px
    &--img
      display flex
      justify-content center
      align-items center
      height 100%
      img
        border-radius 50%
    &--placeholder
      display flex
      justify-content center
      align-items center
      background-color #f2f4f7
      border-radius 50%
      height 44px
      width 44px
      span
        font-weight 600
  &__info
    &--name
      color #444444
    &--hours
      display flex
      justify-content flex-start
      align-items center
      .icon
        width 12px
        height 12px
      span
        display inline-block
        margin-left 5px
        background-color #F8F8F8
        border-radius 4px
        padding 0px 10px
</style>
