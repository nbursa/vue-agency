<template lang="pug">
  div#edit-request
    div(v-if="formItem.user")
      header
        .sidebar-control.edit-request__header(v-if="formItem.user")
          img.edit-request__image(:src="formItem.user.image" v-if="formItem.user.image")
          span.edit-request__placeholder(v-else)  {{ `${formItem.user.firstName.charAt(0) }${ formItem.user.lastName.charAt(0) }` }}
          span.edit-request__name {{ formItem.user.firstName }} {{ formItem.user.lastName }}
      .sidebar-overflow(v-if="formItem.id")
        .flatpickr-wrap
          flatpickr(
            :options="config"
            v-if="date && date.length > 0"
            v-model="date"
            ref="flatpickr"
            :showInternalInput=false
          )
        form.sidebar-form(v-if="formItem")
          .border-line
          .sidebar-form_field
            label.sidebar-form_label {{ $t("requests_sidebar.label_type") }}
            div.sidebar-form_info.highlighted {{ formItem.type | type({holiday: $t("requests_sidebar.type_holiday"), sick: $t("requests_sidebar.type_sick"), unavailable: $t("requests_sidebar.type_unavailable") }) }}
          .sidebar-form_field
            label.sidebar-form_label {{ $t("requests_sidebar.label_from") }}
            div.sidebar-form_info {{ dateFrom | nice-date }}
          .sidebar-form_field
            label.sidebar-form_label {{ $t("requests_sidebar.label_to") }}
            div.sidebar-form_info {{ dateTo | nice-date }}
          .border-line
            .sidebar-form_field(v-if="candidateNote")
              label.sidebar-form_label {{ `${formItem.user.firstName}${$t("requests_sidebar.note")}` }}
              textarea.note(v-model="candidateNote" disabled)
          div.clear
      .sidebar-footer.sidebar-footer-flex(v-if="formItem.type !== 3" :class="{'is-disabled': !(!expired && isHoliday || !expired && isSickLeave)}")
        span(v-if="isHoliday") {{$t("requests_sidebar.aprove_label")}}
        span(v-if="isSickLeave") {{$t("requests_sidebar.ack_label")}}
        .is-pulled-right(v-if="isHoliday")
          a.button.is-cancelled(@click="rejectHoliday") {{ $t("requests_sidebar.button_reject") }}
          base-button(@click="approveHoliday" customClass="is-small") {{ $t("requests_sidebar.button_approve") }}
        .is-pulled-right(v-if="isSickLeave")
          base-button(@click="acknowledgeSickLeave" customClass="is-small") {{ $t("requests_sidebar.button_ack") }}
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import flatpickr from '@/components/shared/flat-pickr'
import 'flatpickr/dist/flatpickr.css'
import DateTimeUtils from '@/utils/dateUtils.js'
import { formMessages } from '@/mixins/formMessages.mixin'
import * as moment from 'moment-timezone'

