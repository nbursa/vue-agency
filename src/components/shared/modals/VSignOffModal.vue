<template lang="pug">
transition(name='modal')
  .modal-background
    .modal-container
      a.close(@click='close')
        svgicon.icon(
          name='global/close',
          :width='"29"',
          :height='"29"',
          :fill='false'
        )
      .v-table-content__loader(v-show='isFetching')
        half-circle-spinner(
          :animation-duration='1500',
          :size='50',
          :color='"#1a394a"'
        )
      h1 {{ $t("modal_signoff.modalTitle") }}
      hr
      form.sign-off-form(v-if='formItem.id')
        .sign-off-form_field
          label.sign-off-form_label {{ $t("jobs_sidebar.startTime") }}
          flatpickr(
            :options='config',
            :enableOnly="initialEnabledDates.start",
            altInputFormater='getCalendarFormat',
            v-model='formItem.startTime',
            :showInternalInput='showInput',
            :customClass='"date-picker"',
          )
        .sign-off-form_field
          label.sign-off-form_label {{ $t("jobs_sidebar.endTime") }}
          flatpickr(
            :options='config',
            :enableOnly="initialEnabledDates.end",
            altInputFormater='getCalendarFormat',
            v-model='formItem.endTime',
            :showInternalInput='showInput',
            :customClass='"date-picker"',
          )
        .help.is-danger(v-if='hasDateError') {{ $t("jobs_sidebar.dateError") }}
        .sign-off-form_field
          label.sign-off-form_label {{ $t("modal_signoff.breakLabel") }}
          base-input(
            v-model='breakMinutes',
            @focus='onFocus',
            :inputType='"number"'
          )
      .modal-footer
        base-button.pull-right(@click='onSubmit') {{ $t("modal_signoff.button") }}
      
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { HalfCircleSpinner } from 'epic-spinners'
import BaseInput from '@/components/shared/base-components/BaseInput'
import BaseButton from '@/components/shared/base-components/BaseButton'
import flatpickr from '@/components/shared/flat-pickr/flatpickr'
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import DateTimeUtils from '@/utils/dateUtils.js'
import ClickOutside from 'vue-click-outside'
import 'flatpickr/dist/flatpickr.css'

export default {
  directives: {
    ClickOutside
  },
  components: {
    BaseInput,
    BaseButton,
    flatpickr,
    VSidebarInput,
    HalfCircleSpinner
  },
  props: {
    namespace: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      formItem: {},
      initialDates: {},
      showInput: false,
      hasDateError: false,
      datePickerShow: false,
      config: {
        mode: 'single',
        enableTime: true,
        minuteIncrement: 5,
        closeOnSelect: true
      }
    }
  },
  computed: {
    ...mapState({
      stateFormItem(state) {
        return state.modals.data
      }
    }),
    ...mapState({
      errors(state) {
        return state[this.namespace].edit.errors
      },
      isFetching(state) {
        return state[this.namespace].edit.isFetching
      },
      searchParams(state) {
        return state[this.namespace].search.params
      }
    }),
    breakMinutes: {
      get() {
        if ([7, 8, 9, 10].includes(this.formItem.status.id)) {
          return this.formItem && this.formItem.breakMinutes
        }
        return this.formItem.jobRequest && this.formItem.jobRequest.breakMinutes
      },
      set(val) {
        let data = { property: '', value: parseInt(val) }
        if ([7, 8, 9, 10].includes(this.formItem.status.id)) {
          this.formItem.breakMinutes = parseInt(val)
        }
        this.formItem.jobRequest.breakMinutes = parseInt(val)
      }
    }
  },
  mounted() {
    this.formItem = JSON.parse(JSON.stringify(this.stateFormItem)) //remove observers from state data
    this.initialEnabledDates = {
      start: this.getEnabledDates(this.formItem.startTime),
      end: this.getEnabledDates(this.formItem.endTime)
    }
  },
  methods: {
    ...mapActions('modals', ['toggleModal', 'closeModal', 'updateModalData']),
    ...mapActions({
      fetchJobs(dispatch, payload) {
        return dispatch(`${this.namespace}/fetchJobs`, payload)
      },
      signOffJob(dispatch, payload) {
        return dispatch(`${this.namespace}/signOffJob`, payload)
      }
    }),
    onFocus(e) {
      if (e.target.value === '0') {
        e.target.select()
      }
    },
    close() {
      this.closeModal()
    },
    onSubmit() {
      let options = {
        id: this.formItem.id,
        startTime: this.formItem.startTime,
        endTime: this.formItem.endTime,
        breakMinutes: [7, 8, 9, 10].includes(this.formItem.status.id)
          ? this.formItem.breakMinutes
          : this.formItem.jobRequest.breakMinutes
      }
      this.signOffJob(options)
        .then(() => this.closeModal())
        .then(() => {
          this.fetchJobs(this.searchParams)
        })
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';
@import '~@/assets/styles/global/variables';

.modal-container {
  width: 300px;
  height: auto;
  margin: 0 auto;
  background-color: $white;
  margin-top: 10%;
  border-radius: 9px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.14);
  position: relative;
  display: flex;
  font-weight: 700;
  flex-direction: column;
  padding: 20px;

  .close {
    height: 29px;
    width: 29px;
    border-radius: 50px;
    position: absolute;
    right: -15px;
    top: -15px;
    background-color: $white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.17);
    z-index: 12;

    .icon {
      color: #333;
    }
  }

  .v-table-content__loader {
    top: 0;
    left: 0;
    z-index: 11;
    border-radius: 9px;
    pointer-events: none;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  hr {
    margin: 20px 0;
  }

  .sign-off-form {
    display: flex;
    flex-direction: column;
    flex: 100%;
    z-index: 10;
    position: relative;

    &_field {
      >>> .flatpickr {
        display: block;
        width: 100%;
        margin-bottom: 20px;

        .date-picker {
          font-size: 18px;
          padding-left: 20px;
          height: 60px;
          border: 1px solid #dfe6eb;
          border-radius: 3px;
          width: 100%;
          max-width: 100%;
        }
      }
      >>> .base-input {
        .input-label-group {
          margin: 0;

          .is-expandable {
            font-size: 18px;
            padding-left: 20px;
            padding-top: 0;
            margin: 0 0 20px 0;
            cursor: pointer;
            height: 60px;
            border: 1px solid #dfe6eb;
            border-radius: 3px;
            width: 100%;
            max-width: 100%;
          }
        }
      }
    }

    > .btn {
      width: 100px;

      &.pull-right {
        margin: 0 0 0 auto;
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>

<style lang="css">
.flatpickr-calendar {
  position: absolute !important;
}
</style>
