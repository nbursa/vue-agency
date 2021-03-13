<template lang="pug">
  #agency-container
    form
      .input-label-group(:class="{'error': errors.get('name')}")
        input.is-expandable(
          name="agencyName"
          type="text"
          placeholder=""
          v-model="agencyName"
          required
        )
        label.control-label {{ $t("agency_structure.agency_name") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('name')") {{ errors.get('name') }}

      .input-label-group.upload(:class="{'error': errors.get('name')}")
        base-image-uploader(
          uploadUrl="/agency-profile/logo"
          :on-progress="onProgress"
          :preview-image="agencyLogo"
          :fieldName="'logo'"
        )
        label.control-label(style="z-index: 0") {{ $t("agency_structure.logo") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('name')") {{ errors.get('name') }}


      base-tree-select(
        v-if="profile"
        :value="selectedCountry"
        :items="defaultCountryOptions"
        optionName="country"
        :multiple="false",
        :normalizer="normalizer"
        @input="onCountrySelect"
        valueFormat="object"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.countries.country") }}

      base-tree-select(
        v-if="languages && profile"
        :value="selectedLanguage"
        :items="languages"
        optionName="language"
        :multiple="false",
        :normalizer="normalizer"
        @input="onLanguageSelect"
        valueFormat="object"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.language") }}
      
      base-tree-select(
        :value="selectedDistance"
        :items="defaultDistanceOptions"
        optionName="lengthUnit"
        :multiple="false",
        :normalizer="normalizer"
        @input="onDistanceSelect"
        valueFormat="object"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.distance.label") }}

      base-tree-select(
        v-if="selectedTimezone"
        :value="selectedTimezone"
        :items="allTimezones"
        optionName="timezone"
        :multiple="false"
        @input="onFieldSelect"
        valueFormat="Array"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.time_zone") }}
      transition(name="validation-animation")
        p.help.is-danger(v-show="errors.get('timezone')") {{ errors.get('timezone') }}


      base-tree-select(
        v-if="dateFormats && profile"
        :value="selectedDateFormat"
        :items="dateFormats"
        optionName="dateFormat"
        :multiple="false",
        :normalizer="normalizer"
        @input="onDateFormatSelect"
        valueFormat="object"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.date_format") }} 
      transition(name="validation-animation")
        p.help.is-danger(v-show="errors.get('dateFormat')") {{ errors.get('dateFormat') }}

      base-tree-select(
        v-if="timeFormats && profile"
        :value="selectedTimeFormat"
        :items="timeFormats"
        optionName="timeFormat"
        :multiple="false",
        :normalizer="normalizer"
        @input="onTimeFormatSelect"
        valueFormat="object"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.time_format") }} 
      transition(name="validation-animation")
        p.help.is-danger(v-show="errors.get('timeFormat')") {{ errors.get('timeFormat') }}

      currency-selector(
          :isClearable="false"
          :isMultiple="false"
          v-model="currency"
          label="Currency"
        )
        div(slot="label") {{ $t("agency_structure.currency") }}
      transition(name="validation-animation")
        p.help.is-danger(v-show="errors.get('currency')") {{ errors.get('currency') }}


      base-tree-select(
        v-if="rateTypes && profile"
        :value="selectedRateType"
        :items="rateTypes"
        optionName="rateType"
        :multiple="false",
        :normalizer="normalizer"
        @input="onRateTypeSelect"
        valueFormat="object"
        :isClearable="false"
      )
        div(slot="label") {{ $t("agency_structure.agency_rate_label") }}

      .input-label-group(:class="{'error': errors.get('hourlyRate'), 'disabled': ![0,1].includes(profile && profile.rateType)}")
        input.is-expandable(
          name="hourlyRate"
          type="text"
          placeholder=""
          v-model.number="hourlyRate"
          required
        )
        label.control-label {{ $t("agency_structure.hourly_rate") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('hourlyRate')") {{ errors.get('hourlyRate') }}

      div.margin-type(:class="{'error': errors.get('hourlyRate'), 'disabled': ![0,1].includes(profile && profile.rateType)}")
        base-tree-select(
          v-if="marginTypes && profile"
          :value="selectedHourlyMarginType"
          :items="marginTypes"
          optionName="hourlyMarginType"
          :multiple="false",
          :normalizer="normalizer"
          @input="onHourlyMarginTypeSelect"
          valueFormat="object"
          :isClearable="false"
        )
          div(slot="label") {{ $t("agency_structure.agency_margin_label_hourly") }}

      .input-label-group(:class="{'error': errors.get('hourlyMargin'), 'disabled': ![0,1].includes(profile && profile.rateType)}")
        input.is-expandable(
          name="hourlyMargin"
          type="text"
          placeholder=""
          v-model.number="hourlyMargin"
          required
        )
        label.control-label {{ $t("agency_structure.hourly_margin") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('hourlyMargin')") {{ errors.get('hourlyMargin') }}

      .input-label-group(:class="{'error': errors.get('dailyRate'), 'disabled': ![0,2].includes(profile && profile.rateType)}")
        input.is-expandable(
          name="dailyRate"
          type="text"
          placeholder=""
          v-model.number="dailyRate"
          required
        )
        label.control-label {{ $t("agency_structure.daily_rate") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('dailyRate')") {{ errors.get('dailyRate') }}

      div.margin-type(:class="{'error': errors.get('hourlyRate'), 'disabled': ![0,2].includes(profile && profile.rateType)}")
        base-tree-select(
          v-if="marginTypes && profile"
          :value="selectedDailyMarginType"
          :items="marginTypes"
          optionName="dailyMarginType"
          :multiple="false",
          :normalizer="normalizer"
          @input="onDailyMarginTypeSelect"
          valueFormat="object"
          :isClearable="false"
        )
          div(slot="label") {{ $t("agency_structure.agency_margin_label_daily") }}

      .input-label-group(:class="{'error': errors.get('dailyMargin'), 'disabled': ![0,2].includes(profile && profile.rateType)}")
        input.is-expandable(
          name="dailyMargin"
          type="text"
          placeholder=""
          v-model.number="dailyMargin"
          required
        )
        label.control-label {{ $t("agency_structure.daily_margin") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('dailyMargin')") {{ errors.get('dailyMargin') }}

      .input-label-group(:class="{'error': errors.get('defaultWeeklyHours')}")
        input.is-expandable(
          name="weeklyHours"
          type="text"
          placeholder=""
          v-model.number="weeklyHours"
          required
        )
        label.control-label {{ $t("agency_structure.default_weekly_hours") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('defaultWeeklyHours')") {{ errors.get('defaultWeeklyHours') }}

      .input-label-group(:class="{'error': errors.get('defaultMonthlyHours')}")
        input.is-expandable(
          name="monthlyHours"
          type="text"
          placeholder=""
          v-model.number="monthlyHours"
          required
        )
        label.control-label {{ $t("agency_structure.default_monthly_hours") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('defaultMonthlyHours')") {{ errors.get('defaultMonthlyHours') }}

      .form-space
        .custom-checkbox
          input(id="addToPool" type="checkbox" v-model="addToPool")
          label(for="addToPool") {{ $t("agency_structure.agency_add_to_pool") }} 
      .form-space
        .custom-checkbox
          input(id="unavailability" type="checkbox" v-model="unavailability")
          label(for="unavailability") {{ $t("agency_structure.unavailability") }} 
      .form-space
        .custom-checkbox
          input(id="swapEnabled" type="checkbox" v-model="swapEnabled")
          label(for="swapEnabled") {{ $t("agency_structure.agency_switch_label") }} 
      .form-space
        .custom-checkbox
          input(id="arbitration" type="checkbox" v-model="arbitration")
          label(for="arbitration") {{ $t("agency_structure.arbitration") }} 

      .form-space
        v-leave-tracker(:options="holidayTrack" @leave-tracker:update="updateProfile")
      
      .textarea
        label.control-label Invoice Note
        textarea.invoice-note(
          ref="ta"
          :placeholder="'Type your invoice note...'"
          v-model="invoiceNote"
        )

      .input-label-group(:class="{'error': errors.get('initialInvoiceNumber')}")
        input.is-expandable(
          name="initialInvoiceNumber"
          type="number"
          placeholder=""
          v-model="initialInvoiceNumber"
        )
        label.control-label {{ $t("agency_structure.initial_invoice_number") }}
        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.get('initialInvoiceNumber')") {{ errors.get('initialInvoiceNumber') }}  
  
      .form-space
        .custom-checkbox
          input(id="sendEmails" type="checkbox" v-model="sendEmails")
          label(for="sendEmails") {{ $t("agency_structure.send_emails") }} 
      
      .job-reminder(:class="{'error': errors.get('jobReminders')}")
        v-job-reminders(:options="jobRemindersOptions" @job-reminder:update="jobReminderUpdateProfile")

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import * as moment from 'moment-timezone'
import { readServerMessages } from '@/mixins/validationMixin'
import { formErrors } from '@/mixins/formErrorsMixin'
import { translateArray } from '@/utils/general'
import VLeaveTracker from './VLeaveTracker.vue'
import staticAgencyTypes from '@/config/staticAgencyTypes'
import { CurrencySelector } from '@/components/shared/selectors'
import VJobReminders from './VJobReminders'

const defaultCountries = [
  {
    id: 0,
    name: 'agency_structure.countries.de',
    value: 'DE'
  },
  {
    id: 1,
    name: 'agency_structure.countries.us',
    value: 'US'
  },
  {
    id: 2,
    name: 'agency_structure.countries.ie',
    value: 'IE'
  },
  {
    id: 3,
    name: 'agency_structure.countries.au',
    value: 'AU'
  },
  {
    id: 4,
    name: 'agency_structure.countries.ch',
    value: 'CH'
  },
  {
    id: 5,
    name: 'agency_structure.countries.gb',
    value: 'GB'
  }
]

const defaultDistance = [
  {
    id: 0,
    name: 'agency_structure.distance.km',
    value: 'km'
  },
  {
    id: 1,
    name: 'agency_structure.distance.mile',
    value: 'mi'
  }
]

export default {
  name: 'CAgency',
  components: {
    VLeaveTracker,
    CurrencySelector,
    VJobReminders
  },
  mixins: [readServerMessages, formErrors],
  props: {
    errors: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => {
    return {
      selectedLang: {},
      rateTypes: translateArray(staticAgencyTypes.rateTypes, 'name'),
      marginTypes: translateArray(staticAgencyTypes.marginTypes, 'name'),
      defaultCountryOptions: translateArray(defaultCountries, 'name'),
      defaultDistanceOptions: translateArray(defaultDistance, 'name'),
      dateFormats: staticAgencyTypes.dateFormats,
      allTimezones: moment.tz.names().map((item, index) => {
        return {
          id: index + 1,
          label: item
        }
      }),
      timeFormats: translateArray(staticAgencyTypes.timeFormats, 'name')
    }
  },

  computed: {
    ...mapState('onboarding/agencySettings', ['profile', 'languages']),
    ...mapState(['serverErrors']),
    ...mapState({ mappedError: (state) => state.serverErrors }),
    invoiceNote: {
      get() {
        if (this.profile) {
          return this.profile.invoiceNote || ''
        }
        return ''
      },
      set(value) {
        this.updateProfile({
          key: 'invoiceNote',
          value: value
        })
      }
    },
    agencyName: {
      get() {
        return this.profile && this.profile.name ? this.profile.name : null
      },
      set(value) {
        this.updateProfile({
          key: 'name',
          value: value
        })
      }
    },
    addToPool: {
      get() {
        return this.profile && this.profile.isAddToPollEnabled
          ? this.profile.isAddToPollEnabled
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'isAddToPollEnabled',
          value: value
        })
      }
    },
    agencyLogo: {
      get() {
        return this.profile && this.profile.logo ? this.profile.logo : null
      }
    },
    hourlyRate: {
      get() {
        return this.profile && this.profile.hourlyRate
          ? this.profile.hourlyRate
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'hourlyRate',
          value: value
        })
      }
    },
    initialInvoiceNumber: {
      get() {
        return this.profile && this.profile.initialInvoiceNumber
          ? this.profile.initialInvoiceNumber
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'initialInvoiceNumber',
          value: value
        })
      }
    },
    hourlyMargin: {
      get() {
        return this.profile && this.profile.hourlyMargin
          ? this.profile.hourlyMargin
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'hourlyMargin',
          value: value
        })
      }
    },
    dailyRate: {
      get() {
        return this.profile && this.profile.dailyRate
          ? this.profile.dailyRate
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'dailyRate',
          value: value
        })
      }
    },
    dailyMargin: {
      get() {
        return this.profile && this.profile.dailyMargin
          ? this.profile.dailyMargin
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'dailyMargin',
          value: value
        })
      }
    },
    weeklyHours: {
      get() {
        return this.profile && this.profile.defaultWeeklyHours
          ? this.profile.defaultWeeklyHours
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'defaultWeeklyHours',
          value: value
        })
      }
    },
    monthlyHours: {
      get() {
        return this.profile && this.profile.defaultMonthlyHours
          ? this.profile.defaultMonthlyHours
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'defaultMonthlyHours',
          value: value
        })
      }
    },
    currency: {
      get() {
        return this.profile && this.profile.currency
          ? this.profile.currency.id
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'currencyId',
          value: value
        })
      }
    },
    sendPayrateEnabled: {
      get() {
        return this.profile && this.profile.isRateVisible
          ? this.profile.isRateVisible
          : false
      },
      set(value) {
        this.updateProfile({
          key: 'isRateVisible',
          value: value
        })
      }
    },
    swapEnabled: {
      get() {
        return this.profile && this.profile.isSwapJobEnabled
          ? this.profile.isSwapJobEnabled
          : false
      },
      set(value) {
        this.updateProfile({
          key: 'isSwapJobEnabled',
          value: value
        })
      }
    },
    unavailability: {
      get() {
        return this.profile && this.profile.isUnavailabilityEnabled
          ? this.profile.isUnavailabilityEnabled
          : false
      },
      set(value) {
        this.updateProfile({
          key: 'isUnavailabilityEnabled',
          value: value
        })
      }
    },
    selectedRateType: {
      get() {
        return this.profile
          ? { rateType: this.rateTypes[this.profile.rateType] }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'rateType',
          value: value.rateType.value
        })
      }
    },
    selectedHourlyMarginType: {
      get() {
        return this.profile.hourlyMarginType
          ? {
              hourlyMarginType: this.marginTypes[
                this.profile.hourlyMarginType - 1
              ]
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'hourlyMarginType',
          value: value.hourlyMarginType.value
        })
      }
    },
    selectedDailyMarginType: {
      get() {
        return this.profile.dailyMarginType
          ? {
              dailyMarginType: this.marginTypes[
                this.profile.dailyMarginType - 1
              ]
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'dailyMarginType',
          value: value.dailyMarginType.value
        })
      }
    },
    selectedCountry: {
      get() {
        return this.profile
          ? {
              country: this.defaultCountryOptions.find(
                (country) => country.value === this.profile.country
              )
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'country',
          value: value.country.value
        })
      }
    },
    selectedLanguage: {
      get() {
        return this.profile && this.profile.language
          ? {
              language: this.profile.language
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'language',
          value: value.language
        })
        this.updateProfile({
          key: 'language_id',
          value: value.language.id
        })
      }
    },
    selectedDateFormat: {
      get() {
        // if (
        //   this.profile &&
        //   this.profile.dateFormat &&
        //   this.profile.dateFormat !== ''
        // ) {

        // }
        return this.profile &&
          this.profile.dateFormat &&
          this.profile.dateFormat !== ''
          ? {
              dateFormat: this.dateFormats.find(
                (item) => this.profile.dateFormat === item.value
              )
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'dateFormat',
          value: value.dateFormat.value
        })
      }
    },
    selectedTimezone: {
      get() {
        let r = {}
        r.timezone =
          this.profile && this.profile.timezone
            ? this.allTimezones.filter(
                (item) => item.label == this.profile.timezone
              )[0]
            : null
        return r
      },
      set(value) {
        this.updateProfile({
          key: 'timezone',
          value: value.timezone.label
        })
      }
    },
    selectedDistance: {
      get() {
        return this.profile && this.profile.lengthUnit
          ? {
              lengthUnit: this.defaultDistanceOptions.find(
                (item) => item.value === this.profile.lengthUnit
              )
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'lengthUnit',
          value: value.lengthUnit.value
        })
      }
    },
    holidayTrack() {
      return {
        isTracked: this.profile ? this.profile.isHolidayTracked : false,
        defaultFulltime: this.profile
          ? this.profile.fullTimeDefaultHoliday
          : null,
        defaultParttime: this.profile
          ? this.profile.partTimeDefaultHoliday
          : null
      }
    },
    sendEmails: {
      get() {
        return this.profile && this.profile.isActive
          ? this.profile.isActive
          : false
      },
      set(value) {
        this.updateProfile({
          key: 'isActive',
          value: value
        })
      }
    },
    arbitration: {
      get() {
        return this.profile && this.profile.isArbitrationEnabled
          ? this.profile.isArbitrationEnabled
          : false
      },
      set(value) {
        this.updateProfile({
          key: 'isArbitrationEnabled',
          value: value
        })
      }
    },
    jobRemindersOptions: function () {
      return {
        jobReminders: this.profile && this.profile.jobReminders,
        errors: this.errors.get('jobReminders')
      }
    },
    selectedTimeFormat: {
      get() {
        return this.profile &&
          this.profile.timeFormat &&
          this.profile.timeFormat !== ''
          ? {
              timeFormat: this.timeFormats.find(
                (item) => this.profile.timeFormat === item.value
              )
            }
          : null
      },
      set(value) {
        this.updateProfile({
          key: 'timeFormat',
          value: value.timeFormat.value
        })
      }
    }
  },
  mounted() {
    this.getProfile()
    this.getLanguages()
  },
  methods: {
    ...mapActions('onboarding/agencySettings', [
      'getProfile',
      'getLanguages',
      'updateProfile',
      'updateLogo'
    ]),
    onFieldSelect: function (value) {
      this.selectedTimezone = value
    },
    onLanguageSelect: function (value) {
      this.selectedLanguage = value
    },
    onCountrySelect: function (value) {
      this.selectedCountry = value
    },
    onRateTypeSelect: function (value) {
      this.selectedRateType = value
    },
    onHourlyMarginTypeSelect: function (value) {
      this.selectedHourlyMarginType = value
    },
    onDailyMarginTypeSelect: function (value) {
      this.selectedDailyMarginType = value
    },
    onDateFormatSelect: function (value) {
      this.selectedDateFormat = value
    },
    onDistanceSelect: function (value) {
      this.selectedDistance = value
    },
    normalizer: (obj) => {
      return {
        id: obj.id,
        label: obj.name,
        abr: obj.abbreviation
      }
    },
    onProgress(progress) {
      console.log(`${this.$options.name}: ${progress}`)
    },
    jobReminderUpdateProfile(val) {
      if (
        val === null ||
        val.value === null ||
        (Array.isArray(val) && val.includes(null)) ||
        (Array.isArray(val) && !val.length)
      ) {
        return this.updateProfile({
          key: 'jobReminders',
          value: []
        })
      }
      return this.updateProfile({
        key: 'jobReminders',
        value: val
      })
    },
    onTimeFormatSelect: function (value) {
      this.selectedTimeFormat = value
    }
  }
}
</script>

