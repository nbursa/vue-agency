<template lang="pug">
div.team-unavailability-container
  div.team-unavailability(:class="statusName")
    svgicon.icon(:name="`candidates/${statusName}`" :fill="false")
</template>

<script>

const statuses = {
  1: "holiday",
  2: "sick-leave",
  3: "unavailable"
}

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
    statusName() {
      return statuses[this.data.type]
    }
  }
}
</script>

<style lang="stylus">
.team-unavailability
  border-radius 5px
  display flex
  justify-content center
  align-items center
  color #ffffff
  padding 5px
  height 55px
  &.sick-leave
    background linear-gradient(225deg, #FEA07C 0%, #F88C5C 100%)
    &.active,
    &:hover
      cursor pointer
      background #F88C5C
  &.holiday
    background linear-gradient(225deg, #9AF29A 0%, #71D171 100%)
    &.active,
    &:hover
      cursor pointer
      background #71D171
  &.unavailable
    background linear-gradient(225deg, lighten(#dc143c, 30%) 0%, #dc143c 100%)
    &.active,
    &:hover
      cursor pointer
      background #dc143c
    .icon
      fill white
      stroke none
      width 24px
      height 24px
      transform translate(5px, 5px)

</style>
