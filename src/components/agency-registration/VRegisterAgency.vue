<template lang="pug">
  registration-base-layout
    #agency-container
      form(@submit.prevent="")
        div.required 
          span.required--mark *
          | {{ $t('profile.required') }}
        .input-label-group(:class="{'error': errors.has('email')}")
          input.is-expandable(
            name="email"
            type="text"
            placeholder=""
            v-model="email"
            v-validate="'required|email'"
            data-vv-validate-on="blur"
            required
          )
          label.control-label 
            | {{ $t("agency_structure.email") }} 
            span.required--mark *
          transition(name="validation-animation")
            p.help.is-danger(v-show="errors.has('email')") {{ errors.first('email') }}

        .input-label-group(:class="{'error': errors.has('name')}")
          input.is-expandable(
            name="name"
            type="text"
            placeholder=""
            v-model="agencyName"
            v-validate="'required'"
            data-vv-validate-on="blur"
            required
          )
          label.control-label 
            | {{ $t("agency_structure.agency_name") }} 
            span.required--mark *

          transition(name="validation-animation")
            p.help.is-danger(v-show="errors.has('name')") {{ errors.first('name') }}

        base-tree-select(
          v-if="languages && form"
          :value="selectedLanguage"
          :items="languages"
          optionName="language"
          :multiple="false",
          :normalizer="normalizer"
          @input="onLanguageSelect"
          valueFormat="object"
          :isClearable="false"
        )
          div(slot="label") 
            | {{ $t("agency_structure.language") }} 
            span.required--mark *


        base-tree-select(
          v-if="selectedTimezone"
          :key="5"
          :value="selectedTimezone"
          :items="allTimezones"
          optionName="timezone"
          :multiple="false"
          @input="onFieldSelect"
          valueFormat="Array"
          :isClearable="false"
        )
          div(slot="label") 
            | {{ $t("agency_structure.time_zone") }} 
            span.required--mark *

        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.has('timezone')") {{ errors.has('timezone') }} 


        base-tree-select(
          :key="20"
          v-if="dateFormats && form"
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
          p.help.is-danger(v-show="errors.has('dateFormat')") {{ errors.has('dateFormat') }} 
        currency-selector(
            :isClearable="false"
            :isMultiple="false"
            v-model="currency"
            label="Currency"
          )
          div(slot="label") 
            | {{ $t("agency_structure.currency") }} 
            span.required--mark *

        transition(name="validation-animation")
          p.help.is-danger(v-show="errors.has('currency')") {{ errors.has('currency') }} 


        base-tree-select(
          v-if="rateTypes && form"
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

        .input-label-group(:class="{'error': errors.has('hourlyRate'), 'disabled': ![0,1].includes(form && form.rateType)}")
          input.is-expandable(
            name="hourlyRate"
            type="text"
            placeholder=""
            v-model.number="hourlyRate"
            required
          )
          label.control-label {{ $t("agency_structure.hourly_rate") }}
          transition(name="validation-animation")
            p.help.is-danger(v-show="errors.has('hourlyRate')") {{ errors.has('hourlyRate') }}

        div.margin-type(:class="{'error': errors.has('hourlyRate'), 'disabled': ![0,1].includes(form && form.rateType)}")
          base-tree-select(
            v-if="marginTypes && form"
            :value="selectedHourlyMarginType"
            :items="marginTypes"
            optionName="hourlyMarginType"
            :multiple="false",
            :normalizer="normalizer"
            @input="onHourlyMarginTypeSelect"
            valueFormat="object"
            :isClearable="false"
          )
            div(slot="label") 
              | {{ $t("agency_structure.agency_margin_label_hourly") }} 
              span.required--mark *


        .input-label-group(:class="{'error': errors.has('dailyRate'), 'disabled': ![0,2].includes(form && form.rateType)}")
          input.is-expandable(
            name="dailyRate"
            type="text"
            placeholder=""
            v-model.number="dailyRate"
            required
          )
          label.control-label {{ $t("agency_structure.daily_rate") }}
          transition(name="validation-animation")
            p.help.is-danger(v-show="errors.has('dailyRate')") {{ errors.has('dailyRate') }}

        div.margin-type(:class="{'error': errors.has('hourlyRate'), 'disabled': ![0,2].includes(form && form.rateType)}")
          base-tree-select(
            v-if="marginTypes && form"
            :value="selectedDailyMarginType"
            :items="marginTypes"
            optionName="dailyMarginType"
            :multiple="false",
            :normalizer="normalizer"
            @input="onDailyMarginTypeSelect"
            valueFormat="object"
            :isClearable="false"
          )
            div(slot="label") 
              | {{ $t("agency_structure.agency_margin_label_daily") }} 
              span.required--mark *


        .input-label-group(:class="{'error': errors.has('defaultWeeklyHours')}")
          input.is-expandable(
            name="weeklyHours"
            type="text"
            placeholder=""
            v-model.number="weeklyHours"
            required
          )
          label.control-label {{ $t("agency_structure.default_weekly_hours") }}
          transition(name="validation-animation")
            p.help.is-danger(v-show="errors.has('defaultWeeklyHours')") {{ errors.has('defaultWeeklyHours') }}

        .input-label-group(:class="{'error': errors.has('defaultMonthlyHours')}")
          input.is-expandable(
            name="monthlyHours"
            type="text"
            placeholder=""
            v-model.number="monthlyHours"
            required
          )
          label.control-label {{ $t("agency_structure.default_monthly_hours") }}
          transition(name="validation-animation")
            p.help.is-danger(v-show="errors.has('defaultMonthlyHours')") {{ errors.has('defaultMonthlyHours') }}

        .form-space
          .custom-checkbox
                input(id="sendPayrateEnabled" type="checkbox" v-model="sendPayrateEnabled")
                label(for="sendPayrateEnabled") {{ $t("agency_structure.agency_send_payrate_label") }}
        .form-space
          .custom-checkbox
                input(id="swapEnabled" type="checkbox" v-model="swapEnabled")
                label(for="swapEnabled") {{ $t("agency_structure.agency_switch_label") }} 
        .form-space
          v-leave-tracker(:options="holidayTrack" @leave-tracker:update="updateModel")
        .form-space
          a.button.is-tmpst-info.submit(@click="recaptcha" :class="{ 'is-disabled': !canSubmit }") Create Agency

</template>

<script>
import Vue from "vue"
import { VueReCaptcha } from "vue-recaptcha-v3"
import { mapActions, mapState, mapGetters } from "vuex"
import staticAgencyTypes from "@/config/staticAgencyTypes"
import * as moment from "moment-timezone"
import { readServerMessages } from "@/mixins/validationMixin"
import { formErrors } from "@/mixins/formErrorsMixin"
import { translateArray } from "@/utils/general"
import RegistrationBaseLayout from "./VRegistrationBaseLayout"
import VLeaveTracker from "@/components/on-boarding-setup/steps/agency/VLeaveTracker.vue"
import Agency from "@/models/Agency"
import { CurrencySelector } from "@/components/shared/selectors"
import { errorDefaults, successDefaults } from "@/config/notifications"

Vue.use(VueReCaptcha, {
  siteKey: "6LdB9mgaAAAAACKNrxu8Kpx4QQVDgmxjPnwUHA78",
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    VLeaveTracker,
    CurrencySelector,
    RegistrationBaseLayout
  },
  mixins: [readServerMessages, formErrors],
  data: () => {
    return {
      selectedLang: {},
      rateTypes: translateArray(staticAgencyTypes.rateTypes, "name"),
      marginTypes: translateArray(staticAgencyTypes.marginTypes, "name"),
      dateFormats: staticAgencyTypes.dateFormats,
      allTimezones: moment.tz.names().map((item, index) => {
        return {
          id: index + 1,
          label: item
        }
      })
    }
  },

  computed: {
    ...mapState("onboarding/agencySettings", ["languages"]),
    ...mapState("registration", ["form"]),
    ...mapState(["serverErrors"]),
    ...mapState({ mappedError: state => state.serverErrors }),
    // errors() {
    //     return this.formErrors
    // },
    canSubmit() {
      return (
        !!(
          this.email &&
          this.agencyName &&
          this.currency &&
          this.selectedTimezone &&
          this.selectedLanguage
        ) &&
        !!(this.selectedRateType.rateType.value === 0
          ? this.selectedHourlyMarginType && this.selectedDailyMarginType
          : this.selectedRateType.rateType.value === 1
          ? this.selectedHourlyMarginType
          : this.selectedDailyMarginType)
      )
    },
    email: {
      get() {
        return this.form && this.form.email ? this.form.email : null
      },
      set(value) {
        this.updateModel({
          key: "email",
          value: value
        })
      }
    },
    agencyName: {
      get() {
        return this.form && this.form.name ? this.form.name : null
      },
      set(value) {
        this.updateModel({
          key: "name",
          value: value
        })
      }
    },
    hourlyRate: {
      get() {
        return this.form && this.form.hourlyRate ? this.form.hourlyRate : null
      },
      set(value) {
        this.updateModel({
          key: "hourlyRate",
          value: value
        })
      }
    },
    dailyRate: {
      get() {
        return this.form && this.form.dailyRate ? this.form.dailyRate : null
      },
      set(value) {
        this.updateModel({
          key: "dailyRate",
          value: value
        })
      }
    },
    weeklyHours: {
      get() {
        return this.form && this.form.defaultWeeklyHours
          ? this.form.defaultWeeklyHours
          : null
      },
      set(value) {
        this.updateModel({
          key: "defaultWeeklyHours",
          value: value
        })
      }
    },
    monthlyHours: {
      get() {
        return this.form && this.form.defaultMonthlyHours
          ? this.form.defaultMonthlyHours
          : null
      },
      set(value) {
        this.updateModel({
          key: "defaultMonthlyHours",
          value: value
        })
      }
    },
    currency: {
      get() {
        return this.form && this.form.currencyId ? this.form.currencyId : null
      },
      set(value) {
        this.updateModel({
          key: "currencyId",
          value: value
        })
      }
    },
    sendPayrateEnabled: {
      get() {
        return this.form && this.form.isPayRateShowable
          ? this.form.isPayRateShowable
          : false
      },
      set(value) {
        this.updateModel({
          key: "isPayRateShowable",
          value: value
        })
      }
    },
    swapEnabled: {
      get() {
        return this.form && this.form.isSwapJobEnabled
          ? this.form.isSwapJobEnabled
          : false
      },
      set(value) {
        this.updateModel({
          key: "isSwapJobEnabled",
          value: value
        })
      }
    },
    selectedRateType: {
      get() {
        return this.form
          ? { rateType: this.rateTypes[this.form.rateType] }
          : null
      },
      set(value) {
        this.updateModel({
          key: "rateType",
          value: value.rateType.value
        })
      }
    },
    selectedHourlyMarginType: {
      get() {
        return this.form.hourlyMarginType
          ? {
              hourlyMarginType: this.marginTypes[this.form.hourlyMarginType - 1]
            }
          : null
      },
      set(value) {
        this.updateModel({
          key: "hourlyMarginType",
          value: value.hourlyMarginType.value
        })
      }
    },
    selectedDailyMarginType: {
      get() {
        return this.form.dailyMarginType
          ? { dailyMarginType: this.marginTypes[this.form.dailyMarginType - 1] }
          : null
      },
      set(value) {
        this.updateModel({
          key: "dailyMarginType",
          value: value.dailyMarginType.value
        })
      }
    },
    selectedLanguage: {
      get() {
        return this.form && this.form.language
          ? {
              language: this.form.language
            }
          : null
      },
      set(value) {
        this.updateModel({
          key: "language",
          value: value.language
        })
        this.updateModel({
          key: "language_id",
          value: value.language.id
        })
      }
    },
    selectedDateFormat: {
      get() {
        if (this.form && this.form.dateFormat && this.form.dateFormat !== "") {
          console.log(
            this.dateFormats.find(item => this.form.dateFormat === item.value)
          )
        }
        return this.form && this.form.dateFormat && this.form.dateFormat !== ""
          ? {
              dateFormat: this.dateFormats.find(
                item => this.form.dateFormat === item.value
              )
            }
          : null
      },
      set(value) {
        console.log("SETTER", value)
        this.updateModel({
          key: "dateFormat",
          value: value.dateFormat.value
        })
      }
    },
    selectedTimezone: {
      get() {
        let r = {}
        r.timezone =
          this.form && this.form.timezone
            ? this.allTimezones.filter(
                item => item.label == this.form.timezone
              )[0]
            : null
        return r
      },
      set(value) {
        this.updateModel({
          key: "timezone",
          value: value.timezone.label
        })
      }
    },
    holidayTrack() {
      return {
        isTracked: this.form ? this.form.isHolidayTracked : false,
        defaultFulltime: this.form ? this.form.fullTimeDefaultHoliday : null,
        defaultParttime: this.form ? this.form.partTimeDefaultHoliday : null
      }
    }
  },
  created() {
    this.setFormModel(new Agency())
  },
  mounted() {
    this.getLanguages()
  },
  methods: {
    recaptcha() {
      this.$recaptcha("login").then(token => {
        this.submitAgency(Object.assign({}, this.form, { recaptcha: token }))
          .then(resp => {
            console.log("YAY")
            const msg = this.$merge(successDefaults, {
              group: "auth",
              text: "Success"
            })
            this.$notify(msg)
            setTimeout(() => {
              this.$router.push({path: "/login"})
            }, 1000)
          })
          .catch(e => {
            console.log("FAIL", e)
            const msg = this.$merge(errorDefaults, {
              group: "auth",
              text: e.data.errors.error
            })
            this.$notify(msg)
          })
      })
    },
    ...mapActions("onboarding/agencySettings", ["getLanguages"]),
    ...mapActions("registration", [
      "setFormModel",
      "updateModel",
      "submitAgency"
    ]),
    onFieldSelect: function(value) {
      this.selectedTimezone = value
    },
    onLanguageSelect: function(value) {
      this.selectedLanguage = value
    },
    onRateTypeSelect: function(value) {
      this.selectedRateType = value
    },
    onHourlyMarginTypeSelect: function(value) {
      this.selectedHourlyMarginType = value
    },
    onDailyMarginTypeSelect: function(value) {
      this.selectedDailyMarginType = value
    },
    onDateFormatSelect: function(value) {
      this.selectedDateFormat = value
    },
    normalizer: obj => {
      return {
        id: obj.id,
        label: obj.name,
        abr: obj.abbreviation
      }
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


.required {
  text-align: right;
  font-weight: bold;
  text-transform: capitalize;

  &--mark {
    color: $red;
    display: inline-block;
    padding-right: 5px;
  }
}

.submit {
  justify-content: center !important;
}

.is-disabled {
  pointer-events: none;
  opacity: 0.5;
}

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
  margin: 14px auto 0;
  max-width: 410px;

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
