<template lang="pug">
div
  div
    form.sidebar-form(@submit.prevent="save")
      .sidebar-form_field(v-if="action === 'edit'")
        label.sidebar-form_label {{ $t("candidates_sidebar.candidate_id") }}
        span.sidebar-form_label(style="color: #000000") {{candidate.id}}

      v-sidebar-input(
        v-model="payrollId"
        :inputType="'number'"
        :label="$t('candidates_sidebar.payroll_id')"
      )

      v-sidebar-input(
        v-model="internalId"
        :inputType="'number'"
        :label="$t('candidates_sidebar.internal_id')"
      )

      v-sidebar-input(
        v-model="firstName"
        :inputType="'text'"
        :label="$t('candidates_sidebar.first_name')"
        :error="errorsFromBack.hasOwnProperty('firstName') ? errorsFromBack.firstName[0] : ''"
      )

      v-sidebar-input(
        v-model="lastName"
        :inputType="'text'"
        :label="$t('candidates_sidebar.last_name')"
        :error="errorsFromBack.hasOwnProperty('lastName') ? errorsFromBack.lastName[0] : ''"
      )

      v-sidebar-input.required(
        v-model="email"
        type="email"
        :label="$t('candidates_sidebar.email')"
        name="email"
        :error="errorsFromBack.hasOwnProperty('email') ? errorsFromBack.email[0] : errors.first('email')"
        :disabled="(status === 0) ? false : true"
      )

      v-sidebar-input(
        v-model="address"
        type="text"
        :label="$t('candidates_sidebar.address')"
        :error="errorsFromBack.hasOwnProperty('address') ? errorsFromBack.address[0] : ''"
      )


      v-sidebar-input(
        v-model="homeCity"
        :inputType="'text'"
        :label="$t('candidates_sidebar.city')"
        :error="errorsFromBack.hasOwnProperty('homeCity') ? errorsFromBack.homeCity[0] : ''"
      )


      v-sidebar-input(
        v-model="postcode"
        type="text"
        :label="$t('candidates_sidebar.post_code')"
        :error="errorsFromBack.hasOwnProperty('postcode') ? errorsFromBack.postcode[0] : ''"
      )

      //- v-sidebar-input(
      //-   v-model="mobilePhone"
      //-   :inputType="'tel'"
      //-   :label="$t('candidates_sidebar.mobile_phone')"
      //- )

      .sidebar-form_field
        label.sidebar-form_label {{ $t("candidates_sidebar.started_working") }}
        flatpickr(
          :options="config",
          v-model="startDate",
          :showInternalInput="false"
        )

      //- v-sidebar-input(
      //-   v-model="daysTakenOver"
      //-   type="number"
      //-   :label="$t('candidates_sidebar.days_taken')"
      //- )

      v-sidebar-input(
        v-model="holidayPerYear"
        type="number"
        :label="$t('candidates_sidebar.holiday_days')"
      )

      v-sidebar-input(
        v-model="weeklyHours"
        type="number"
        :label="$t('candidates_sidebar.weekly_hours')"
      )

      v-sidebar-input(
        v-model="monthlyHours"
        type="number"
        :label="$t('candidates_sidebar.monthly_hours')"
      )

      .sidebar-form_field(style="overflow:visible;")
        v-agency-selector(
          :label="$t('candidates_sidebar.agency')"
          v-model="selectedAgencies"
        )

      .sidebar-form_field(style="overflow:visible;")
        v-attribute-selector(
          v-model="attributes"
          :isMultiple="true"
          :label="$t('candidates_sidebar.attributes')"
        )
        .help.is-danger(v-if="errorsFromBack.hasOwnProperty('attributeValues')")
          | {{ errorsFromBack.attributeValues[0] }}


      v-sidebar-input(
        v-model="homePhone"
        :inputType="'tel'"
        :label="$t('candidates_sidebar.home_phone')"
        :error="errorsFromBack.hasOwnProperty('homePhone') ? errorsFromBack.homePhone[0] : ''"
      )

      base-phone-input(
        :watchForRerender="candidate.id"
        :error="errorsFromBack.hasOwnProperty('mobilePhone') ? errorsFromBack.mobilePhone[0] : ''"
        :label="$t('candidates_sidebar.mobile_phone')"
        v-model="mobilePhone"
        :optionsBind="{'no-example': true, 'no-validator-state': true}"
      )

      .sidebar-form_field(style="padding-top: 1em")
        label.sidebar-form_label(style="padding-top:0.35em") {{ $t("candidates_sidebar.employment_type") }}
        div.employment-type-switch
          span( :class="{'type-active': !employmentType}" ) {{ $t("candidates_sidebar.employment_part") }}
          v-switch(v-model="employmentType")
          span( :class="{'type-active': employmentType}" ) {{ $t("candidates_sidebar.employment_full") }}
      .border-line
      .sidebar-form_field.sidebar-form_field--job-type.required
          .help.is-danger(v-if="errorsFromBack.hasOwnProperty('jobTypes')" style="text-align:left")
            | {{ errorsFromBack.jobTypes[0] }}
          label.sidebar-form_label
            | {{ $t("candidates_sidebar.job_type") }}
          a.is-pulled-right(@click.prevent="$emit('form:addJobType')") + {{ $t("candidates_sidebar.button_add_job") }}
      div(style="clear:both")

    .sidebar-footer
      span(v-if="$i18n.locale === 'en'") {{ $t(`candidates_sidebar.${action}`) | uppercase }} {{ $t("candidates_sidebar.candidate") }}?
      span(v-else)  {{ $t("candidates_sidebar.candidate") }} {{ $t(`candidates_sidebar.${action}`) }}?
      .is-pulled-right
        a.button.is-cancelled(@click.prevent="onCancel") {{ $t("candidates_sidebar.cancel") }}
        base-button(@click="onSave" customClass="is-small" v-enableSubmit="{ formItem: candidate, toCheck: ['email', 'jobTypes'] }") {{$t("candidates_sidebar.save") }}
