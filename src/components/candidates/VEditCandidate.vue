<template lang="pug">
div
  header(v-if="!showJobPicker")
    .sidebar-control
      v-new-candidate-link
    div.sidebar-control-tab.sidebar-control-tab--tab-cont
      ul.sidebar-control__tab-nav
        li.sidebar-control__tab-item(:class="{'sidebar-control__tab-item--is-active': activeTab === 'details'}" @click="activeTab = 'details'") {{$t("client_locations_sidebar.tab_0")}}
        li.sidebar-control__tab-item(:class="{'sidebar-control__tab-item--is-active': activeTab === 'notes'}" @click="activeTab = 'notes'") {{$t("client_locations_sidebar.tab_1")}}


    div(v-show="activeTab === 'details'")
      .sidebar-control.hours-tab
        .has-text-weight-semibold {{ $t("candidates_sidebar.working_hours") }}
        .has-text-right
          .hours {{formItem.hoursWorked === null || formItem.hoursWorked == 0 ? "00:00" : formItem.hoursWorked }}
      .sidebar-control.workstart-tab(style="padding-bottom: 5px")
        .has-text-weight-semibold.opacity {{ $t("candidates_sidebar.started_working") }}
        .has-text-right.opacity {{ employmentStartDate }}
      .sidebar-control.workstart-tab(v-if="formItem.daysPerYear")
        .has-text-weight-semibold.opacity {{ $t("candidates_sidebar.holidays_left") }}
        .has-text-right.opacity {{ Math.max(0, formItem.daysPerYear - formItem.daysTaken) }}

  .clear
  transition-group(name="slide-fade" mode="out-in")
    div.sidebar-overflow(v-show="activeTab === 'notes'" :key="1")
      notes(
        v-if="formItem"
        :subject="formItem"
        updateRoute="temps"
        @notes:created="test"
        @notes:deleted="test"
      )

    div(v-show="activeTab === 'details'" :key="3")
      .sidebar-overflow(v-show="!showJobPicker")
        v-candidate-form(
          :candidate="formItem"
          action="edit"
          :updateFn="updateItemField"
          :errorsFromBack="getErrors"
          @form:save="saveCandidate"
          @form:cancel="onCancel"
          @form:addJobType="onJobTypeClick"
        )

        v-selected-job-types(
          v-if="jobTypes"
          :jobTypes="jobTypes"
          @cancel:jobType="onJobTypeCancel"
        )
        .sidebar-footer(v-if="toDelete")
          div.action-panel__warning {{ $t("documents_sidebar.confirm_prompt") }}
            button.button.action-button.action-button--neutral(@click.prevent="toDelete = false") {{ $t("documents_sidebar.button_cancel") }}
            button.button.action-button.action-button--no(@click="onDelete" ) {{ $t("documents_sidebar.button_delete") }}
      .sidebar-overflow(v-if="showJobPicker")
        c-job-types-picker(
          :hasGrades="true"
          :jobTypes="formItem.jobTypes"
        )

        v-selected-job-types(
          :jobTypes="jobTypes"
          @cancel:jobType="onJobTypeCancel"
        )

        .sidebar-footer
          span {{ $t("candidates_sidebar.label_add_job") }}
            .is-pulled-right
              a.button.is-cancelled(@click.prevent="onAddJobTypeCancel") {{ $t("candidates_sidebar.cancel") }}
              button.button.is-tmpst-info(@click.prevent="onAddJobTypeSave") {{$t("candidates_sidebar.save")  }}
              .action-panel

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VNewCandidateLink from './VNewCandidateLink.vue'
import VCandidateForm from './VCandidateForm'
import VSelectedJobTypes from '@/components/shared/selected-job-types/VSelectedJobTypes'
import CJobTypesPicker from '@/components/shared/job-types-picker/CJobTypesPicker.vue'
import Candidate from '@/models/Candidate'
import VDeleteButton from '@/components/shared/sidebar-form/VDeleteButton'
import Notes from '@/components/shared/notes/CNotesInterface'

