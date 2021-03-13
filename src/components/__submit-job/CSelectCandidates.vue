<template lang="pug">
  .columns.job-submit-columns
        .column.job-submit-content-box
          .panel
            v-job-header(
              :nextLabel="submitText[jobType]"
              :nextEnabled="getEnabled"
              :onNextClick="submitJob"
              :previusEnabled="['details', 'schedule']"
              active="candidates" 
              :onCancelClick="() => this.$router.push({ path: '/' })")
            .panel-block.job-clients
              .job-clients__content.columns
                .column.is-6.tab
                  radio-options(
                    :selected="jobType"
                    @input="jobType=$event"
                    :options="getOfferOptions"
                  )
                  radio-options(
                    v-if="jobType === 'offer' || jobType === 'vacancy'"
                    :selected="job.requestType"
                    @input="updateRequest"
                    :title="$t('jobs_submit.job_header_radio_options_offer_type')"  
                    :options="requestOptions"
                  )
                  radio-options(
                    v-if="jobType === 'offer'"
                    :selected="sendType"
                    @input="updateSendOptions"
                    :title="$t('jobs_submit.job_header_radio_options_send')" 
                    :options="sendOptions"
                  )
                  .sequent-options(v-if="sendType === 2")
                    .seqent-row
                      span.text-label Number of people in each group
                      base-input.new-layout(optionName="groupSize" inputType="number" @input="updateFieldValue" :value="job.groupSize" @focus="selectAll" ref="groupSize")  
                      span.text-label people
                    .seqent-row
                      span.text-label Time interval between each offer
                      base-input.new-layout(optionName="push_interval" inputType="number" @input="updateFieldValue" :value="job.push_interval" @focus="selectAll")  
                      span.text-label minutes
                  header.shifts-header
                      //- .checkbox-wrapper
                        //- base-checkbox.shift-chekbox(:value="allShifts" @input="selectAllShifts")
                      .headline-wrapper   
                        h2.font-semi-bold {{ $t("jobs_submit.select_candidates_shifts_header_shifts")}} ({{getShiftsArray.length}})  
                  .shifts-list(v-if="getShiftsArray.length > 0")
                      div(v-for="shift in getShiftsArray")
                        h3.font-semi-bold(v-if="!shift.parentId") {{shift.dateTitle}}
                        v-job-display-shift(
                          :shift="shift"
                          :key="shift.date.toString()"
                          :times="times"
                          )                             
                .column.is-6.tab.tab(v-if="jobType !== 'vacancy'")
                  v-candidate-list(
                    v-if="sendType === 1"
                    :searchEnabled="true"
                    :onSearch="searchCandidates"
                    :title="$t('jobs_submit.select_candidates_shifts_header_people')"              
                    :candidates="getCandidates"
                    :onSelectCandidate="selectCandidate"
                  )
                  .candidate-groups(v-if="sendType === 2")
                      v-candidate-list(
                        :hideList="!candidatesSearch"
                        :searchEnabled="true"
                        :onSearch="searchCandidates"
                        :title="$t('jobs_submit.group_offer_all', {count: getCandidates.length})"              
                        :candidates="getCandidates"
                        :selectable="false"
                        :key="0"
                        :group="-1"
                        :overeiideSelectAll="(val) => groupSelectAll = val"
                      )
                      v-candidate-list(
                        :drag="true"
                        :groupSendTime="intervalSendTime[i]"
                        v-for="group, i in candidateGroups"
                        :group="i"
                        :key="i + 1"
                        :searchEnabled="false"
                        :onSearch="searchCandidates"
                        :title="$t('jobs_submit.group', { no: i + 1 })"              
                        :candidates="group"
                        :onSelectCandidate="selectCandidate"
                        :preSelectedAll="groupSelectAll"
                    )
</template>
<script>
// TODO@mr add empty state search
import VJobHeader from './VJobHeader'
import { mapActions, mapGetters, mapState } from 'vuex'
import VJobCreateShift from './VJobCreateShift'
import { getIncrementTimeOptions } from '@/components/submit-job/timeOptions'
import { errorDefaults, successDefaults } from '@/config/notifications'
import VCandidateItem from './VCandidateItem'
import VJobDisplayShift from './VJobDisplayShift'
import RadioOptions from './RadioOptions'
import JobModal from './JobModal'
import SearchInput from './SearchInput'
import VCandidateList from './VCandidateList'