</template>

<script>
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import VAgencySelector from '@/components/shared/agency-selector/VAgencySelector'
import { VAttributeSelector } from '@/components/shared/selectors'
import DateTimeUtils from '@/utils/dateUtils.js'
import flatpickr from '@/components/shared/flat-pickr'
import VSidebarCheckbox from '@/components/shared/sidebar-form/VSidebarCheckbox'

import VSwitch from '@/components/shared/switcher/VSwitch'
import formValidator from '@/directives/formValidator.js'

import { mapActions, mapState, mapGetters } from 'vuex'
import 'flatpickr/dist/flatpickr.css'

export default {
  $_veeValidate: {
    validator: 'new',
    events: ''
  },
  directives: {
    enableSubmit: formValidator
  },
  components: {
    flatpickr,
    VSwitch,
    VSidebarInput,
    VAgencySelector,
    VAttributeSelector,
    VSidebarCheckbox
  },
  filters: {
    uppercase: function (v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  },
  props: {
    candidate: {
      required: true,
      type: Object
    },
    action: {
      type: String,
      required: true
    },
    updateFn: {
      type: Function,
      required: true
    },
    errorsFromBack: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      config: {
        mode: 'single',
        enableTime: false
      },
      notificationMethodsInternal: {
        push: false,
        email: false,
        sms: false
      }
    }
  },
  computed: {
    attributes: {
      get() {
        if (!this.candidate.attributeValues) {
          return []
        }
        return this.candidate.attributeValues.map((attributeValue) => {
          return attributeValue.id
        })
      },
      set(value) {
        const attributeValues = value.map((attributeValueId) => ({
          id: attributeValueId
        }))
        this.updateFn({
          name: 'attributeValues',
          value: attributeValues
        })
      }
    },
    payrollId: {
      get() {
        return this.candidate.payrollId
      },
      set(val) {
        this.updateFn({
          name: 'payrollId',
          value: val
        })
      }
    },
    internalId: {
      get() {
        return this.candidate.internalId
      },
      set(val) {
        this.updateFn({
          name: 'internalId',
          value: val
        })
      }
    },
    firstName: {
      get() {
        return this.candidate.firstName
      },
      set(value) {
        this.updateFn({
          name: 'firstName',
          value: value
        })
      }
    },
    lastName: {
      get() {
        return this.candidate.lastName
      },
      set(value) {
        this.updateFn({
          name: 'lastName',
          value: value
        })
      }
    },
    address: {
      get() {
        return this.candidate.homeAddress
      },
      set(value) {
        this.updateFn({
          name: 'address',
          value: value
        })
        this.updateFn({
          name: 'homeAddress',
          value: value
        })
      }
    },
    homePhone: {
      get() {
        return this.candidate.homePhone
      },
      set(value) {
        this.updateFn({
          name: 'homePhone',
          value: value
        })
      }
    },
    homeCity: {
      get() {
        return this.candidate.homeCity
      },
      set(value) {
        this.updateFn({
          name: 'homeCity',
          value: value
        })
        this.updateFn({
          name: 'city',
          value: value
        })
      }
    },
    postcode: {
      get() {
        return this.candidate.postcode
      },
      set(value) {
        this.updateFn({
          name: 'postcode',
          value: value
        })
      }
    },
    hoursWorked: {
      get() {
        return this.candidate.hoursWorked
      }
    },
    mobilePhone: {
      get() {
        return this.candidate.mobilePhone
      },
      set(value) {
        // console.log('FORM +STTER', value)
        this.updateFn({
          name: 'mobilePhone',
          value: value
        })
      }
    },
    status: {
      get() {
        return this.candidate.userStatus
      }
    },
    email: {
      get() {
        return this.candidate.email
      },
      set(value) {
        this.updateFn({
          name: 'email',
          value: value
        })
      }
    },
    holidayPerYear: {
      get() {
        return this.candidate.daysPerYear
      },
      set(value) {
        this.updateFn({
          name: 'daysPerYear',
          value: value
        })
      }
    },
    daysTakenOver: {
      get() {
        return this.candidate.daysTaken
      },
      set(value) {
        this.updateFn({
          name: 'daysTaken',
          value: value
        })
      }
    },
    weeklyHours: {
      get() {
        return this.candidate.weeklyHours
      },
      set(value) {
        this.updateFn({
          name: 'weeklyHours',
          value: value
        })
      }
    },
    monthlyHours: {
      get() {
        return this.candidate.monthlyHours
      },
      set(value) {
        this.updateFn({
          name: 'monthlyHours',
          value: value
        })
      }
    },
    startDate: {
      get() {
        return this.candidate.employmentStartDate
          ? DateTimeUtils.getDateFromSQL(this.candidate.employmentStartDate)
          : null
      },
      set(newDate) {
        this.updateFn({
          name: 'employmentStartDate',
          value: newDate
        })
      }
    },
    selectedAgencies: {
      get() {
        return this.candidate.agencies.filter(
          (agency) =>
            this.candidate.agencies.filter((a) => a.id == agency.parentId)
              .length == 0
        )
      },
      set(value) {
        this.updateFn({
          name: 'agencies',
          value: value
        })
      }
    },
    employmentType: {
      get() {
        return this.candidate ? this.candidate.employmentType === 2 : false
      },
      set(val) {
        this.updateFn({
          name: 'employmentType',
          value: val ? 2 : 1
        })
      }
    }
  },
  methods: {
    onSave() {
      this.$validator
        .validateAll({
          email: this.email
        })
        .then((valid) => {
          if (!valid) {
            // validation failed
            // console.log('validation failed (vee-validate)')
            return
          } else {
            // all good
            this.$emit('form:save')
          }
        })
    },
    onCancel() {
      this.$emit('form:cancel')
    }
  }
}
</script>
<style lang="stylus" scoped>

@import '~@/assets/styles/global/variables';

.sidebar-form {
  overflow: visible;
  clear: both;
}

.sidebar-form_field--job-type {
  padding-bottom: 10px !important;

  @media (max-width: $display-small-desktop) {
    display: flex;
    flex-direction: column;
  }
}
.employment-type-switch {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  margin-bottom: 10px;
  span {
    font-size: 12px;
    opacity: 0.5;
    &.type-active {
      opacity: 1;
    }
  }
  .switch {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
