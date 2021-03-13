<template lang="pug">
  div.form.job-option-form(ref="jobOptionForm")
    transition-group(name="base-slide-out")
      base-tree-select(
        :key="4"
        :value="job"
        v-if="clients.length > 0"
        :items="clients"
        optionName="clientId"
        :disableBranchNodes="true"
        @input="onClientSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
      )
        div(slot="label") {{$t("jobs_submit.select_clients")}}

    

      base-tree-select(
        :key="1"
        :isDisabled="!(job.clientId && job.clientId.agencies.length > 0)"
        :items="job.clientId && job.clientId.agencies ? job.clientId.agencies : []"
        :value="job"
        optionName="agencyId"
        :disableBranchNodes="isAgencyBranchNodeDisabled"
        @input="onFieldSelect"
        :multiple="false",
        :autoEmit="{childPropName: 'subAgencies'}"
        valueFormat="object"
      )
        div(slot="label") {{(job.clientId && job.clientId.agencies.length > 0) ? $t("jobs_submit.select_sector") : $t("jobs_submit.branch_message")}}

      base-tree-select(
        :key="0"
        v-if="paymentTypeSelectable.length > 0"
        :items="paymentTypeSelectable"
        optionName="paymentType"
        :value="job"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
      )
        div(slot="label") {{$t("jobs_submit.select_payment")}}



      base-tree-select(
        :value="job"
        :key="2"
        v-if="jobTypes.children && jobTypes.children.length > 0"
        :items="jobTypes.children"
        optionName="jobTypeId"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
      )
        div(slot="label") {{$t("jobs_submit.select_jobtype")}}

      base-tree-select(
        :key="3"
        :value="job"
        v-if="grades.length > 0"
        :items="grades"
        optionName="gradeId"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
      )
        div(slot="label") {{$t("jobs_submit.select_grade")}}

      base-tree-select(
        :key="5"
        :value="job"
        v-if="attributes.length > 0"
        :items="attributes"
        optionName="attributeValues"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        valueFormat="object"
      )
        div(slot="label") {{$t("jobs_submit.select_attributes")}}

      base-input(
          :key="6"
          v-if="placeholderPropForNumberOfCandidates"
          :value="job.numberOfCandidates"
          :label="$t('jobs_submit.select_num')"
          optionName="numberOfCandidates"
          @input="onFieldSelect"
          inputType="number"
        )

      base-tree-select(
        v-if="bonuses.length > 0"
        :key="7"
        :value="job"
        :items="bonuses"
        optionName="bonuses"
        :multiple="true"
        @input="onFieldSelect"
        valueFormat="object"
      )
        div(slot="label") Bonuses

    div.break-cont 
      base-tree-select.break-cont__dropdown(
        :key="8"
        :value="job"
        :items="getBreakOptions()",
        optionName="breakMinutes"
        valueFormat="object"
        @input="onFieldSelect"
        :multiple="false"
      )
        div(slot="label") {{$t('jobs_submit.break_duration')}}
      div.break-cont__switches
        div.break-switch
          span( :class="{'type-active': breakChangeable}" ) {{ $t("jobs_submit.break_changeable") }}
          v-switch(v-model="breakChangeable")
          
        div.break-switch
          span( :class="{'type-active': breakPaid}" ) {{ $t("jobs_submit.break_paid") }}
          v-switch(v-model="breakPaid")

    div.rate-cont
      div.rate-cont__switch
        span.type-active {{ $t("jobs_submit.override_rate") }}
        v-switch(v-model="rateChangeable")
      transition(name="base-slide-out")
        div.rate-cont__inputs(v-show="rateChangeable")

          calculator(:margin-value="job.rateOverride.margin" :margin-type="job.rateOverride.type" :rate-value="job.rateOverride.rate" @change="updateMargin" :watch-rate="true")

          converter(:margin.number="job.rateOverride.monetary" :rate.number="job.rateOverride.rate" @change="updateRate")

</template>

<script>
import { mapActions } from 'vuex'
import VSwitch from '@/components/shared/switcher/VSwitch'
import generateBreakIntervals from '@/config/breakIntervalGen'
import Calculator from '@/components/rates/VMarginCalculator'
import Converter from '@/components/rates/VRateChargeConverter'

