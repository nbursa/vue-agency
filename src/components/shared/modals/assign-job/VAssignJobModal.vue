<template lang="pug">
transition(name="modal")
  .modal-background
    .modal-container(v-click-outside="closeModal")
      a.close(@click='closeModal')
        svgicon.icon(
          name='global/close'
          :width="'29'"
          :height="'29'"
          :fill='false'
        )
      div.assign-job
        div.assign-job__header
          span {{$t('candidate_details.assign_job_modal.title')}}

        perfect-scrollbar.assign-job__option-list
          div
            div.assign-job__time-picker
              //- div.label {{$t("jobs.picker_set")}}
              div.assign-job__time-picker-container
                v-pay-rate(
                  :items="startTimeOptions"
                  optionName="date"
                  v-if="startTimeOptions"
                  :disableBranchNodes="true"
                  :clear="false"
                  :multiple="false"
                  :normalizer="decorateDate"
                  @input="setStartTime"
                  @cleared="reset('startTime')"
                )
                  div(slot="label") {{$t("jobs.picker_start")}}

                div.splitter :

                v-pay-rate(
                  :items="endTimeOptions"
                  :normalizer="decorateDate"
                  optionName="date"
                  v-if="endTimeOptions"
                  :disableBranchNodes="true"
                  :clear="false"
                  :multiple="false"
                  @input="setEndTime"
                  @cleared="reset('endTime')"
                )
                  div(slot="label") {{$t("jobs.picker_end")}}

                  
            base-tree-select.assign-job__status-select(
              :items="statusList"
              optionName="status"
              :value="selectedStatus"
              :disableBranchNodes="true"
              @input="selectStatus"
              :multiple="false"
              valueFormat="object"
            )
              div(slot="label") {{$t("jobs_submit.select_status")}}


            v-job-options(
              :namespace="namespace"
              :placeholderPropForNumberOfCandidates="false"
              v-bind="{agencies, clients, jobTypes: candidateJobTypes, attributes: candidateAttributes, grades, job, bonuses}"
            )
        div.assign-job__footer
          base-button(@click="assign" :class="{'disabled': !canSubmit }") {{$t('candidate_details.assign_job_modal.submit_button')}}

</template>

<script>
import ClickOutside from 'vue-click-outside'
import { mapGetters, mapActions, mapState } from 'vuex'
import { HalfCircleSpinner } from 'epic-spinners'
import VJobOptions from '@/components/submit-job/VJobOptions'
import Job from '@/models/Job'
import { getIncrementTimeOptions } from '@/components/submit-job/timeOptions'
import { translateArray } from '@/utils/general'
import DateTimeUtils from '@/utils/dateUtils.js'
import { errorDefaults, successDefaults } from '@/config/notifications'

import VPayRate from '@/components/rates/rates-filter/VPayRate'

const jobStatuses = [
  {
    id: 6,
    label: 'jobs.alt_status_signoff',
    group: 'finished'
  },
  {
    id: 7,
    label: 'jobs.alt_status_admin_signoff',
    group: 'finished'
  },
  {
    id: 8,
    label: 'jobs.alt_status_invoice',
    group: 'finished'
  }
]

