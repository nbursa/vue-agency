<template lang="pug">
div.form-edit-action
  header
    .sidebar-control
      router-link(:to="{path: 'submit-job'}")
        base-button(v-tooltip.bottom-start="$t('tooltips.job_submit.add_job')") {{$t("jobs_sidebar.submit")}}

    .sidebar-control-tab
      base-button(
        class="repush-btn"
        v-if="rePush",
        type="submit",
        @click="rePushJob(formItem.id)"
        v-tooltip.bottom-start="$t('tooltips.job_submit.re_push')"
      ) {{ $t("jobs_sidebar.repush_label")}}

      base-button(@click="cancelJob(formItem)" v-if="isCancelable" class="cancel-btn") {{$t("jobs_sidebar.cancel_job")}} 
      span(v-if="isCanceled") {{$t("jobs_sidebar.canceled")}}

      base-button(
        class="signoff-btn"
        v-if="hasSignOff",
        type="submit",
        @click="signOff(formItem.id)"
      ) {{ $t("jobs.table_column_6") }}

  .sidebar-overflow
    form.sidebar-form(v-if="formItem.id")
      v-sidebar-input(
        type="text"
        label="ID"
        v-model="id"
        disabled="disabled"
      )

      v-sidebar-input(
        type="text"
        :label="$t('jobs_sidebar.input_status')"
        v-model="status"
        disabled="disabled"
      )

      .sidebar-form_field(v-if="isEditable")
        label.sidebar-form_label {{ $t("jobs_sidebar.startTime") }}
        flatpickr(
          :options="config",
          :enableOnly="initialJobDates.start",
          @change="onDateChange",
          altInputFormater="getCalendarFormat"
          v-model="startDate",
          :showInternalInput="showInput"
        )

      v-sidebar-input(
        v-else
        type="text"
        label="Start Time"
        v-model="startDate"
        altInputFormater="getCalendarFormat"
        disabled="disabled"
      )

      .sidebar-form_field(v-if="isEditable")
        label.sidebar-form_label {{ $t("jobs_sidebar.endTime") }}
        flatpickr(
          :options="config",
          :enableOnly="initialJobDates.end",
          @change="onDateChange",
          altInputFormater="getCalendarFormat"
          v-model="endDate",
          :showInternalInput="showInput"
        )
        div.help.is-danger(v-if="hasDateError") {{ $t("jobs_sidebar.dateError") }}

      v-sidebar-input(
        v-else
        type="text"
        label="End Time"
        v-model="endDate"
        altInputFormater="getCalendarFormat"
        disabled="disabled"
      )

      .sidebar-form_field(style="overflow: visible;")
        v-sidebar-input.break(
          type="number"
          :label="$t('jobs_submit.break_duration')"
          :value="breakMinutes"
          :disabled="true"
          style="padding:0"
        )
        .break-editable(:class="{ editable: breakSettings.editable }")
          svgicon.icon(name="job-schedule/editable" :fill="false")
        .break-payable(:class="{ payable: breakSettings.payable }") {{ $currency.sign }}
      //- .sidebar-form_label.break-label {{this.$t("jobs_submit.break_duration")}}
        //- treeselect.break-select(
        //-   :value="breakMinutes"
        //-   :options="breakOptions"
        //-   placeholder=""
        //-   :disabled="true"
        //-   :normalizer="normalizer"
        //-   @select="changed"
        //- )
        //- .break-editable(:class="{ editable: breakSettings.editable }")
        //-   svgicon.icon(name="job-schedule/editable" :fill="false")
        //- .break-payable(:class="{ payable: breakSettings.payable }") {{ $currency.sign }}

      .sidebar-form_field(style="overflow:visible;")
        v-client-selector(
          v-model="client"
          :isDisabled="true"
          valueConsists="ALL_WITH_INDETERMINATE"
          :label="$t('client_locations_sidebar.client')"
        )

      .sidebar-form_field(style="overflow:visible;")
        v-agency-selector(
          :label="$t('candidates.drawer_filter_branch')",
          v-model="selectedAgencies",
          :isDisabled="true"
        )


      .sidebar-form_field(style="overflow:visible;" v-if="isAssignable")
        candidate-selector(
          :label="$t('jobs_sidebar.input_candidate')"
          v-model="candidate"
          :injectedCandidate="formItem.user"
          :jobId="formItem.id"
          :isMultiple="false"
          :isClearable="true"
        )

      v-sidebar-input(
        v-else
        type="text"
        :label="$t('jobs_sidebar.input_candidate')"
        v-model="candidateName"
        disabled="disabled"
      )
      .sidebar-form_field(style="overflow:visible;" v-if="attributes.length")
        v-attribute-selector(
          v-model="attributes"
          :isMultiple="true"
          :isDisabled="true"
          valueConsists="ALL_WITH_INDETERMINATE"
          :label="$t('candidates_sidebar.attributes')"
        )
      .sidebar-form_field(style="overflow:visible;" v-if="!(!isAssignable && !bonuses.length)")
        bonuses-selector(
          :label="$t('jobs_sidebar.input_bonuses')"
          v-model="bonuses"
          :jobId="formItem.id"
          :isDisabled="!!(!isAssignable && bonuses)"
          :isMultiple="true"
          :isClearable="true"
        )

      v-sidebar-input(
        type="text"
        :label="$t('jobs_sidebar.input_jobtype')"
        v-model="jobType"
        disabled="disabled"
      )

      .sidebar-form_field(style="overflow:visible;")
        grade-selector(
          v-if="grade"
          :value="grade"
          :isDisabled="true"
          :label="$t('jobs_sidebar.grades_label')"
        )

      v-sidebar-input(
        v-if="signOffInfo"
        tagType="textarea"
        disabled="disabled"
        :label="$t('jobs_sidebar.signed_off_by')"
        v-model="signOffInfo"
      )

      v-sidebar-input(
        v-if="signOffNote"
        tagType="textarea"
        disabled="disabled"
        :label="$t('jobs_sidebar.sign_off_note')"
        v-model="signOffNote"
      )

      v-sidebar-input(
        v-if="candidateNote"
        tagType="textarea"
        disabled="disabled"
        :label="$t('jobs_sidebar.candidate_note')"
        v-model="candidateNote"
      )

    .sidebar-footer(v-if="isEditable")
      .sidebar-footer-title {{$t("jobs_sidebar.edit")}}
      .sidebar-footer-bottom
        base-button(@click="onCancel" class="cancel-btn") {{$t("jobs_sidebar.cancel")}}
        base-button(v-model="dataChangeWatcher" @click="onSave" :disabled="hasDateError || hasDataChange" customClass="is-small") {{$t("jobs_sidebar.save")}}

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { formMessages } from '@/mixins/formMessages.mixin'
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import {
  CandidateSelector,
  BonusesSelector,
  GradeSelector
} from '@/components/shared/selectors'
import VAgencySelector from '@/components/shared/agency-selector/VAgencySelector'
import DateTimeUtils from '@/utils/dateUtils.js'
import flatpickr from '@/components/shared/flat-pickr'
import CTimeDropdown from '@/components/shared/dropdown/CTimeDropdown.vue'
import VClientSelector from '@/components/shared/client-selector/VClientSelector'
import { VAttributeSelector } from '@/components/shared/selectors'
import BaseButton from '@/components/shared/base-components/BaseButton'
import _ from 'lodash'
import generateBreakIntervals from '@/config/breakIntervalGen'
import Treeselect from '@riophae/vue-treeselect'
import { itemSaved } from '../../../store/modules/form/actions'

