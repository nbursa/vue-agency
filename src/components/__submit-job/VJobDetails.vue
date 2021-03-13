<template lang="pug">
  div.form.job-option-form(ref="jobOptionForm")
    transition-group(name="base-slide-out")
      .columns(:key="0")
        .left-align.column.is-4
          h1.font-semi-bold {{ $t("jobs_submit.job_details_general_info") }}
        .right-align.column.is-8
          button.clear-form(:disabled="!showReset" @click="resetJob")
            svgicon.candidate-icon(width="20px" height="20px" name="__submit-job/cancel-light-rounded" :color="(showReset) ? '#333' : '#dcdcdc'" )
            span {{ $t("jobs_submit.job_details_clear") }} 
          button.save-template(@click="openTemplateModal" :disabled="isSaveTemplateDisabled") 
            svgicon.candidate-icon(width="20px" height="16px" name="__submit-job/save-template" :color="(isSaveTemplateDisabled) ? '#dcdcdc' : '#856FF9'" )
            span {{ $t("jobs_submit.job_details_template_save_btn") }} 
      
      job-tree-select(
        :key="1"
        :value="job"
        v-if="clients.length > 0"
        :items="clients"
        optionName="clientId"
        :disableBranchNodes="true"
        @input="onClientSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
        required
        :placeholder="$t('jobs_submit.job_client_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.job_details_job_tree_select_clients") }} 

      job-tree-select(
        :key="2"
        :value="job"
        :items="templates"
        optionName="templates"
        :disableBranchNodes="true"
        @input="onTemplateSelect"
        :multiple="false"
        :autoEmit="false"
        valueFormat="object"
        :placeholder="$t('jobs_submit.job_title_placeholder')"
        :isDisabled="!isTemplateEnabled"
        optionGroup="Templates"
        :defaultoption="templateDefaultOption"
        @searchField="searchTemplate"
        :removable="true"
        @removeItem="(data) => removeCurrentTemplate = data"
        :noResultsText="$t('jobs_submit.job_details_template_no_options')"
        :noOptionsText="$t('jobs_submit.job_details_template_no_options')"
      )
        label(slot="label") {{$t("jobs_submit.job_details_template_label")}}

      job-tree-select(
        :value="job"
        :key="3"
        v-if="jobTypes.children && jobTypes.children.length > 0"
        :items="jobTypes.children"
        optionName="jobTypeId"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
        required
        :placeholder="$t('jobs_submit.job_category_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.select_jobtype")}}

      job-tree-select(
        :class="{'hidden' : grades.length === 1}"
        :key="4"
        :value="job"
        v-if="grades.length > 0"
        :items="grades"
        optionName="gradeId"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
        required
        :placeholder="$t('jobs_submit.job_grade_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.job_details_job_tree_select_grade") }}   

      job-tree-select(
        :key="5"
        :isDisabled="!(job.clientId && job.clientId.agencies &&  job.clientId.agencies.length > 0)"
        :items="job.clientId && job.clientId.agencies ? job.clientId.agencies : []"
        :value="job"
        optionName="agencyId"
        :disableBranchNodes="isAgencyBranchNodeDisabled"
        @input="onFieldSelect"
        :multiple="false",
        :autoEmit="{childPropName: 'subAgencies'}"
        valueFormat="object"
        required
        :placeholder="$t('jobs_submit.job_location_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.job_details_job_tree_select_location") }}

      job-tree-select(
        :key="6"
        :items="paymentTypeSelectable"
        optionName="paymentType"
        :value="{paymentType: paymentTypeValue}"
        :disableBranchNodes="true"
        @input="onPayTypeSelect"
        :multiple="false"
        :autoEmit="true"
        valueFormat="object"
        :placeholder="$t('jobs_submit.job_payment_type_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.select_payment")}} 

      job-tree-select(
        :key="7"
        :value="job"
        v-if="attributes.length > 0"
        :items="attributes"
        optionName="attributeValues"
        :disableBranchNodes="true"
        @input="onFieldSelect"
        valueFormat="object"
        :placeholder="$t('jobs_submit.job_details_job_tree_select_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.select_attributes")}} 

      job-tree-select(
        :key="8"
        :value="job"
        :items="bonuses"
        optionName="bonuses"
        :multiple="true"
        @input="onFieldSelect"
        valueFormat="object"
        :placeholder="$t('jobs_submit.job_details_job_tree_select_placeholder')"
      )
        label(slot="label") {{ $t("jobs_submit.job_details_job_tree_select_bonuses") }}

      div.columns(:key="9")
        .column.is-3.label-wrapper
          label {{ $t("jobs_submit.job_details_break_duration") }}
        .column.is-2
          base-input.new-layout(optionName="breakMinutes" inputType="number" @input="onFieldSelect" :value="job.breakMinutes")  
        .column.is-1.pl-0
          span {{ $t("jobs_submit.job_details_break_duration_minutes") }}         
        .column.is-6.switch-wrapper
          .switcher
            span {{ $t("jobs_submit.job_details_mandatory") }}
            v-switch(v-model="breakChangeable")
            span( :class="{'type-active': breakPaid}" ) {{ $t("jobs_submit.break_paid") }}
            v-switch(v-model="breakPaid")
      base-text-area(:key="10" optionName="note" @input="onFieldSelect" :value="job.note")
        label(slot="label") {{ $t("jobs_submit.job_details_notes") }}
    job-modal(
      :title="$t('jobs_submit.job_details_job_modal_title')"
      :submitText="$t('jobs_submit.job_details_job_modal_submit_text')"
      :isVisible="showTemplateModal" 
      :onCloseClick="closeTemolateModal" 
      :onClickSubmit="onAddModalClick")
      p {{ $t("jobs_submit.job_details_job_modal_msg") }}
      base-input.new-layout(optionName="name" inputType="text" :placeholder="$t('jobs_submit.job_details_job_modal_placeholder')" :value="templateName" @input="templateName=$event.name")
    job-modal(
      type="remove"
      :title="$t('jobs_submit.job_details_template_remove_modal_title')"
      :submitText="$t('jobs_submit.job_details_template_remove_modal_btn')"
      :isVisible="!!removeCurrentTemplate" 
      :onCloseClick="() => removeCurrentTemplate = false" 
      :onClickSubmit="removeTemplateMethod")
      h5.font-semi-bold {{ $t("jobs_submit.job_details_template_remove_modal_subtitle") }}
      p {{ $t("jobs_submit.job_details_template_remove_modal_content") }}
