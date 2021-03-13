<template lang="pug">
div.team-scheduler-form

  .team-scheduler-form__button-row
    base-input(
      :value="scheduledJob.jobId"
      :label="$t('team_schedule.jobId')"
      :disabled="true"
    )
    base-input(
      :value="scheduledJob.status.name"
      :label="$t('team_schedule.jobStatus')"
      :disabled="true"
    )

  base-input(
    :value="date"
    :label="$t('team_schedule.date')"
    :disabled="true"
  )
  .team-scheduler-form__button-row
    base-input(
      :value="startTime"
      :label="$t('team_schedule.timeFrom')"
      :disabled="true"
    )
    base-input(
      :value="endTime"
      :label="$t('team_schedule.timeTo')"
      :disabled="true"
    )
  base-input(
    :value="totalTime"
    :label="$t('team_schedule.totalTime')"
    :disabled="true"
  )
  base-input(
    :value="scheduledJob.client"
    :label="$t('team_schedule.client')"
    :disabled="true"
  )
  base-input(
    :value="scheduledJob.candidate"
    :label="$t('team_schedule.candidate')"
    :disabled="true"
  )
  base-input(
    :value="scheduledJob.jobType"
    :label="$t('team_schedule.jobType')"
    :disabled="true"
  )
  .team-scheduler-form__cancel-prompt(v-if="isEditable")
    p(v-show="!showPrompt")
      | {{$t("team_schedule.cancelLabel")}}
      a.team-scheduler-form__cancel-prompt--cancel(@click="showPrompt = !showPrompt")  {{$t("team_schedule.cancelButton")}}
    p(v-show="showPrompt")
      | Are you sure ?
      a.team-scheduler-form__cancel-prompt--yes(@click="$emit('job-form:cancel-job', scheduledJob.jobId)")
        | Yes
      a.team-scheduler-form__cancel-prompt--no(@click="showPrompt = false")
        | No
  //- pre {{scheduledJob}}
</template>

<script>
import DateTimeUtils from "@/utils/dateUtils.js"
import { Interval, DateTime } from "luxon"

export default {
  props: {
    scheduledJob: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showPrompt: false,
    }
  },
  computed: {
    isEditable() {
      return this.scheduledJob.status.id <= 5
    },
    date() {
      return this.scheduledJob.startTime
        ? DateTimeUtils.getDateFromSQL(this.scheduledJob.startTime)
        : ""
    },
    startTime() {
      return this.scheduledJob.startTime
        ? DateTimeUtils.getTimeFromSQL(this.scheduledJob.startTime)
        : ""
    },
    endTime() {
      return this.scheduledJob.endTime
        ? DateTimeUtils.getTimeFromSQL(this.scheduledJob.endTime)
        : ""
    },
    totalTime() {
      return this.scheduledJob.startTime
        ? `${
            Interval.fromDateTimes(
              DateTime.fromSQL(this.scheduledJob.startTime),
              DateTime.fromSQL(this.scheduledJob.endTime)
            )
              .toDuration("hours")
              .toObject().hours
          }h`
        : ""
    }
  },
  watch: {
    scheduledJob() {
      this.showPrompt = false
    }
  },
}
</script>

<style lang="stylus">
.team-scheduler-form
  &__button-row
    display flex

    .base-input
      &:first-child
        margin-right 10px




  &__cancel-prompt
    margin-top 20px
    text-align right
    a
      &:hover
        color #FF3939

    &--cancel,
    &--yes,
    &--no
      min-width 50px
      margin-left 10px
      border 1px solid #FF3939
      color #FF3939
      padding 5px 10px
      border-radius 6px
    &--no
      color $primary
      border-color $primary
      &:hover
        color $primary !important



</style>