export default {
  components: {
    VAttributeSelector,
    VClientSelector,
    CTimeDropdown,
    VSidebarInput,
    CandidateSelector,
    flatpickr,
    BonusesSelector,
    VAgencySelector,
    Treeselect,
    GradeSelector
  },
  inject: ['namespace'],
  mixins: [formMessages],
  data() {
    return {
      deleteMessage: this.$t('jobs_sidebar.toast_cancel'),
      showInput: false,
      hasDateError: false,
      initialJobDates: {},
      config: {
        mode: 'single',
        enableTime: true,
        minuteIncrement: 5
      },
      dataChangeWatcher: false,
      hasDataChange: false
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('grades', ['grades']),
    ...mapState({
      selected(state) {
        return state[this.namespace].table.selected
      },
      isSignOff(state) {
        return state[this.namespace].edit.isSignOff
      },
      formItem(state) {
        return state[this.namespace].edit.formItem
      },
      errors(state) {
        return state[this.namespace].edit.errors
      },
      itemSaved(state) {
        return state[this.namespace].edit.itemSaved
      },
      isFetching(state) {
        return state[this.namespace].edit.isFetching
      },
      itemDeleted(state) {
        return state[this.namespace].edit.itemDeleted
      },
      searchParams(state, getters) {
        return state[this.namespace].search.params
      },
      hasSignOff(state) {
        return (
          state.auth.user.permissions.includes('admin-signOff-job') &&
          this.filterJobStatus
        )
      }
    }),
    selectedAgencies: {
      get() {
        return this.formItem.jobRequest && this.formItem.jobRequest.agency
          ? [this.formItem.jobRequest.agency]
          : []
      },
      set(val) {}
    },
    signOffInfo() {
      if (this.formItem.signOff && this.formItem.signOff.user) {
        let {
          user: { firstName },
          user: { lastName },
          signedOffAt
        } = this.formItem.signOff
        let signedOffBy = `${firstName} ${lastName}\n${DateTimeUtils.getDateTimeFromSQL(
          signedOffAt
        )}`
        return signedOffBy
      }
      return false
    },
    signOffNote() {
      if (
        this.formItem.signOff &&
        this.formItem.signOff.note &&
        this.formItem.signOff.note.note !== ''
      ) {
        return this.formItem.signOff.note.note
      }
      return null
    },
    candidateNote() {
      if (
        this.formItem &&
        this.formItem.notes &&
        this.formItem.notes.length !== 0
      ) {
        return this.formItem.notes.map((note) => {
          return (
            DateTimeUtils.getCalendarFormat(note.createdAt) +
            ':\n' +
            note.note +
            '\n'
          )
        })
      }
      return null
    },
    successMessage() {
      return this.isSignOff
        ? this.$t('jobs_sidebar.toast_sign_off')
        : this.$t('jobs_sidebar.toast_update')
    },
    filterJobStatus: function () {
      if (this.formItem.status) {
        return (
          this.formItem.status.name === 'Sign off pending' ||
          this.formItem.status.name === 'Admin sign off pending'
        )
      }
      return null
    },
    canSuperEdit() {
      return (
        this.user &&
        this.user.role === 'super-admin' &&
        this.formItem.status.id < 10 &&
        this.formItem.status.id !== 5
      )
    },
    isEditable() {
      if (this.canSuperEdit) return true
      if (this.formItem.status && [1, 2].includes(this.formItem.status.id)) {
        return true
      }
      return false
    },
    isAssignable() {
      if (this.canSuperEdit) return true
      if (this.formItem.status && [1, 2].includes(this.formItem.status.id)) {
        return true
      }
      return false
    },
    isCancelable: function () {
      if (this.canSuperEdit) return true
      if (!this.formItem.status) {
        return true
      }
      return (
        this.formItem.status.id !== 11 &&
        !this.filterJobStatus &&
        this.formItem.isCancelable
      )
    },
    isCanceled: function () {
      return this.formItem.status && this.formItem.status.id === 11
    },
    errorMessage: {
      get() {
        return this.errors.error
      }
    },
    getErrors: {
      get() {
        return this.errors
      }
    },
    id: {
      get() {
        return this.formItem.id + ''
      }
    },
    status: {
      get() {
        return this.formItem.status.name
      }
    },
    startDate: {
      get() {
        return this.formItem.startTime
      },
      set(newDate) {
        this.updateItemField({
          name: 'startTime',
          value: newDate
        })
      }
    },
    endDate: {
      get() {
        return this.formItem.endTime
      },
      set(newDate) {
        this.updateItemField({
          name: 'endTime',
          value: newDate
        })
      }
    },
    client: {
      get() {
        return [this.formItem.client]
      },
      set() {}
    },
    attributes: {
      get() {
        if (!this.formItem.jobRequest.attributeValues) {
          return []
        }
        return this.formItem.jobRequest.attributeValues.map(
          (attributeValue) => {
            return attributeValue.id
          }
        )
      },
      set() {}
    },
    candidate: {
      get() {
        if (this.formItem.user && this.formItem.user.id) {
          return this.formItem.user.id
        } else {
          return null
        }
      },
      set(val) {
        return val
          ? this.updateItemField({
              name: 'userId',
              value: val
            })
          : this.updateItemField({
              name: 'userId',
              value: null
            })
      }
    },
    bonuses: {
      get() {
        if (this.formItem.bonuses && this.formItem.bonuses.length) {
          return this.formItem.bonuses
        } else {
          return []
        }
      },
      set(val) {
        return val
          ? this.updateItemField({
              name: 'bonuses',
              value: val
            })
          : this.removeItemField({
              name: 'bonuses'
            })
      }
    },
    candidateName() {
      return this.formItem.user
        ? this.formItem.user.firstName + ' ' + this.formItem.user.lastName
        : ''
    },
    location: {
      get() {
        return this.formItem.location
      }
    },
    jobType: {
      get() {
        return this.formItem.jobRequest.jobType.name
      }
    },
    rePush: function () {
      if (this.formItem.status) {
        if (this.$i18n.locale === 'en') {
          return this.formItem.status.name === 'Created'
        } else if (
          this.$i18n.locale === 'de' ||
          this.$i18n.locale === 'de_un'
        ) {
          return this.formItem.status.name === 'Erstellt'
        }
        return false
      }
      return false
    },
    breakMinutes: function () {
      if ([7, 8, 9, 10].includes(this.formItem.status.id)) {
        return this.formItem && this.formItem.breakMinutes
      }
      return this.formItem.jobRequest && this.formItem.jobRequest.breakMinutes
    },
    breakSettings: function () {
      return {
        changeable:
          this.formItem.jobRequest && this.formItem.status
            ? this.formItem.status.id === 6 &&
              this.formItem.jobRequest.isBreakChangeable
            : false,
        payable:
          this.formItem.jobRequest && this.formItem.jobRequest.isBreakPayable,
        editable:
          this.formItem.jobRequest && this.formItem.jobRequest.isBreakChangeable
      }
    },
    breakOptions: function () {
      let breaks = generateBreakIntervals()
      breaks.unshift({ id: 0, label: 0 })
      return breaks
    },
    grade: function () {
      if (
        this.grades &&
        this.formItem.jobRequest.grade &&
        this.formItem.jobRequest.grade.level !== 1
      ) {
        return this.grades.filter(
          (grade) => grade.id === this.formItem.jobRequest.grade.id
        )
      }
      return null
    }
  },
  watch: {
    selected: {
      handler: 'fetchItem',
      immediate: true
    },
    dataChangeWatcher: {
      handler: 'updateDisable',
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      async fetchJob(dispatch, payload) {
        return await dispatch(`${this.namespace}/fetchJob`, payload)
      },
      fetchJobs(dispatch, payload) {
        return dispatch(`${this.namespace}/fetchJobs`, payload)
      },
      cancelJob(dispatch, payload) {
        return dispatch(`${this.namespace}/cancelJob`, payload)
      },
      updateJob(dispatch, payload) {
        return dispatch(`${this.namespace}/updateJob`, payload)
      },
      updateItemField(dispatch, payload) {
        this.hasDataChange = false;
        return dispatch(`${this.namespace}/edit/updateItemField`, payload)
      },
      removeItemField(dispatch, payload) {
        return dispatch(`${this.namespace}/edit/removeItemField`, payload)
      },
      deselectItem(dispatch, payload) {
        return dispatch(`${this.namespace}/table/deselectItem`, payload)
      }
    }),
    ...mapActions('modals', ['toggleModal', 'setModalComponent']),
    async fetchItem() {
      let response = await this.fetchJob(this.selected[0].id)
      this.initialJobDates = {
        start: this.getEnabledDates(response.startTime),
        end: this.getEnabledDates(response.endTime)
      }
    },
    getEnabledDates(initialTime) {
      let adjustDate = function (time) {
        return [-1, 0, 1].map(function (increment) {
          return DateTimeUtils.getDateTime()
            .fromSQL(time)
            .plus({ days: increment })
            .toISODate()
        })
      }
      return initialTime ? adjustDate(initialTime) : null
    },
    onDateChange(newDate) {
      if (this.startDate > this.endDate) {
        this.hasDateError = true
      } else {
        this.hasDateError = false
      }
    },
    onCancel() {
      this.deselectItem(this.formItem)
      this.$emit('sidebar:navigate', 'cancel')
    },
    onSave() {
      this.updateJob(this.formItem).then(() => {
        this.fetchJobs(this.searchParams)
      })
    },
    signOff(id) {
      this.toggleModal(this.formItem)
    },
    rePushJob(formItemId) {
      this.setModalComponent({
        modalComponent: 'repush',
        modalData: formItemId
      })
    },
    changed(val) {
      this.updateItemField({
        name: 'jobRequest.breakMinutes',
        value: val.label
      })
    },
    updateDisable() {
      this.hasDataChange = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

.form-edit-action {
  display flex
  flex-direction column
}
  @media screen and (min-width: 1367px) {
  .grade {
      display flex
      justify-content space-between
      >>> &__dropdown {
          max-width 60%
        }
    }
  }

.break {
  position relative
  &-label {
    font-size 13px
    color #999
    min-width 100%
    padding-top 0.4em
  }
  &-editable,
  &-payable {
    position absolute
    bottom 0.5em
    right 1.7em
    width 24px
    height 24px
    border 1px solid #E1E1E1
    border-radius 6px
    background-color #FFFFFF
    color $primary
    font-size 16px
    font-weight bold
    display flex
    justify-content center
    align-items center
    cursor default
    .svg-icon {
      fill $primary
      stroke none
      width 14px
      height 14px
    }
    &.editable,
    &.payable {
      border 1px solid $primary
      background-color $primary
      color #ffffff
      .svg-icon {
        fill #ffffff
      }
    }
  }
  &-editable {
    right 4em
  }
  &-select {
    width 60%
    float left
    @media (max-width: $display-small-desktop) {
      width 100%
      font-size 14px
    }
    &:hover {
      border none
    }
  }
}

.sidebar-control-tab {
  background-color transparent
  color blue
  .btn {
    background-image none
    border-radius 4px
    height auto
    min-height fit-content
    line-height 22px
    letter-spacing 0
    font-size 16px
    font-family Aileron//"Nunito Sans"
    padding 5px 30px
    box-shadow none
    text-align center
    &:hover {
      font-weight bold
    }
    &.repush-btn,
    &.signoff-btn {
      height auto
      min-height fit-content
      margin-left 0
      background-color #ffffff
      border 1px solid $primary
      color: $primary
      width calc(50% - 20px)
    }
    &.cancel-btn {
      height auto
      min-height fit-content
      background-color #F2F3F4
      border 1px solid #F2F3F4
      color $primary
      width calc(50% - 20px)
      &:only-child {
        width auto
      }
    }
  }
}
</style>