export default {
  components: {
    HalfCircleSpinner,
    VJobOptions,
    VPayRate
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      namespace: 'candidateDetails/jobSubmit',
      statusList: translateArray(jobStatuses, 'label'),
      selectedStatus: null,
      isLoading: false,
      startTimeOptions: getIncrementTimeOptions(),
      endTimeOptions: getIncrementTimeOptions()
    }
  },
  computed: {
    ...mapGetters('modals', ['modalData']),
    ...mapState('agencies', ['agencies']),
    ...mapState('jobTypes', ['jobTypes']),
    ...mapState('attributes', ['attributes']),
    ...mapState('clients', ['clients']),
    ...mapState('grades', ['grades']),
    ...mapState('bonuses', ['bonuses']),
    ...mapGetters('attributes', [
      'getAttributeValues',
      'getAttributesWithChildren'
    ]),
    ...mapState({
      job(state) {
        return state.candidateDetails.jobSubmit.job
      }
    }),
    candidateJobTypes() {
      return {
        name: 'jobTypes',
        id: 0,
        children: this.modalData.candidateData.jobTypes
      }
    },
    candidateAttributes() {
      return this.modalData.candidateData.attributeValues
    },
    canSubmit() {
      return (
        this.job.agencyId &&
        this.job.jobTypeId &&
        this.job.gradeId &&
        this.job.paymentType &&
        this.job.clientId &&
        this.job.startHours &&
        this.job.endHours &&
        this.selectedStatus
      )
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
  mounted() {
    this.getAgencies()
    this.getJobTypesWithChildren()
    this.getClientsWithChildren()
    this.getAttributes()
    this.getGrades()
    this.getAllBonuses({ responseType: 'all' })
  },
  beforeDestroy() {
    this.resetJob()
  },
  methods: {
    ...mapActions('modals', ['closeModal']),
    ...mapActions('agencies', ['getAgencies']),
    ...mapActions('jobTypes', ['getJobTypesWithChildren']),
    ...mapActions('attributes', ['getAttributes']),
    ...mapActions('clients', ['getClientsWithChildren']),
    ...mapActions('grades', ['getGrades']),
    ...mapActions('bonuses', ['getAllBonuses']),

    ...mapActions({
      updateFieldValue(dispatch, payload) {
        return dispatch('candidateDetails/jobSubmit/updateFieldValue', payload)
      },
      resetJob(dispatch) {
        return dispatch('candidateDetails/jobSubmit/resetJob')
      },
      submitJob(dispatch, payload) {
        return dispatch('candidateDetails/submitJob', payload)
      }
    }),
    setStartTime(v) {
      let l = getIncrementTimeOptions().find((i) => i.id === v.date).label
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
    selectStatus(v) {
      this.selectedStatus = v
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
    async assign() {
      if (!this.canSubmit) return false
      const candidateJob = {
        agencyId: this.job.agencyId.id,
        userId: this.modalData.candidateData.id,
        jobTypeId: this.job.jobTypeId.id,
        gradeId: this.job.gradeId.id,
        paymentType: this.job.paymentType.id,
        isBreakChangeable: this.job.isBreakChangeable ? 1 : 0,
        attributeValues: this.job.attributeValues,
        breakMinutes: this.job.breakMinutes ? this.job.breakMinutes.label : 0,
        isBreakPayable: this.job.isBreakPayable
          ? this.job.isBreakPayable
          : false,
        clientId: this.job.clientId.id,
        bonuses: this.job.bonuses
          ? this.job.bonuses.map((bonus) => {
              return {
                id: bonus.id
              }
            })
          : [],
        start_time: DateTimeUtils.getDateWithTime(
          DateTimeUtils.getDateFromLuxonObject(this.modalData.cellData),
          this.job.startHours
        ),
        endTime: DateTimeUtils.getDateWithTime(
          DateTimeUtils.getCrossoverDate(
            this.job.startHours,
            this.job.endHours,
            DateTimeUtils.getDateFromLuxonObject(this.modalData.cellData)
          ),
          this.job.endHours
        ),
        job_status: this.selectedStatus.status.id,
        note: ''
      }
      try {
        let response = await this.submitJob(candidateJob)
        const msg = this.$merge(successDefaults, {
          group: 'foo',
          text: this.$t('global.toast_success_generic')
        })
        this.$parent.extremePlaceholder = false
        setTimeout(() => {
          this.$parent.extremePlaceholder = true
        }, 1)
        this.$notify(msg)
        this.closeModal()
        console.log('RESPONSE', response)
      } catch (e) {
        const msg = this.$merge(errorDefaults, {
          group: 'foo',
          text: this.$t('global.toast_error_generic')
        })
        this.$notify(msg)
        console.log('error', e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';

.disabled
  opacity 0.5
  pointer-events none
.modal-background
  display flex
  justify-content center
  .modal-container
    margin 120px 0 0 65px
    height 80vh
    width 500px
  .close
    z-index 20
.assign-job
  overflow hidden
  &__header
    color #202123
    padding 20px 30px
    border 0
    top 0
    width 100%
    position absolute
    border-radius 3px 3px 0 0
    background-color: $highlightGray;
    border-bottom 1px solid #dfe6eb
    border-top-right-radius 9px
    border-top-left-radius 9px
    text-align center
    z-index 9
    > span
      font-weight bold
      font-size 18px
      text-align center
  &__status-select
    padding 1em 1.5em 0 1.5em
  &__time-picker
    padding 1em 1.5em 0em 1.5em;
    > label
      margin-bottom 0px
    .splitter
      margin 0 10px
  &__time-picker-container
    display flex
    align-items center
  &__option-list
    margin-top 60px
    height 70vh
    overflow hidden
  &__footer
    position absolute
    bottom 0
    width 100%
    z-index 9
    padding 0.8em
    background-color #fff
    box-shadow 0 -2px 5px 1px rgba(0,0,0,0.03)
    border-bottom-right-radius 9px
    border-bottom-left-radius 9px
    display flex
    justify-content flex-end
</style>
