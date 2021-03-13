<template lang="pug">
  div
    header.sidebar_header
      .sidebar-control
        | {{ $t("rates_sidebar.header") }}
      //- .sidebar-control
      //-   div.view-margins(@click.prevent="")
      //-     svgicon.icon(name="login/eye-password-show" style="margin-right: 5px;")
      //-     | {{ $t("margins_sidebar.view") }}
      .delete-rate(v-if="sidebarComponent === 'edit'")
        a.delete-rate__button(@click="onRemove")
          svgicon(name="temp/delete-normal" :width="'26'" :height="'20'" :fill="false")
          span {{ $t("margins_sidebar.remove_button") }}
    section.sidebar-overflow
      div.v-table-content__loader(v-show="sidebarStatus")
        atom-spinner(
          :animation-duration="1000"
          :size="60"
          :color="'#856ff9'"
        )
      div.pay-rates
        .margins__title-label {{$t("margins_sidebar.filter_label")}}
        .pay-rates__option-list#pay-rates_list(ref="rates")
          div.pay-rates__option
            base-tree-select(:multiple="false" valueFormat="object" :items="clients" :value="computedFilters['client']" optionName="client" ref="clientSelector" :hasAutoEmitSelect="true" @auto-select="dayTimeSetter")
              div(slot="label") {{ $t(`rates_sidebar.client`) }}
            
            base-tree-select(v-if="dayTimes.length !== 0" :multiple="true" valueFormat="object" :items="localDayTimes" :value="localSelectedDayTimes" optionName="dayTime" ref="dayTimeSelector")
              div(slot="label") {{ $t(`rates_sidebar.shift_time`) }}

          div.pay-rates__option(v-for="(option, index) in options")
            base-tree-select(:key="index" :multiple="true" valueFormat="object" :items="option[Object.keys(option)[0]]" :optionName="Object.keys(option)[0]" :value="computedFilters[Object.keys(option)[0]]")
              div(slot="label") {{ $t(`rates_sidebar.${itemLabels[index]}`) }}
        //- div.pay-rates__rate-input
        //-   div.pay-rates__rate-input--relative
        //-     input.input(v-model.number="rate" :placeholder="$t(`rates_sidebar.${tableMode}_rate`)" type="number" @keyup.enter="submitPayrates")
        //-     label {{$currency.sign}}

        calculator(:margin-value="margin" :margin-type="marginType" :rate-value="rate" @change="updateMarginType" @margin-calc:submit="submitPayrates")

        converter(:margin.number="marginMonetary" :rate.number="rate" @converter-calc:submit="submitPayrates" @change="updateRate")

        base-button.is-fullwidth.space-top(@click="filterPayrates")
          span {{ $t("rates_sidebar.button_filter") }}

        div.pay-rates__bottom-controls(v-if="activeTable === 'scheduled'")
          div.pay-rates__calendar-container
            div.pay-rates__calendar
              flatpickr(
                :options="config"
                v-model="publishTime"
                ref="flatpickr"
                :showInternalInput="false"
                :placeholder="$t('rates_sidebar.cal_label')"
              )
              svgicon.pay-rates__cal-label(name="side-nav/job-schedule-active" :fill="false" width="20" height="20"   color="#284B5D")
            a.pay-rates__button--red(@click.prevent="cancelPublish") {{ $t("rates_sidebar.button_reset") }}
            a.pay-rates__button(@click.prevent="setPublishDate") {{ $t("rates_sidebar.button_publish") }}

      div.sidebar-footer
        div.pay-rates__rate-controls
          span.pay-rates__rate-controls--title {{ sidebarComponent === 'edit' ? $t("rates.sidebar_label_rates_update")  : $t("rates.sidebar_label_rates_create") }}
          div.is-pulled-right
            base-button.is-cancel-text-only(@click="reset")
              span {{ $t("global.cancel") }}
            base-button(@click="submitPayrates" customClass="is-small") {{ sidebarComponent === 'edit' ? $t("rates_sidebar.button_update") : $t("global.create")  }}
