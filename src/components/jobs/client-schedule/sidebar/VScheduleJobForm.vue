<template lang="pug">
  div.schedule-job
    div.schedule-job__header(@click.prevent="open = !open")
      p.schedule-job__header--title {{job.jobType.name}}
      p.schedule-job__header--date {{startTime}} - {{endTime}}
      div.schedule-job__header--candidate
        span(v-if="!job.candidate") {{$t("navbarleft.nocandidates")}}
        .schedule-job__header--candidate-list(v-if="job.candidate")
          .candidate
            .image
              img(:src="job.candidate.image" v-if="job.candidate.image")
              .initials(v-else) {{ `${job.candidate.firstName.charAt(0) }${ job.candidate.lastName.charAt(0) }` }}
            .name
              | {{ `${job.candidate.firstName } ${ job.candidate.lastName }` }}

      a.schedule-job__header--arrow
        font-awesome-icon(:icon="arrows")
    transition(name="schedule-slide-out")
      div.schedule-job__details(v-show="open")
        div.schedule-job__details--info
          p
            span  {{ $t('team_schedule.jobId') }}
            span {{job.jobId}}
          p
            span {{ $t('team_schedule.jobStatus') }}
            span {{job.status.name}}
          p
            span {{ $t('team_schedule.totalTime') }}
            span {{ totalTime || "--"}}
        div.schedule-job__details--editables
          base-input(
            :value="calDate"
            :label="$t('team_schedule.date')"
            :disabled="true"
          )
          div.schedule-job__details--button-row
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
          div.schedule-job__details--candidates
            div.schedule-job__details--candidates-label
              span {{ $t('team_schedule.candidate') }}

              //- REMOVE EXTRA JOB PROPERTY FROM EMIT
              a(@click.prevent="$emit('job-form:edit-candidate', { jobId: job.jobId, currentCandidate: job.candidate , job: job})" :class="{'schedule-job__details--is-disabled': !isEditable}") {{ $t('global.edit') }}

            div.schedule-job__details--candidate-item(v-if="job.candidate")
              div.name
                img(:src="job.candidate.image" v-if="job.candidate.image")
                p.placeholder(v-if="!job.candidate.image && job.candidate") {{ `${job.candidate.firstName.charAt(0) }${ job.candidate.lastName.charAt(0) }` }}
                p
                  span {{ `${job.candidate.firstName } ${ job.candidate.lastName }` }}
              div.time
                span {{hoursAvailable}}
                span h
              //- a(@click.prevent="$emit('job-form:update-job', { jobId: job.id, userId: null })")
                //- svgicon(name="user-roles/Remove" :fill="false" color="#DC1313")

    <!-- pre {{job}} -->

</template>

