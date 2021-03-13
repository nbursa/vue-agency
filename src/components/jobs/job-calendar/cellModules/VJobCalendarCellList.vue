<template lang="pug">
  .status-list
    ul.status-list__list
      li.status-list__item.status-list__item--job(v-if="!calendarFilters.includes('job')")
        span.text {{$t("job_cal.list_0")}}
        span.text {{data.jobs}}
      li.status-list__item.status-list__item--holiday(v-if="!calendarFilters.includes('holiday')")
        span.text {{$t("job_cal.list_1")}}
        span.text {{data.holidays}}
      li.status-list__item.status-list__item--sickday(v-if="!calendarFilters.includes('sickday')")
        span.text {{$t("job_cal.list_2")}}
        span.text {{data.sickDays}}
      li.status-list__item.status-list__item--unavailable(v-if="!calendarFilters.includes('unavailable')")
        span.text {{$t("job_cal.list_3")}}
        span.text {{data.unavailabilities}}
</template>

<script>
import { mapState } from "vuex"

export default {
  props: {
    data: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState("jobManagement/calendar", ["calendarFilters"])
  }
}
</script>

<style lang="stylus" scoped>
.status-list
  &__list
    padding 5px
  &__item
    min-height 16px
    position relative
    display flex
    justify-content space-between
    line-height 16px
    margin-left 15px
    cursor pointer
    &--job
      &::before
        background linear-gradient(225deg, #86CCEB 0%, #4E9DD2 100%)
    &--holiday
      &::before
        background linear-gradient(225deg, #B5EB45 0%, #7ED321 100%)
    &--sickday
      &::before
        background linear-gradient(225deg, #FC9717 0%, #FC976E 100%)
    &--unavailable
      &::before
        background linear-gradient(225deg, #DC143C 0%, #F08080 100%)


    &:hover
      text-decoration: underline
    &::before
      content ''
      border-radius 50%
      width 8px
      height 8px
      position absolute
      left 0px
      top 4px

.status-list
  .text
    font-size 0.8125rem
    color #4A4A4A
    &:first-child
      display none
      opacity 0.3
      flex 2
    &:last-child
      flex 1
      text-align right

.cell-box--is-highlighted
  .status-list
    &__item
      span
        &:last-child, &:first-child
          color white
          opacity 0.7

.cell-box--is-highlighted,
.cell-box--is-today
    .status-list
      &__item
        &::before
          left -15px
        .text
          display inline

.cell-box
  &:hover
    .status-list
      &__item
        &::before
          left -15px
        .text
          display inline


</style>
