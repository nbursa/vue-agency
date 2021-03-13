<template lang="pug">
  .job__tab
    .job__tab--details.has-text-grey-light  {{ index + 1 }}
    .job__tab--details {{ job.startTime }}
    .job__tab--details
      .job__tab--dropdowns
        .is-pulled-left
          c-time-dropdown.time-panel__dropdown(
            :data="startTimeOptions"
            @input="setStartTime"
            :value="job.startHours"
            )
        .is-pulled-left(style="margin: 0 5px")
          div -
        .is-pulled-left.is-relative
          c-time-dropdown.time-panel__dropdown(
            :data="endTimeOptions"
            @input="setEndTime"
            :value="job.endHours"
          )
          .job__tab--crossover(v-if="isCrossoverJob" v-tooltip.top-start="$t('tooltips.job_submit.crossover')") +1
    .job__tab--details
      svgicon.icon(name="job-schedule/candidates-normal" :fill="false" width="24" height="25")
      .temp-number {{ job.numberOfTemps.label }}

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CTimeDropdown from '@/components/shared/dropdown/CTimeDropdown.vue'
import { getIncrementTimeOptions } from './timeOptions'
import { errorDefaults, successDefaults } from '@/config/notifications'
import DateTimeUtils from '@/utils/dateUtils.js'

export default {
  name: 'JobTab',
  components: {
    CTimeDropdown
  },
  props: {
    job: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      multiple: false,
      endTime: this.job.endHours,
      endTimeOptions: getIncrementTimeOptions()
    }
  },
  computed: {
    isCrossoverJob: function () {
      return DateTimeUtils.compareTime(
        {
          hours: Number(this.job.endHours.split(':')[0]),
          minutes: Number(this.job.endHours.split(':')[1])
        },
        {
          hours: Number(this.job.startHours.split(':')[0]),
          minutes:
            Number(this.job.startHours.split(':')[1]) === 0
              ? 1
              : Number(this.job.startHours.split(':')[1]) //weird bug with luxon, with 0 hours and minutes takes the current time minutes by default, so in that case set minutes to 1
        }
      )
    },
    currentTime: function () {
      return (
        ('0' + new Date().getHours()).slice(-2) +
        ':' +
        ('0' + new Date().getMinutes()).slice(-2)
      )
    },
    today: function () {
      return (
        ('0' + new Date().getDate()).slice(-2) +
        '.' +
        ('0' + (new Date().getMonth() + 1)).slice(-2) +
        '.' +
        new Date().getFullYear() +
        '.'
      )
    },
    startToday: function () {
      return this.job.startTime === this.today
    },
    getIncrementTimeOptionsFromNow: function () {
      let fromNow = getIncrementTimeOptions().filter((time) => {
        return time.label > this.currentTime
      })
      fromNow.push({ id: 1, label: '00:00' })
      return fromNow
    },
    startTimeOptions: function () {
      return this.startToday
        ? this.getIncrementTimeOptionsFromNow
        : getIncrementTimeOptions()
    }
  },
  mounted() {
    this.updateToday()
  },
  methods: {
    ...mapActions('jobSubmission', [
      'updateJobStartTime',
      'updateJobEndTime',
      'deleteJob'
    ]),
    updateToday() {
      if (
        this.startToday &&
        this.job.startHours < this.startTimeOptions[0].label
      ) {
        this.setStartTime(this.startTimeOptions[0].label)
      }
    },
    setStartTime(val) {
      this.updateJobStartTime({
        id: this.index,
        time: val
      })
    },
    setEndTime(val) {
      this.updateJobEndTime({
        id: this.index,
        time: val
      })
    },
    onJobDelete() {
      if (this.index > 0) {
        this.deleteJob({
          id: this.index,
          job: this.job
        })
      } else {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          text: 'Last job cannot be deleted'
        })
        this.$notify(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';

.job__tab {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
  min-height: 46px;
  width: 100%;
  border-radius: 3px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover {
    .job__tab--remove {
      display: block;
    }
  }

  &:first-child {
    flex: 2;

    @media (max-width: $display-small-desktop) {
      font-size: 14px;
    }
  }

  &.is-active {
    border: 1px solid #2898FF;
  }

  &--dropdowns {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .job__tab--details {
    padding: 0 0.5em;
    position: relative;
    font-weight: 600;

    .icon {
      color: #19A6BE;
    }

    .temp-number {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 2.5em;
      top: 0.2em;
    }
  }

  .job__tab--remove {
    display: none;
    position: absolute;
    padding: 0.2em;
    right: 1em;
    height: 32px;
    width: 32px;
    border-radius: 3px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    cursor: pointer;

    .icon {
      color: #CB1B1B;
    }
  }

  .jobtime_dropdown {
    width: 80px;
  }

  &--crossover {
    position: absolute;
    right: -13px;
    top: -7px;
    background-color: $primary;
    color: white;
    border-radius: 16px;
    text-align: center;
    font-size: 10px;
    height: 20px;
    border: 2px solid white;
    display: flex;
    padding: 0 4px;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    font-weight: 600;
  }
}
</style>