<style lang="stylus" scoped>
$font-size = 18px;
$active-font-size = 13px;
$active-top = 0.4rem;
$label-color = #838D98;
$active-color = $focus-color = $label-color;

@import '~@/assets/styles/global/label-input';
@import '~@/assets/styles/global/expandable-input';
@import '~@/assets/styles/global/custom-checkbox';

.verify-box {
  margin-top: 0.2em;
  display: flex;
  align-items: center;

  &__message {
    p a {
      margin-left: 0.6em;
      font-weight: bold;
    }
  }

  &__action {
    margin-left: auto;
  }
}

#agency-container {
  width: 100%;
  margin: 28px auto 0;
  max-width: 410px;

  .textarea {
    border: 1px solid #dfe6eb;
    padding: 10px 20px 20px;
    border-radius: 3px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    line-height: 24px;
    flex-flow: wrap;
    height: 100%;
    margin-bottom: 20px;
    .control-label {
      margin-bottom: 10px;
    }
    .invoice-note {
      border: 1px solid #dfe6eb;
      border-radius: 3px;
      resize: none;
      width: 100%;
      height: 100px;
      outline: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-size: 18px;
      padding: 20px;
    }
  }

  .input-label-group {
    .control-label {
      padding-top: 0;
    }

    &.disabled {
      background-color: #D2D3DD;
      opacity: 0.5;
      pointer-events: none;
    }

    input {
      height: 60px;
      font-weight: 600;

      &.is-expandable {
        padding-top: 19px;
      }

      &:focus {
        border-color: #856ff9;
      }
    }
  }

  .margin-type {
    &.disabled {
      position: relative;
      pointer-events: none;

      &:after {
        content: '';
        z-index: 3;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #D2D3DD;
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }

  .input-label-group input:focus ~.control-label, .input-label-group input:valid ~.control-label, .input-label-group input.has-value ~.control-label {
    top: 7px;
  }
}

.input-label-group.upload {
  display: flex;
  border: 1px solid #dfe6eb;
  border-radius: 3px;
  margin-bottom 0
  // justify-content: space-around;

  .control-label {
    font-size: 13px;
    color: #838d98;
    top: 0.4rem;
    left: 0;
  }

  .uploader {
    width: 100%;
    margin: 20px auto 0;

    /deep/ .uploader-header {
      .uploader__pic {
        width: 100%;
        height 100%

        .box {
          width: 100%;
          height 100%
          box-shadow: none;

          img {
            height 125px
            width: auto
          }
        }
      }
    }
    /deep/ .uploader-footer {
      // display: none;
    }
  }
}

.input-label-group {
  margin: 1em 0;
  position: relative;

  &.error {
    input {
      border-color: #D0021B;
    }
  }

  .help {
    position: absolute;
    background-color: #D0021B;
    color: white;
    font-size: 11px;
    padding: 4px 11px;
    border-radius: 4px;
    left: calc(100% + 12px);
    top: -4px;
    white-space: nowrap;

    &:after {
      position: absolute;
      top: 0;
      left: -4px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #D0021B;
      content: '';
    }
  }
}

.sidebar-form_field {
  margin: 2em 0;
}

.validation-animation-enter-active {
  transition: all 0.3s ease;
}

.validation-animation-enter {
  transform: translateX(-5px);
  opacity: 0;
}

.validation-animation-leave-to {
  opacity: 0;
}

.custom-checkbox {
  border: 1px solid #DFE6EB;
  border-radius: 3px;
  padding: 10px 20px;

  label {
    font-size: 18px;
    line-height: 24px;
  }
}

.form-space {
  margin: 1em 0;
}
</style>