export default {
  components: {
    VJobHeader,
    VJobCreateShift,
    VCandidateItem,
    VJobDisplayShift,
    RadioOptions,
    JobModal,
    SearchInput,
    VCandidateList
  },
  data() {
    return {
      submitText: {
        offer: this.$t('jobs_submit.select_candidates_job_header_next_label'),
        assign: this.$t(
          'jobs_submit.select_candidates_job_header_next_label_assign'
        ),
        vacancy: this.$t('jobs_submit.add_pool')
      },
      intervalSendTime: false,
      sendIntervalTimeOut: false,
      groupSelectAll: false,
      allShifts: false,
      selectedShifts: [],
      times: getIncrementTimeOptions(),
      selectedCandidates: [],
      jobType: 'offer',
      requestOptions: [
        {
          label: this.$t(
            'jobs_submit.select_candidates_request_options_label_all'
          ),
          value: 2,
          disabled: false,
          description: this.$t(
            'jobs_submit.select_candidates_request_options_description_all'
          )
        },
        {
          label: this.$t(
            'jobs_submit.select_candidates_request_options_label_partial'
          ),
          value: 1,
          disabled: false,
          description: this.$t(
            'jobs_submit.select_candidates_request_options_description_partial'
          )
        }
      ],
      sendType: 1,
      sendOptions: [
        {
          label: this.$t(
            'jobs_submit.select_candidates_send_options_label_combined'
          ),
          value: 1,
          disabled: false,
          description: this.$t(
            'jobs_submit.select_candidates_send_options_description_combined'
          )
        },
        {
          label: this.$t(
            'jobs_submit.select_candidates_send_options_label_sequentially'
          ),
          value: 2,
          disabled: false,
          description: this.$t(
            'jobs_submit.select_candidates_send_options_description_sequentially'
          )
        }
      ]
    }
  },
  computed: {
    getEnabled() {
      if (this.jobType === 'vacancy') return ['']
      if (this.jobType === 'assign')
        return this.selectedCandidates.length ===
          this.getShiftsArray[0].positions * 1
          ? ['']
          : []
      return this.selectedCandidates.length > 0 ? [''] : []
    },
    getOfferOptions() {
      const assignDisabled = this.getShiftsArray.length > 1
      return [
        {
          label: this.$t('jobs_submit.radio_options_label_assign'),
          value: 'assign',
          disabled: assignDisabled,
          description: this.$t('jobs_submit.radio_options_description_assign')
        },
        {
          label: this.$t('jobs_submit.radio_options_label_offer'),
          value: 'offer',
          disabled: false,
          description: this.$t('jobs_submit.radio_options_description_offer')
        },
        {
          label: this.$t('jobs_submit.radio_options_label_vacancy'),
          value: 'vacancy',
          disabled: !this.isAddToPoolEnabled,
          description: this.$t('jobs_submit.radio_options_description_vacancy')
        }
      ]
    },
    ...mapState('_submitJob', [
      'job',
      'errors',
      'candidates',
      'isSaved',
      'candidateGroups',
      'candidatesSearch'
    ]),
    ...mapState('agencies', ['agencies']),
    ...mapGetters('_scheduleJob', ['getShiftsArray']),
    ...mapGetters('_submitJob', ['getCandidates']),
    isAddToPoolEnabled() {
      return this.agencies[0] && this.agencies[0].isAddToPollEnabled
    },
    getErrors() {
      return this.errors
    },
    params() {
      const {
        jobTypeId,
        gradeId,
        paymentType,
        agencyId,
        attributeValues,
        clientId,
        requestType,
        bonuses,
        isRateChangeable,
        rateOverride,
        breakMinutes,
        isBreakPayable,
        isBreakChangeable
      } = this.job
      return {
        sendType: this.sendType,
        jobTypeId: jobTypeId.id,
        gradeId: gradeId.id,
        paymentType,
        requestType,
        agencyId: agencyId.id,
        breakMinutes,
        isBreakPayable,
        isBreakChangeable,
        attributeValues: attributeValues.map(({ id }) => ({ id })),
        jobs: this.getShiftsArray.map(({ positions, startTime, endTime }) => {
          return {
            clientId: clientId.id,
            startTime,
            endTime,
            numberOfTemps: parseInt(positions) * 1,
            bonuses: bonuses && bonuses.map(({ id }) => id),
            [isRateChangeable && 'rate']: rateOverride.rate,
            [isRateChangeable && 'margin']: rateOverride.monetary
          }
        })
      }
    }
  },
  watch: {
    getErrors: function (errors) {
      if (errors.error) {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          text: errors.error
        })
        this.$notify(e)
      } else {
        if (Object.keys(errors).length !== 0) {
          if (errors[0] === 'No data, change search') {
            const e = this.$merge(errorDefaults, {
              group: 'foo',
              text: this.$t('jobs_submit.no_candidates_error_message')
            })
            return this.$notify(e)
          }

          const e = this.$merge(errorDefaults, {
            group: 'foo',
            text: this.$t('jobs_submit.select_candidates_is_error_text')
          })

          this.$notify(e)
          if (Object.keys(errors).length > 1) {
            Object.keys(errors).map((errorKey) => {
              this.$notify(
                this.$merge(errorDefaults, {
                  group: 'foo',
                  text: errors[errorKey][0]
                })
              )
            })
          }
        }
      }
    },
    isSaved: function (value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: 'foo',
          text: this.$t('jobs_submit.select_candidates_is_saved_text')
        })
        this.$notify(e)
        this.$router.push({ path: '/jobs' })
      }
    },
    sendType(value) {
      if (value === 2) {
        this.updateFieldValue({ groupSize: 3 })
        this.updateFieldValue({ push_interval: 15 })
        this.setIntervalSendTime()
        this.sendIntervalTimeOut = setInterval(() => {
          this.setIntervalSendTime()
        }, 1000 * 60)
      }
      if (value === 1) {
        this.setGroups(false)
        this.updateFieldValue({ groupSize: false })
        this.updateFieldValue({ push_interval: null })
        clearInterval(this.sendIntervalTimeOut)
      }
      this.selectedCandidates = []
    },
    job: {
      handler: function ({ groupSize, push_interval }) {
        if (groupSize * 1 > 0) {
          this.setGroups(true)
          this.setIntervalSendTime()
        }
      },
      deep: true
    },
    jobType: function (value) {
      if (value === 'assign') this.sendType = 1
    }
  },
  mounted() {
    this.findCandidates(this.params)
  },
  methods: {
    selectAll(e) {
      e.target.select()
    },
    setIntervalSendTime() {
      this.intervalSendTime = this.candidateGroups.map((group, i) => {
        const date = new Date()
        const minutes = this.job.push_interval * (i + 1)
        const time = new Date(date.getTime() + minutes * 60 * 1000)
        return time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      })
    },
    selectAllShifts() {
      this.allShifts = !this.allShifts
      if (this.allShifts)
        this.selectedShifts = this.getShiftsArray.map(({ id }) => id)
      if (!this.allShifts) this.selectedShifts = []
    },
    ...mapActions('_submitJob', [
      'findCandidates',
      'updateFieldValue',
      'saveJob',
      'filterCandidates',
      'setGroups'
    ]),
    selectCandidate(candidate, type) {
      if (type === 'add') {
        this.selectedCandidates.push({
          id: candidate.id,
          group: candidate.group ? candidate.group : null
        })
      }
      if (type === 'remove') {
        this.selectedCandidates = this.selectedCandidates.filter(
          ({ id }) => id !== candidate.id
        )
      }
    },
    selectShift(shift, type) {
      // TODO@mr refactor func to remove duplication
      if (type === 'add') this.selectedShifts.push(shift.id)
      if (type === 'remove')
        this.selectedShifts = this.selectedShifts.filter(
          (id) => id !== shift.id
        )
    },
    updateRequest(value) {
      this.updateFieldValue({ requestType: value })
      this.findCandidates(this.params)
    },
    updateSendOptions(value) {
      this.sendType = value
    },
    submitJob() {
      const { name, is_template, note, push_interval } = this.job
      if (this.selectedShifts.length === 0) {
        const params = {
          push_interval: push_interval,
          note,
          ...this.params,
          users: this.selectedCandidates.map(({ group, id }) => {
            return {
              id,
              group
            }
          })
        }
        if (this.jobType === 'vacancy') {
          params.isForEmployees = true
        }
        if (is_template) params.name = name
        if (this.jobType === 'assign') {
          params.is_assigned = true
        }
        if (this.sendType === 2) clearInterval(this.sendIntervalTimeOut)
        this.saveJob(params)
      }
    },
    searchCandidates(term) {
      this.filterCandidates(term)
    }
  }
}
</script>
<style lang="stylus">
.job-clients {
  background: #ffffff;
  padding: 0!important;
  flex-direction: column;
  &__content {
    padding: 0 .75rem;
  }
  .sequent-options {
    display: flex;
    flex-direction: column;
    .seqent-row {
       display: flex;
       flex-direction: row;
       align-items: center;
       margin-bottom: 10px;
       .text-label {
        font-size: 16px;
        line-height: 18px;
        color: #888888;
        &:first-of-type {
          min-width: 235px;
        }
      }
      input {
        max-width: 89px!important;
        margin-left: 10px!important;
        margin-right: 10px!important;
        max-height:35px!important
      }
    }
  }
   .columns {
    width: 100%;
    margin: 0!important;
  }
  h3 {
    font-size: 19px;
    font-weight: 500;
    line-height: 23px
    margin-bottom: 20px;
  }
  .tab {
    align-self: flex-start;
    h2 {
      font-size: 21px;
      line-height: 25px;
      font-weight: 500;
      &.center {
        margin: 0 auto;
      }
    }
    .text-header {
      margin: 20px 0 30px 10px;
    }
    }
  .candidate-list {
    background: red;
    display: flex;
  }
}
</style>