</template>

<script>
import VPayRate from './VPayRate.vue'
import flatpickr from '@/components/shared/flat-pickr'
import Calculator from '../VMarginCalculator'
import Converter from '../VRateChargeConverter'
import { mapState, mapActions, mapGetters } from 'vuex'
import { snakeCase, camelCase } from 'lodash'
import { errorDefaults } from '@/config/notifications'
import { AtomSpinner } from 'epic-spinners'
import { formMessages } from '@/mixins/formMessages.mixin'

import '@/compiled-icons/agency-structure'
import 'flatpickr/dist/flatpickr.css'

export default {
  components: {
    VPayRate,
    Converter,
    flatpickr,
    AtomSpinner,
    Calculator
  },
  mixins: [formMessages],
  data() {
    return {
      itemLabels: ['day_type', 'job_type', 'area', 'grade'],
      rate: null,
      margin: null,
      marginType: null,
      marginMonetary: 0,
      localDayTimes: [],
      localSelectedDayTimes: [],
      selectedClient: null,
      pickTime: '',
      config: {
        mode: 'single',
        enableTime: true,
        clickOpens: true,
        inline: true,
        minDate: 'today',
        static: true
      }
    }
  },
  computed: {
    ...mapState('rates', [
      'options',
      'tableMode',
      'publishDate',
      'activeTable',
      'sidebarStatus',
      'clients',
      'dayTimes'
    ]),
    ...mapState('rates/table', ['selected']),
    ...mapState('rates/sidebar', ['sidebarComponent']),
    ...mapGetters('rates', ['getErrors']),
    errorMessage() {
      return this.getErrors
    },
    selectedRate() {
      //temp fix untill backend adds clients to rates
      if (this.selected[0] && !this.selected[0].client) {
        return { client: null, ...this.selected[0] }
      }
      return this.selected[0]
    },
    validChildren: function () {
      const validChildren = this.$children.filter((child) => {
        return child.optionName
      })
      return validChildren
    },
    selectedOptions: function () {
      const result = this.validChildren.reduce((acc, child) => {
        const keyName = child.optionName
        if (child.selected && keyName !== 'client') {
          acc[`${snakeCase(keyName)}s`] = Array.isArray(child.selected)
            ? child.selected.map((item) => {
                return { id: item.id }
              })
            : child.selected.id
        }
        if (keyName === 'client') {
          acc['client'] = child.selected ? child.selected.id : null
        }
        return acc
      }, {})
      return result
    },

    rateName() {
      return this.createPropName('Rate')
    },
    marginName() {
      return this.createPropName('Margin')
    },
    marginTypeName() {
      return this.createPropName('MarginType')
    },

    computedFilters: function () {
      return {
        client: this.selectedRate ? this.selectedRate.client : null, //temp fix
        dayTime: this.selectedRate ? [this.selectedRate.dayTime] : [],
        dayType: this.selectedRate ? [this.selectedRate.dayType] : [],
        jobType: this.selectedRate ? [this.selectedRate.jobType] : [],
        area: this.selectedRate ? [this.selectedRate.area] : [],
        grade: this.selectedRate ? [this.selectedRate.grade] : []
      }
    },
    publishTime: {
      get() {
        return !this.pickTime ? this.publishDate : this.pickTime
      },
      set(d) {
        this.pickTime = d
      }
    }
  },
  watch: {
    publishDate: function (newVal, oldVal) {
      if (newVal.length === 0 && oldVal.length !== 0) {
        this.pickTime = ''
      }
    },
    activeTable: {
      handler: 'updateRateData'
    },
    tableMode: {
      handler: 'updateRateData'
    },
    selectedRate: {
      handler: 'updateRateData',
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('rates', [
      'cancelPublish',
      'filterRates',
      'updateBulkRates',
      'createBulkRates',
      'publishPayrates',
      'deletePayrate',
      'getAllPayrates'
    ]),
    ...mapActions('rates/table', [
      'hideColumn',
      'showColumn',
      'clearSelectedItems'
    ]),

    updateRate(val) {
      this.rate = val
      // console.log('VALUE FROM CONVERTER', this.rate)
    },

    dayTimeSetter(client) {
      this.localDayTimes =
        client && client.dayTimes && client.dayTimes.length !== 0
          ? client.dayTimes
          : this.dayTimes
      if (client) {
        this.localSelectedDayTimes =
          this.selectedRate.dayTime &&
          client.dayTimes &&
          client.dayTimes.length !== 0
            ? client.dayTimes.filter(
                (dayTime) => dayTime.id === this.selectedRate.dayTime.id
              )
            : [this.selectedRate.dayTime]
      } else {
        this.localSelectedDayTimes = this.computedFilters.dayTime
      }
    },
    //Do not show filter if only one option is present
    shouldShowFilter(option) {
      const optionName = Object.keys(option)[0]
      const items = option[optionName]
      const singleChildCheck = (items) => {
        if (items.length > 1) {
          this.showColumn(optionName)
          return true
        }
        if (items[0].children) {
          return singleChildCheck(items[0].children)
        } else {
          this.hideColumn(optionName)
          return false
        }
      }
      return items.length !== 0 ? singleChildCheck(items) : false
    },
    createPropName(name) {
      return this.activeTable === 'scheduled'
        ? camelCase(`${this.activeTable}_${this.tableMode}_${name}`)
        : camelCase(`${this.tableMode}_${name}`)
    },
    updateRateData() {
      this.marginType =
        this.selectedRate && this.selectedRate[this.marginTypeName]
      this.rate = this.selectedRate && this.selectedRate[this.rateName]
      this.margin = this.selectedRate && this.selectedRate[this.marginName]
      this.localSelectedDayTimes = this.selectedRate
        ? [this.selectedRate.dayTime]
        : []
    },
    updateMarginType(value) {
      // console.log('margin update', value)
      this.marginType = value.type
      this.margin = value.margin
      this.marginMonetary = value.monetary
    },
    getSelectedVal(item) {
      return this.selectedRates ? this.selectedRates[item] : []
    },
    submitPayrates() {
      if (!this.rate) {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          text: this.$t('rates_sidebar.submit_err')
        })
        this.$notify(e)
      } else {
        let payload = Object.assign({}, this.selectedOptions, {
          [this.rateName]: this.rate,
          [this.marginName]: this.margin,
          [this.marginTypeName]: this.marginType //margin type deviates
        })
        if (this.selectedOptions.client) {
          payload['client_id'] = this.selectedOptions.client
          delete payload.client
        }
        if (this.sidebarComponent === 'edit') {
          this.createBulkRates(payload)
        }
        if (this.sidebarComponent === 'create') {
          this.createBulkRates(payload)
        }
      }
    },
    setPublishDate() {
      const payload = {
        time: `${this.publishTime}:00`
      }
      this.publishPayrates(payload)
        .then()
        .catch((e) => {
          console.log(e.data.errors.error)
          const err = this.$merge(errorDefaults, {
            group: 'foo',
            text: e.data.errors.time
              ? e.data.errors.time.toString()
              : e.data.errors.error
          })
          this.$notify(err)
        })
    },
    filterPayrates() {
      this.filterRates(this.selectedOptions)
    },
    reset() {
      this.clearSelectedItems()
      this.pickTime = null
      this.rate = null
      this.margin = null
      this.validChildren.forEach((item) => {
        item.selected = []
      })
      this.$emit('sidebar:navigate', 'default')
    },
    onRemove() {
      this.deletePayrate(this.selectedRate.id)
        .then(() => {
          this.clearSelectedItems()
        })
        .then(() => {
          this.getAllPayrates()
        })
        .catch((e) => {
          const err = this.$merge(errorDefaults, {
            group: 'foo',
            text: e.data.errors.error
          })
          this.$notify(err)
        })
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/styles/global/partials/flatpickr-rate-editing';
</style>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/components/RateEditSidebar';
</style>