export default {
  components: {
    flatpickr
  },
  filters: {
    type: (filter, text) => {
      if (filter === 1) {
        return text.holiday
      } else if (filter === 2) {
        return text.sick
      } else if (filter === 3) {
        return text.unavailable
      }
    }
  },
  mixins: [formMessages],
  data() {
    return {
      note: '',
      clicked: '',
      config: {
        mode: 'multiple',
        clickOpens: false,
        inline: true,
        dateFormat: this.$localization.flatpickrFormat,
        allowInput: false,
        altInput: false
      }
    }
  },
  computed: {
    successMessage: function () {
      const txt = this.isHoliday
        ? this.$t('requests_sidebar.type_holiday')
        : this.$t('requests_sidebar.type_sick')
      return `${txt} ${this.$t(`requests_sidebar.toast_${this.clicked}`)}.`
    },
    errorMessage: function () {
      return this.$t('requests_sidebar.toast_error')
    },
    date: {
      get() {
        return this.formItem.dates.map(function (date) {
          return DateTimeUtils.getDateFromSQL(date.date)
        })
      },
      set() {
        return null
      }
    },
    ...mapState('userUnavailiability/edit', ['itemSaved']),
    ...mapState('userUnavailiability/table', ['selected']),
    ...mapState('userUnavailiability/edit', [
      'formItem',
      'itemSaved',
      'isFetching'
    ]),
    dateFrom: function () {
      return this.formItem.dates[0].date
    },
    dateTo: function () {
      return this.formItem.dates[this.formItem.dates.length - 1].date
    },
    isHoliday: function () {
      return this.formItem.type === 1 ? true : false
    },
    isSickLeave: function () {
      return this.formItem.type === 2 ? true : false
    },
    expired: function () {
      return moment(new Date()).format('YYYY-MM-DD hh:mm:ss') > this.dateTo
    },
    candidateNote: function () {
      return this.formItem.note && this.formItem.note.note
    }
  },
  watch: {
    selected: {
      handler: 'setSidebarItem',
      immediate: true
    }
  },
  methods: {
    ...mapActions('userUnavailiability', [
      'getUserRequest',
      'approve',
      'reject',
      'acknowledge'
    ]),
    approveHoliday() {
      this.clicked = 'approved'
      this.approve({ id: this.selected[0].id, note: this.note })
    },
    rejectHoliday() {
      this.clicked = 'rejected'
      this.reject({ id: this.selected[0].id, note: this.note })
    },
    acknowledgeSickLeave() {
      this.clicked = 'acknowledged'
      this.acknowledge({ id: this.selected[0].id, note: this.note })
    },
    setSidebarItem() {
      this.getUserRequest({ id: this.selected[0].id, note: this.note })
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/variables';

.flatpickr-day.disabled, .flatpickr-day.disabled:hover {
  color: #4a4a4a;
}

.event {
  background-color: black;
  display: block;
  width: 100px;
  height: 3px;
}

#edit-request {
  header {
    margin-bottom: 0;
    .edit-request__header {
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
    }
  }

  .sidebar-overflow {
    position: relative;
  }

  .flatpickr-wrap {
    width: 100%;
    height: 350px;
    @media screen and (min-width: 1368px) {
      height: 450px;
    }
  }

  .flatpickr-month {
    height: 80px;
  }

  .flatpickr-calendar {
    width: 100%;
    box-shadow: none;
    z-index 1
  }

  .flatpickr-prev-month svg, .flatpickr-next-month svg {
    width: 10px;
    height: 10px;
  }

  .flatpickr-prev-month:hover svg, .flatpickr-next-month:hover svg {
    fill: #000;
  }

  .flatpickr-current-month {
    left: 0;
    width: 200px;
    padding-left: 0.8em;
    font-size: 150%;
    text-align: left;

    @media (max-width: $display-small-desktop) {
      padding-left: 6px;
      font-size: 16px;
    }

    .cur-month {
      color: #2C4B5C;
      font-weight: 600;
    }

    .cur-year {
      font-weight: 400;
    }
  }

  .flatpickr-prev-month {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
    margin-left: 75%;
    height: 30px;
    width: 30px;
    padding: 0.6em 0 0 0;
    overflow: hidden;
  }

  .flatpickr-next-month {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
    height: 30px;
    width: 30px;
    margin-right: 3%;
    padding: 0.6em 0 0 0;
    overflow: hidden;
  }

  .flatpickr-rContainer {
    margin-top: 2em;
    padding: 1em;
    width: 100%;
    margin: 0 auto;
  }

  .flatpickr-days {
    width: 100%;
  }

  .flatpickr-day {
    margin: 0.4em 0;
    max-width: 100px;
    pointer-events: none;

    @media (max-width: $display-small-desktop) {
      font-size: 13px;
      height: 29px;
      line-height: 29px;
      margin: 2px 0;
    }
  }

  .disabled {
    color: #cccccc;
  }

  .dayContainer {
    max-width: 100%;
    min-width: inherit;
    width: 100% !important;
  }

  span.flatpickr-weekday {
    color: #0CA6BD;
    font-size: 14px;

    @media (max-width: $display-small-desktop) {
      font-size: 12px;
    }
  }
}
</style>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';

.flatpickr-day.disabled, .flatpickr-day.disabled:hover {
  color: #4a4a4a;
}

.is-disabled {
  opacity: 0.3;
  pointer-events: none;
}

.event {
  background-color: black;
  display: block;
  width: 100px;
  height: 3px;
}

#edit-request {
  textarea {
    max-width: 100%;
    margin-top: 10px;
  }

  .flatpickr-month {
    height: 50px;
    margin-top: 1em;
  }

  .flatpickr-calendar {
    width: 100%;
    box-shadow: none;
  }

  .flatpickr-prev-month svg, .flatpickr-next-month svg {
    width: 10px;
    height: 10px;
  }

  .flatpickr-prev-month:hover svg, .flatpickr-next-month:hover svg {
    fill: #000;
  }

  .flatpickr-current-month {
    left: 0;
    width: 200px;
    padding-left: 0.8em;
    font-size: 150%;
    text-align: left;

    @media (max-width: $display-small-desktop) {
      padding-left: 6px;
      font-size: 16px;
    }

    .cur-month {
      color: #2C4B5C;
      font-weight: 600;
    }

    .cur-year {
      font-weight: 400;
    }
  }

  .flatpickr-prev-month {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
    margin-left: 75%;
    height: 30px;
    width: 30px;
    padding: 0.6em 0 0 0;
    overflow: hidden;
  }

  .flatpickr-next-month {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
    height: 30px;
    width: 30px;
    margin-right: 3%;
    padding: 0.6em 0 0 0;
    overflow: hidden;
  }

  .flatpickr-rContainer {
    margin-top: 2em;
    padding: 1em;
    width: 100%;
    margin: 0 auto;
  }

  .flatpickr-days {
    width: 100%;
  }

  .flatpickr-day {
    margin: 0.4em 0;
    max-width: 100px;
    pointer-events: none;

    @media (max-width: $display-small-desktop) {
      font-size: 13px;
      height: 29px;
      line-height: 29px;
      margin: 2px 0;
    }
  }

  .disabled {
    color: #cccccc;
  }

  .dayContainer {
    max-width: 100%;
    min-width: inherit;
    width: 100% !important;
  }

  span.flatpickr-weekday {
    color: #0CA6BD;
    font-size: 14px;

    @media (max-width: $display-small-desktop) {
      font-size: 12px;
    }
  }
}

.sidebar-form {
  margin-top: 0px;
  padding-top: 0px;
  .sidebar-form_field textarea.note {
    border: none;
  }
}

.edit-request {
  &__header {
    display: flex;
    justify-content: flex-start;
    min-height: 90px;
    align-items: center;
  }
  &__image {
    width: 60px;
    height: 60px;
  }
  &__placeholder {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f4f7;
    border-radius: 50%;
    font-weight: 600;
  }
  &__name {
    padding-left: 15px;
  }
}
</style>