</template>
<script>
import { mapActions } from 'vuex'
import JobTreeSelect from './JobTreeSelect'
import VSwitch from '@/components/shared/switcher/VSwitch'
import SelectTreeTemplate from './SelectTreeTemplate'
import JobModal from './JobModal'
import BaseTextArea from './BaseTextArea'
import '@/compiled-icons/__submit-job'

export default {
  components: {
    JobTreeSelect,
    VSwitch,
    SelectTreeTemplate,
    JobModal,
    BaseTextArea
  },
  props: {
    showReset: {
      type: Boolean,
      required: true
    },
    jobTypes: {
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
    clients: {
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
    bonuses: {
      type: [Array, Object],
      required: false,
      default() {
        return []
      }
    },
    templates: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    agencies: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showTemplateModal: false,
      removeCurrentTemplate: false,
      templateName: false,
      templateDefaultOption: {
        id: 0,
        name: this.$t('jobs_submit.select_tree_template_def_opt_name')
      },
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
    isSaveTemplateDisabled() {
      if (this.templateName) return false
      return true
    },
    isTemplateEnabled() {
      return !!this.job.clientId
    },
    isAgencyBranchNodeDisabled() {
      return (
        this.clientId &&
        this.clientId.agencies &&
        this.clientId.agencies[0].subAgencies.length !== 0
      )
    },
    breakChangeable: {
      get() {
        return this.job.isBreakChangeable
      },
      set(val) {
        this.updateFieldValue({ isBreakChangeable: val })
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
    paymentTypeSelectable() {
      if (!this.agencies.length) return []
      const agencyRate = this.agencies[0].rateType
      return this.paymentTypeAll.filter((rate) => {
        if (agencyRate === 0) return rate
        return rate.id === agencyRate
      })
    },
    paymentTypeValue: function () {
      return this.paymentTypeSelectable.filter(
        ({ id }) => id === this.job.paymentType
      )[0]
    }
  },
  created() {
    this.job.numberOfCandidates === null
      ? this.onFieldSelect({ numberOfCandidates: 1 })
      : null
  },
  methods: {
    removeTemplateMethod(data) {
      this.removeTemplate(this.removeCurrentTemplate)
      this.removeCurrentTemplate = false
    },
    openTemplateModal() {
      this.showTemplateModal = true
    },
    searchTemplate(term) {
      if (term !== '') this.templateName = term
    },
    ...mapActions('_submitJob', [
      'updateFieldValue',
      'resetJob',
      'removeTemplate'
    ]),
    onFieldSelect(value) {
      this.updateFieldValue(value)
    },
    onTemplateSelect({ templates }) {
      if (!templates || templates.id === 0) return
      Object.keys(templates).map((templateKey) => {
        if (templateKey === 'attributes') {
          this.updateFieldValue({ attributeValues: templates[templateKey] })
        }
        if (templateKey !== 'attributes' && templateKey !== 'clientId') {
          this.updateFieldValue({
            [templateKey]: templates[templateKey]
          })
        }
      })
      this.updateFieldValue({ is_template: false })
      this.updateFieldValue({ templates })
    },
    onClientSelect(value) {
      this.updateFieldValue(value)
      this.updateFieldValue({ agencyId: null })
    },
    onPayTypeSelect(value) {
      if (value.paymentType)
        this.updateFieldValue({ paymentType: value.paymentType.id })
    },
    closeTemolateModal() {
      this.showTemplateModal = false
    },
    onAddModalClick() {
      this.showTemplateModal = false
      this.updateFieldValue({ name: this.templateName })
      this.updateFieldValue({ is_template: true })
      this.updateFieldValue({ templates: { id: 0, name: this.templateName } })
      this.templateName = false
    }
  }
}
</script>
<style lang="stylus">
.new-layout {
  .input-label-group {
    margin: 0!important;
    input {
      padding-left:0 !important;
      text-align: center!important
      margin: 0!important;
      padding-top:0!important;
      height: 35px!important;
      background: #F2F2F2;
      color: #333!important;
      font-size: 16px!important;
      line-height: 35px!important;
      border-radius: 8px!important;
      border: none!important;
    }
  }
  &.light {
    .input-label-group {
    input {
      background: #fff!important;
      border: .5px solid #dcdcdc!important
      }
    }
  }
  }
.job-option-form {
  align-self : flex-start!important;
  .hidden {
    display: none!important;
    }
  .save-template {
    margin-left: 10px;
    width: 182px;
    height: 35px;
    padding: 8px 11px 7px;
    border-radius: 8px;
    border: none;
    background: #f2f2f2;
    color: #856ff9;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
    &:disabled {
      background: #f9f9f9;
      color: #dcdcdc;
    }
  }
  .clear-form {
    width: 90px;
    height: 35px;
    padding: 8px 11px 7px 10px;
    border-radius: 8px;
    border: none;
    background: #f2f2f2;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #333;
      span {
      margin-left: 7px;
    }
    &:disabled {
      background: #f9f9f9;
      color: #dcdcdc;
    }
  }

  .columns {
  margin-bottom: 0!important;
  max-width: 622px;
  }
  .column {
    align-self: center;
  }
  .is-9 {
    max-width: 465px;
  }
  .switch-wrapper {
    max-width: 300px
   }
  }
.job-submit-content-box {
  h1 {
    font-size: 21px;
    }
    .switcher {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  line-height: 35px;
  align-items: center;
  .switch {
    height: 24px;
    .slider.round {
      margin: 0;
      &:before {
        bottom: 2px;
      }
    }
    &:first-of-type {
      margin-right: 10px;
      }
    }
  }
  }

  .pl-0 {
    padding-left: 0!important
  }
</style>
