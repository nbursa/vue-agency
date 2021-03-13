<template lang="pug">
  .columns.job-submit-control
    .column.is-6.hidden
    .column.is-6(style="min-width: 480px")
      .control-tab
        .is-clearfix.linked-jobs
          .has-text-grey-dark.has-text-weight-semibold.is-pulled-left {{$t("jobs_submit.switch_linked")}}
          v-switch(
            v-model="switcher"
            v-tooltip.bottom-start="$t('tooltips.job_submit.linked_jobs')"
          )
        base-button.spacer(v-if="isAddToPoolEnabled" @click="poolSubmit" :disabled="!getValidJob || !getValidBreak" v-tooltip.bottom-start="$t('tooltips.job_submit.add_to_pool')") {{$t("jobs_submit.add_pool")}}
        base-button.spacer(@click="onDocumentSave" :disabled="!getValidJob || !getValidBreak" v-tooltip.bottom-start="$t('tooltips.job_submit.find_candidates')") {{$t("jobs_submit.button_find")}}
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VSwitch from '@/components/shared/switcher/VSwitch'
import { Interval, DateTime } from 'luxon'
import DateTimeUtils from '@/utils/dateUtils.js'
import { errorDefaults, successDefaults } from '@/config/notifications'

export default {
  name: 'VSubmitJobControl',
  components: {
    VSwitch
  },
  data() {
    return {
      isDisabled: true
    }
  },
  computed: {
    ...mapState('jobSubmission', [
      'job',
      'generatedJobs',
      'candidates',
      'isSaved',
      'errors'
    ]),
    ...mapState('agencies', ['agencies']),
    ...mapGetters('jobSubmission', ['getValidJob', 'getValidBreak']),
    switcher: {
      get() {
        if (this.job.requestType === 1) {
          return false
        } else {
          return true
        }
      },
      set(value) {
        if (value === true) {
          value = 2
        } else {
          value = 1
        }
        this.updateFieldValue({
          requestType: value
        })
      }
    },
    isAddToPoolEnabled() {
      return this.agencies[0] && this.agencies[0].isAddToPollEnabled
    }
  },
  watch: {
    candidates: function (candidates) {
      if (candidates.length === 0) {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          text: this.$t('jobs_submit.tooltip_error')
        })
        this.$notify(e)
      } else {
        this.$router.push({ path: '/__select-candidates' })
      }
    },
    getErrors: function (errors) {
      if (Object.keys(errors).length !== 0) {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          text: 'There was an error - please try again.'
        })
        this.$notify(e)
      }
    },
    isSaved: function (value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: 'foo',
          text: 'Job successfully added to pool!'
        })
        this.$notify(e)
        this.$router.push({ path: '/jobs' })
      }
    }
  },
  methods: {
    ...mapActions('jobSubmission', ['findCandidates', 'saveJob']),
    ...mapActions('jobSubmission', ['updateFieldValue']),
    onDocumentSave() {
      const params = {
        jobTypeId: this.job.jobTypeId.id,
        gradeId: this.job.gradeId.id,
        agencyId: this.job.agencyId.id,
        requestType: this.job.requestType,
        attributeValues: this.job.attributeValues.map((item) => {
          return { id: item.id }
        }),
        jobs: this.generatedJobs.map((item) => {
          return {
            clientId: item.clientId,
            startTime: DateTimeUtils.getDateWithTime(
              item.startTime,
              item.startHours
            ),
            endTime: DateTimeUtils.getDateWithTime(item.endTime, item.endHours),
            numberOfTemps: item.numberOfTemps.label,
            bonuses: item.bonuses,
            [this.job.isRateChangeable && 'rate']: this.job.rateOverride.rate,
            [this.job.isRateChangeable && 'margin']: this.job.rateOverride
              .monetary
          }
        })
      }
      this.findCandidates(params)
    },
    poolSubmit() {
      const params = {
        jobTypeId: this.job.jobTypeId.id,
        gradeId: this.job.gradeId.id,
        paymentType: this.job.paymentType.id,
        requestType: this.job.requestType,
        isForEmployees: true,
        agencyId: this.job.agencyId.id,
        attributeValues: this.job.attributeValues.map((item) => {
          return { id: item.id }
        }),
        breakMinutes: this.job.breakMinutes ? this.job.breakMinutes.label : 0,
        isBreakPayable:
          this.job.isBreakPayable === null ? false : this.job.isBreakPayable,
        isBreakChangeable:
          this.job.isBreakChangeable === null
            ? false
            : this.job.isBreakChangeable,
        jobs: this.generatedJobs.map((job) => {
          return {
            clientId: job.clientId,
            startTime: DateTimeUtils.getDateWithTime(
              job.startTime,
              job.startHours
            ),
            endTime: DateTimeUtils.getDateWithTime(job.endTime, job.endHours),
            numberOfTemps: job.numberOfTemps,
            bonuses: job.bonuses || [],
            [this.job.isRateChangeable && 'rate']: this.job.rateOverride.rate,
            [this.job.isRateChangeable && 'margin']: this.job.rateOverride
              .monetary
          }
        })
      }
      this.saveJob(params)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/variables';



.job-submit-control {
  height: 74px;
  .border-left {
    border-left: 1px solid #DFE6EB;
  }
  .spacer {
    margin-left: 20px;
    margin-right: 10px;
  }
  .control-tab {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content:  flex-end;

    .linked-jobs {
      display:flex;
      align-items:center;
      justify-content: center;
    }
  }
  .hidden {
    max-width: calc(100% - 440px)
    @media (max-width: $display-tablet-portrait) {
      display: none;
    }
  }

}
</style>