import DateTimeUtils from '@/utils/dateUtils.js'
import { jtMixin } from '@/mixins/jobTypeSelector.mixin'
import { booleanTypeAnnotation, booleanLiteral } from 'babel-types'
import { errorDefaults } from '@/config/notifications'

import '@/compiled-icons/candidates'

export default {
  components: {
    VNewCandidateLink,
    VCandidateForm,
    CJobTypesPicker,
    VSelectedJobTypes,
    VDeleteButton,
    Notes
  },
  mixins: [jtMixin],
  data() {
    return {
      showJobPicker: false,
      successMessage: this.$t('candidates_sidebar.toast_update'),
      deleteMessage: this.$t('candidates_sidebar.toast_delete'),
      toDelete: null,
      activeTab: 'details'
    }
  },
  computed: {
    ...mapState('candidates/table', ['selected']),
    ...mapState('candidates/edit', [
      'formItem',
      'itemSaved',
      'isFetching',
      'itemDeleted'
    ]),
    ...mapState('jobTypeSelector', ['selectedJobTypes']),
    ...mapGetters('candidates/edit', ['getErrors']),
    jobTypes: {
      get() {
        return this.formItem.jobTypes
      }
    },
    employmentStartDate() {
      return (
        this.formItem.employmentStartDate &&
        DateTimeUtils.getDateFromSQL(this.formItem.employmentStartDate)
      )
    }
  },
  watch: {
    selected: function (item) {
      if (item && item.length > 0 && item[0].id) {
        this.getCandidate(item[0].id)
      }
    }
  },
  beforeDestroy() {
    this.clearErrors()
  },
  created() {
    this.setFormItem(Object.assign({}, new Candidate()))
    if (this.selected[0]) {
      this.getCandidate(this.selected[0].id)
    }
    this.setSelectedJobTypes(this.jobTypes)
  },
  methods: {
    ...mapActions('jobTypeSelector', ['setSelectedJobTypes']),
    ...mapActions('messages', [
      'pushConversationToStack',
      'flickerConversation'
    ]),
    ...mapActions('candidates', [
      'getCandidate',
      'updateCandidate',
      'deleteCandidate'
    ]),
    ...mapActions('candidates/edit', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem',
      'setChildItems'
    ]),
    async initMessaging() {
      // Open chat-popup for this conversation
      try {
        await this.pushConversationToStack(this.selected[0])
      } catch (e) {
        this.flickerConversation(this.selected[0].id)
      }
    },
    test() {
      this.getCandidate(this.selected[0].id)
    },
    saveCandidate() {
      this.updateCandidate(this.formItem)
      this.clearErrors()
    },
    onDelete() {
      this.deleteCandidate(this.formItem.id)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/variables';
@import '~@/assets/styles/global/partials/action-buttons';
@import "~@/assets/styles/global/partials/slide-animation";


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.sidebar-control.has-buttons {
  display: flex;
  justify-content: center;
  border-top: 1px solid #ddd;

  @media (max-width: $display-small-desktop) {
    flex-wrap: wrap;
    justify-content: space-around;
  }

  svg {
    color: #CB1B1B;
  }

  // justify-content flex-end
  button {
    margin-left: 1em;

    @media (max-width: $display-small-desktop) {
      margin: 0 5px 0;
    }

    &.is-fullwidth {
      width: 100%;

      @media (max-width: $display-small-desktop) {
        margin: 0 0 10px;
        width: 45%;
        font-size: 14px;
      }
    }
  }
}

.sidebar-control{
  display: flex;
  justify-content: space-between;
  > div {
    width: 50%;

    @media (max-width: $display-small-desktop) {
      font-size: 14px;
    }
  }

  &.hours-tab {
    border-top: 1px solid #ddd;
    padding-bottom: 0px;
    min-height: 30px;
    .hours {
      width: 50px;
      font-size: 18px;
      font-weight: bold;
      float: right;
      text-align: center;
      border-radius: 13px;
    }
  }
  &.workstart-tab {
    padding-top: 0px;
    min-height: 30px;
    .opacity {
      font-size: 14px;
      opacity: 0.5;
      padding-top: 0px;
      line-height: 19px;
    }

  }
}

.action-panel__warning {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
