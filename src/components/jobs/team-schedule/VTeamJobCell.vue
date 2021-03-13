<template lang="pug">
div.dynamowidth
  div.team-job-cell-container
    div.team-job-cell(:class="`is-${schedulerInterval}`")
      p {{data.jobRequest.jobType.name}}
      p {{data.client.name}}
      p {{ formatDate(data.startTime) }} - {{formatDate(data.endTime)}}

</template>

<script>
import DateTimeUtils from "@/utils/dateUtils.js"

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    schedulerInterval: {
      type: String,
      required: false,
      default: "week"
    }
  },
  methods: {
    formatDate(date) {
      return DateTimeUtils.getTimeFromSQL(date)
    }
  }
}
</script>

<style lang="stylus" scoped>
.selected
  .team-job-cell
    background linear-gradient(225deg, #244F6B 0%, #244F6B 100%)
    border-left 5px solid #244F6B



.team-job-cell
  cursor pointer
  //temp

  //temp
  border-radius 10px 5px 5px 10px
  padding 5px
  max-height 55px
  height 55px
  border-left 5px solid #4883AB
  background linear-gradient(225deg, $primary 0%, $secondary 100%)
  box-shadow 0 0 12px 0 rgba(0,0,0,0.1)
  p
    color #FFFFFF
    font-size 11px
    line-height: 15px
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  &:hover
    background linear-gradient(225deg, #244F6B 0%, #244F6B 100%)
    border-left 5px solid #244F6B

</style>