export default {
  components: {
    VSwitch,
    Calculator,
    Converter
  },
  props: {
    placeholderPropForNumberOfCandidates: {
      type: Boolean,
      required: false,
      default: true
    },
    agencies: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    jobTypes: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    attributes: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    grades: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    clients: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    job: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    bonuses: {
      type: [Array, Object],
      required: false,
      default() {
        return []
      }
    },
    namespace: {
      type: String,
      required: false,
      default: 'jobSubmission'
    }
  },
  data() {
    return {
      paymentTypeAll: [
        {
          id: 1,
          label: this.$t('jobs_submit.payment_type_1')
        },
        {
          id: 2,
          label: this.$t('jobs_submit.payment_type_2')
        }
      ]
    }
  },
  computed: {
    breakChangeable: {
      get() {
        return this.job.isBreakChangeable
      },
      set(val) {
        this.updateFieldValue({ isBreakChangeable: val })
      }
    },
    rateChangeable: {
      get() {
        return this.job.isRateChangeable
      },
      set(val) {
        this.updateFieldValue({ isRateChangeable: val })
        this.updateFieldValue({
          rateOverride: {
            rate: null,
            margin: null,
            type: null,
            monetary: null
          }
        })
        if (val) {
          const container = this.$refs.jobOptionForm
          setTimeout(() => {
            container.scrollIntoView(false)
          }, 300)
        }
      }
    },
    breakPaid: {
      get() {
        return this.job.isBreakPayable
      },
      set(val) {
        this.updateFieldValue({ isBreakPayable: val })
      }
    },
    numberOfCandidates() {
      let candidateNo = Array.from(Array(21).keys())
      return candidateNo.map(item => {
        item++
        return {
          id: parseInt(item),
          label: item.toString()
        }
      })
    },
    isAgencyBranchNodeDisabled() {
      return (
        this.clientId &&
        this.clientId.agencies &&
        this.clientId.agencies[0].subAgencies.length !== 0
      )
    },
    paymentTypeSelectable() {
      if (!this.agencies.length) return []
      const agencyRate = this.agencies[0].rateType
      return this.paymentTypeAll.filter(rate => {
        if (agencyRate === 0) return rate
        return rate.id === agencyRate
      })
    }
  },
  created() {
    this.job.numberOfCandidates === null
      ? this.onFieldSelect({ numberOfCandidates: 1 })
      : null
  },
  methods: {
    ...mapActions({
      updateFieldValue(dispatch, payload) {
        return dispatch(`${this.namespace}/updateFieldValue`, payload)
      },
      resetJob(dispatch, payload) {
        return dispatch(`${this.namespace}/resetJob`)
      }
    }),
    onFieldSelect(value) {
      this.updateFieldValue(value)
    },
    onClientSelect(value) {
      this.updateFieldValue(value)
      this.updateFieldValue({ agencyId: null })
    },
    getBreakOptions: generateBreakIntervals,
    updateRate(value) {
      this.updateFieldValue({
        rateOverride: {
          ...this.job.rateOverride,
          rate: value ? Number(value) : null
        }
      })
    },
    updateMargin(value) {
      this.updateFieldValue({
        rateOverride: { ...this.job.rateOverride, ...value }
      })
    }
  }
}
</script>
<style lang="scss">
.job-option-form {
  .rate {
    margin-bottom: 10px !important;
    .vue-treeselect {
      &__menu {
        max-height: 150px !important;
      }
    }
    input {
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.form {
  padding: 1em 1.5em 9.5em 1.5em;
}

.break-switch {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  margin-top: 5px;
  margin-bottom: 5px;
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

.break-cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__dropdown {
      flex: 0 0 65%;
    }
    &__switches {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 70px;
    }
}

.rate-cont {
  width: 100%;
  &__rate {
    position: relative;
    &--currency {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;  
      font-weight: 600;
    }  
    & >>> .is-expandable {
      padding-right: 40px;  
    }
  }
  &__switch {
    padding-top: 25px;
    margin-top: 20px;
    border-top: 1px solid #dfe6eb;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 4px;
  }
}
</style>
