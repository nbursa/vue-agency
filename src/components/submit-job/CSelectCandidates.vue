<template lang="pug">
  div
    .section
      .columns
        .column.job-submit-content-box
          .panel
            .panel-heading
              h1 {{$t("offer_jobs.page_title")}}
            .panel-block
              .columns
                .column.is-8.is-paddingless.panel--overflow.job-left-panel
                  table-component(
                    :data="getCandidateList"
                    :columns="columns"
                    :meta="meta"
                    :type="type"
                    selectType="multi"
                    :isLoading="status"
                  )

                .column(style="position:relative")
                  .panel--overflow.job-mid-panel
                    v-job-details
                  .sidebar-footer
                    base-button(
                      @click="save"
                      :disabled="!checkedLength"
                      ) {{ $t("offer_jobs.button_submit") }}
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import BaseTablePage from '@/components/shared/base-components/BaseTablePage'
import searchOptions from './search.options'
import dropdownOptions from './dropdown.options'
import VJobDetails from './VJobDetails'
import { Interval, DateTime } from 'luxon'
import { errorDefaults, successDefaults } from '@/config/notifications'
import DateTimeUtils from '@/utils/dateUtils.js'
import profileLink from '@/components/candidates/VProfileLink.vue'
import VCandidatePortrait from './VCandidatePortrait'

export default {
  components: {
    VJobDetails,
    profileLink,
    VCandidatePortrait
  },
  extends: BaseTablePage,
  data() {
    return {
      advancedSearchOptions: searchOptions,
      dropdownOptions: dropdownOptions,
      namespace: 'jobSubmission',
      type: 'jobSubmission/table',
      meta: {},
      status: false,
      columns: [
        {
          component: VCandidatePortrait,
          label: 'offer_jobs.table_column_1'
        },
        {
          show: 'jobTypes[0].grade.name',
          label: 'offer_jobs.table_column_2'
        },
        {
          component: profileLink,
          label: 'candidates.table_column_4'
        }
      ]
    }
  },
  computed: {
    ...mapState('jobSubmission', [
      'job',
      'candidates',
      'generatedJobs',
      'isSaved',
      'errors'
    ]),
    ...mapState('jobSubmission/table', ['checked']),
    ...mapGetters('jobSubmission', ['getCandidateList']),
    ...mapGetters('jobSubmission/table', ['checkedLength']),
    getErrors() {
      return this.errors
    }
  },
  watch: {
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
          text: 'Invitation sent!'
        })
        this.$notify(e)
        this.$router.push({ path: '/jobs' })
      }
    }
  },
  methods: {
    ...mapActions('jobSubmission', ['saveJob', 'clearCandidatesList']),
    ...mapActions('jobSubmission/table', ['clearCheckedItems']),
    onSearchChange() {},
    fetchData(pageNo) {},
    save() {
      const params = {
        jobTypeId: this.job.jobTypeId.id,
        gradeId: this.job.gradeId.id,
        paymentType: this.job.paymentType.id,
        requestType: this.job.requestType,
        agencyId: this.job.agencyId.id,
        attributeValues: this.job.attributeValues.map((item) => {
          return { id: item.id }
        }),
        users: this.checked.map((i) => {
          return {
            id: i.id
          }
        }),
        note: this.job.note,
        breakMinutes: this.job.breakMinutes ? this.job.breakMinutes.label : 0,
        isBreakPayable:
          this.job.isBreakPayable === null ? false : this.job.isBreakPayable,
        isBreakChangeable:
          this.job.isBreakChangeable === null
            ? false
            : this.job.isBreakChangeable,
        isForEmployees: this.job.isForEmployees
          ? this.job.isForEmployees
          : false,
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
      this.saveJob(params).then(() => {
        this.clearCheckedItems()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/components/JobSubmitPanels'

.panel-heading {
  h1 {
    color: $fontDark;
  }
}

.job-mid-panel {
  box-shadow: 0 2px 9px 0 rgba(0,0,0,0.15);
  border-radius: 4px;
  margin: 20px 20px 10px 20px;
}

.job-submit-content-box {
  .panel {
    padding-bottom: 5px;
    &--overflow {
      height: 68vh;
    }
  }
}

.sidebar-footer {
  width: calc(100% - 4rem);
  position: absolute;
  z-index: 8;
  bottom: 19px;
  left: 32px;
  padding: 1em 1em 1em 1em;
  box-shadow 0px -3px 6px 0 rgba(0,0,0,0.15)
  background-color #fff
  span {
    position relative
    top 0.2em
    }
}
</style>
