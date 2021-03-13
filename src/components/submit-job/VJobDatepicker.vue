<template lang="pug">
div#submit-job-calendar
  .set-jobtime(:class="{'disabled': !showTime}")
    .set-jobtime-container
        .set-jobtime-container__box.is-clearfix
          .label {{$t("jobs.picker_set")}}
          v-pay-rate(
            :items="startTimeOptions"
            optionName="date"
            v-if="startTimeOptions"
            :disableBranchNodes="true"
            :clear="clear"
            :multiple="multiple"
            :normalizer="decorateDate"
            :mountCallback="{ callback: jobTimeCallback, keyTarget: 'startHours' }",
            @input="setStartTime"
            @cleared="reset('startTime')"
          )
            div(slot="label") {{$t("jobs.picker_start")}}
        .splitter :
        .set-jobtime-container__box
          .label
          v-pay-rate(
            :clear="clear"
            :items="endTimeOptions"
            optionName="date"
            v-if="endTimeOptions"
            :disableBranchNodes="true"
            :multiple="multiple"
            :mountCallback="{ callback: jobTimeCallback, keyTarget: 'endHours' }",
            :normalizer="decorateDate"
            @input="setEndTime"
            @cleared="reset('endTime')"
          )
            div(slot="label") {{$t("jobs.picker_end")}}

  .submit-job-calendar(:class="{'disabled': !showCalendar}")
    flatpickr(
      :options="config"
      v-model="dateCal"
      @change="formatDate"
      ref="flatpickr"
      :showInternalInput="true"
    )

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import flatpickr from '@/components/shared/flat-pickr'
import DateTimeUtils from '@/utils/dateUtils.js'
import 'flatpickr/dist/flatpickr.css'
import VPayRate from '@/components/rates/rates-filter/VPayRate'
import { getIncrementTimeOptions } from './timeOptions'

const $vm = this

export default {
  components: {
    flatpickr,
    VPayRate
  },
  data() {
    return {
      date: null,
      modifyTime: false,
      multiple: false,
      clear: false,
      config: {
        mode: 'multiple',
        clickOpens: false,
        inline: true,
        minDate: 'today'
      },
      startTimeOptions: getIncrementTimeOptions(),
      endTimeOptions: getIncrementTimeOptions()
    }
  },
  computed: {
    ...mapState('jobSubmission', ['job', 'meta', 'status']),
    ...mapGetters('jobSubmission', ['showCalendar', 'showTime']),
    dateCal: {
      set(val) {
        this.date = val
      },
      get() {
        let jsDate = this.job.selectedDates
          .map((item) => {
            return DateTimeUtils.getDateTimeFromClient(item)
          })
          .join()
          .replace(/,/g, ', ')
        return this.date || jsDate
      }
    }
  },
  watch: {
    startTimeOptions: function (v) {
      if (v === getIncrementTimeOptions()) {
        this.endTime = 0
      }
    },
    endTimeOptions: function (v) {
      if (v === getIncrementTimeOptions()) {
        this.startTime = 0
      }
    }
  },
  methods: {
    ...mapActions('jobSubmission', ['updateFieldValue']),
    formatDate(date) {
      this.updateFieldValue({
        selectedDates: date
      })
    },
    toggleCalendarPastDate(startTime) {
      let isTimeInPast = DateTimeUtils.compareTime({
        hours: Number(startTime.split(':')[0]),
        minutes: Number(startTime.split(':')[1])
      })
      if (isTimeInPast) {
        this.$refs.flatpickr.flatpicker.set('disable', [
          DateTimeUtils.getCurrentDate()
        ])
      } else {
        this.$refs.flatpickr.flatpicker.set('disable', [])
      }
    },
    setStartTime(v) {
      let l = getIncrementTimeOptions().find((i) => i.id === v.date).label
      this.toggleCalendarPastDate(l.split(' ')[0])
      this.updateFieldValue({
        startHours: l.split(' ')[0]
      })
    },
    setEndTime(v) {
      let l = getIncrementTimeOptions().find((i) => i.id == v.date).label
      this.updateFieldValue({
        endHours: l.split(' ')[0]
      })
    },
    modifyEndTime(data) {
      let index = data.date
      if (index) {
        this.endTimeOptions = this.startTimeOptions.filter(
          (item) => item.id > index
        )
      }
    },
    jobTimeCallback: function (context, keyTarget) {
      let preset = context.items.find(
        (item) => item.label === this.job[keyTarget]
      )
      if (preset !== undefined) {
        context.selected = {
          [context.optionName]: preset.id
        }
      }
    },

    decorateDate: function (item) {
      let formatTime =
        this.$localization && this.$localization.timeFormat
          ? DateTimeUtils.getFormattedTime(item.label)
          : item.label
      return {
        id: item.id,
        label: formatTime
      }
    },
    reset(val) {
      this[val] = 0
    }
  }
}
</script>
<style lang="stylus">
@import '~@/assets/styles/global/partials/flatpickr-submit-job';
</style>
<style lang="stylus" scoped>

.submit-job-calendar {
  padding: 0 10px;
  width: 100%;
  display: inline-block;
  position relative
  .flatpickr-calendar {
    position: relative !important;
  }
}

.disabled {
  pointer-events none
  opacity .5
}

.set-jobtime {
  margin-top: 1em;
  padding-bottom: 1em;
}

.set-jobtime-container {
  padding: 1em;
  display: flex;
  align-items: center;
  @media (max-width: $display-small-desktop) {
    flex-wrap: wrap;
  }

  &__inner {
    display: flex;
    align-items: center;
  }

  &__box {
    flex: 1;
    @media (max-width: $display-small-desktop) {
      flex: 0 0 100%;
    }


    .label {
      height: 15px;
      margin-bottom: 1.2em;
    }

    .rate {
      margin-top: 0 !important;
      &__label {
        width: calc(100% - 40px);
        text-align:center;
      }
      .vue-treeselect {
        &__single-value {
          text-align:center;
          padding-left: 25px;
        }
      }
    }

    .show-time {
      box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
      padding: 1em;
      text-align: center;
      font-weight: 600;
      cursor: pointer;
      position: relative;

      &:hover {
        .cancel {
          display: block;
        }
      }

      .cancel {
        display: none;
        width: 20px;
        height: 20px;
        position: absolute;
        right: -5px;
        top: -12px;

        .icon {
          color: red;
        }
      }
    }
  }

  .splitter {
    display: flex;
    align-items: center;
    margin: 0em 1em 0 1em;
    font-size: 18px;
    padding-top: 1.5em;
    @media (max-width: $display-small-desktop) {
      display: none;
    }
  }
}
</style>