<script>
import DateTimeUtils from '@/utils/dateUtils.js'
import { Interval, DateTime } from 'luxon'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    job: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    schedulerInterval: {
      type: String,
      required: true,
      default: 'week'
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    isEditable() {
      return this.job.status.id <= 5
    },
    arrows() {
      return this.open ? faArrowUp : faArrowDown
    },
    totalTime() {
      let t = `${
        Interval.fromDateTimes(
          DateTime.fromSQL(this.job.startTime),
          DateTime.fromSQL(this.job.endTime)
        )
          .toDuration('hours')
          .toObject().hours
      }h`
      let diff = DateTime.fromSQL(this.job.endTime).diff(
        DateTime.fromSQL(this.job.startTime),
        ['hours', 'minutes']
      )
      let formatedTimeDifference =
        diff.hours +
        ':' +
        (('' + diff.minutes).length === 1 ? '0' + diff.minutes : diff.minutes) +
        'h'
      return this.job.startTime ? formatedTimeDifference : ''
    },
    calDate() {
      return this.job.startTime && this.job.endTime
        ? DateTimeUtils.getDateFromSQL(this.job.startTime) <
          DateTimeUtils.getDateFromSQL(this.job.endTime)
          ? DateTimeUtils.getDateFromSQL(this.job.startTime) +
            ' - ' +
            DateTimeUtils.getDateFromSQL(this.job.endTime)
          : DateTimeUtils.getDateFromSQL(this.job.startTime)
        : ''
    },
    startTime() {
      return this.job.startTime
        ? DateTimeUtils.getTimeFromSQL(this.job.startTime)
        : ''
    },
    endTime() {
      return this.job.endTime
        ? DateTimeUtils.getTimeFromSQL(this.job.endTime)
        : ''
    },
    hoursAvailable() {
      let candidate = this.job.candidate
      let hoursWorked = candidate.hoursWorked
      let totalHours =
        this.schedulerInterval === 'week'
          ? candidate.weeklyHours
          : candidate.monthlyHours === '0' || candidate.monthlyHours === null
          ? candidate.weeklyHours * 4
          : candidate.monthlyHours
      return `${DateTimeUtils.getMinifiedTime(hoursWorked)}/${totalHours}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.schedule-slide-out-enter-active, .schedule-slide-out-leave-active {
  transition: all 0.3s;
  max-height: 1500px;
}

.schedule-slide-out-enter, .schedule-slide-out-leave-to {
  opacity: 0;
  max-height: 0px;
}

.schedule-job {
  margin-top: 15px;
  min-height: 110px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.08);

  &__header {
    min-height: 110px;
    padding: 15px 35px 15px 20px;
    position: relative;
    cursor: pointer;

    &--title {
      font-size: 1.125em;
      line-height: 1.5em;
      font-weight: 600;
    }

    &--date {
      opacity: 0.6;
      color: #2F3439;
    }

    &--arrow {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #656565;
    }

    &--candidate {
      padding-top: 10px;
      display: flex;

      span {
        margin-top: 9px;
        font-size: 0.75em;
        opacity: 0.6;
        color: #2F3439;
        margin-right: 10px;
      }
    }

    &--candidate-list {
      display: inline-flex;
      align-items: center;
      .candidate {
        display: flex;
        align-items: center;
        .image {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 10px;
          .initials {
            width: 30px;
            height 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #f2f4f7;
          }
          > img {
            max-width: 30px;
            border-radius: 50%;
          }
        }
      }
    }
  }

  &__details {
    border-top: 1px solid #EBEBEB;

    &--is-disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    &--info {
      padding: 15px 20px;
      display: flex;
      justify-content: center;
    }

    p {
      flex: 1;

      span {
        &:first-child {
          display: block;
          color: #838D98;
          font-size: 0.813em;
        }

        &:last-child {
          display: block;
          color: #2F3439;
          font-size: 1.063em;
        }
      }
    }

    &--editables {
      padding: 0px 20px 15px 20px;
    }

    &--candidates {
      padding-top: 20px;
    }

    &--candidates-label {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: #2F3439;
      }

      a {
        padding: 0px 10px;
        border: 1px solid $primary;
        border-radius: 6px;
      }
    }

    &--button-row {
      display: flex;

      .base-input {
        &:first-child {
          margin-right: 10px;
        }
      }
    }

    &--candidate-item {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      >.name {
        display: flex;
        align-items: center;
        flex: 0 0 50%;

        .placeholder {
          margin-right: 10px;
          font-size: 1em;
          background-color: #f2f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          border-radius: 50%;
          height: 45px;
          width: 45px;
          max-width: 45px;
        }

        img {
          width: 45px;
          max-width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 10px;
        }

        span {
          display: block;

          &:first-child {
            color: #444444;
            font-size: 1em;
          }

          &:last-child {
            color: #9B9B9B;
            font-size: 0.875em;
            line-height: 1.188em;
          }
        }
      }

      >.time {
        span {
          &:first-child {
            display: inline-block;
            margin-right: 10px;
            border-radius: 7px;
            background: #F8F8F8;
            padding: 5px 10px;
          }
        }
      }
    }
  }
}
</style>
