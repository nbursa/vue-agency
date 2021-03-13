<template lang="pug">
div
  header
    .sidebar-control
  section.sidebar-overflow
    .sidebar-content(style="padding-top: 10px")
      div.invoice-panel.first(v-if="!open" @click="open = !open")
        span.name {{$t("billing_sidebar.title")}}
        span.icon +
      div.invoice-panel.customize(v-else)
        div.name(@click="open = !open")
          span {{$t("billing_sidebar.title")}}
          span.icon -
        div.invoice-panel__item(style="padding-top: 0; margin-top: 0;")
          baseInput(
            :label="nameLabel"
            v-model="bonusItem.name"
          )
          p.error(v-if="error && !bonusItem.name") {{$t("billing_sidebar.name_error")}}
          div.base-input.custom-input
            div.input-label-group(:style="{ marginBottom: inputBottom }")
              input.is-expandable(:class="{'base-input--has-error': error}" @keypress="isNumber($event)" required type="number" v-model="bonusItem.value")
              label.control-label(for="input") {{this.$t("billing_sidebar.value")}}
            p.error(v-if="error && !bonusItem.value" style="margin-bottom: 20px;") {{$t("billing_sidebar.value_error")}}
            p.error(v-if="numberError" style="margin-bottom: 20px;") {{$t("billing_sidebar.number_error")}}
          baseButton(
            class="custom"
            @click="addCustomItem"
          ) {{$t("billing_sidebar.preview_button")}}
        div.name(v-if="additionals.length" style="margin-top: 20px") {{$t("billing_sidebar.additionals_preview")}}
        div.invoice-panel__item(v-if="additionals.length" style="width: 100%;") {{$t("billing_sidebar.title")}}
          div.invoice-panel__item.additional(v-if="additionals.length" v-for="(item, index) in additionals" :key="index" @click="removeCustomItem(item.index)" style="width: 100%;")
            span.invoice-panel__label(v-if="item.name") {{ item.name }}
            span.value.value--small(v-if="item.value") {{ parseFloat(item.value).toFixed(2) }} {{$currency.sign}}
            baseButton(
              class="close-btn"
              @click="removeCustomItem(item.index)"
            ) {{ }}
            //- ) {{$t("billing_sidebar.remove")}}
        div.total(v-if="additionals.length") {{$t("billing_sidebar.preview_total")}}
          span.value(v-if="additionalsTotal") {{ parseFloat(additionalsTotal).toFixed(2) }} {{$currency.sign}}
        div.invoice-panel__item(v-if="additionals.length")
          baseButton(
              class="custom"
              @click="addToInvoice"
              style="height: auto; padding: 10px 30px;"
            ) {{$t("billing_sidebar.invoice_label")}}
      div.invoice-panel
        div.name {{clientName}}
        div.invoice-panel__item
          span.invoice-panel__label {{$t("billing_sidebar.jobscount")}}
          span.value.value--small {{selectedShifts.jobsCount}}
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.total_net")}}
          span.value.value--small {{selectedShifts.totalNetAmount}} {{$currency.sign}}
        div.invoice-panel__item.has-border(v-if="selectedShifts.additionals && JSON.parse(selectedShifts.additionals).length > 0" style="width: 100%;") {{$t("billing_sidebar.title")}} 
          div.item(v-for="(item, index) in JSON.parse(selectedShifts.additionals)" :key="index")
            span.invoice-panel__label(v-if="item.name") {{ item.name }}
            span.value.value--small(v-if="item.value") {{ parseFloat(item.value).toFixed(2) }} {{$currency.sign}}
        div.invoice-panel__item(v-if="selectedShifts.additionalTotalAmount > 0")
          span.invoice-panel__label {{$t("billing_sidebar.additionals_total")}}
          span.value.value--small {{ selectedShifts.additionalTotalAmount }} {{$currency.sign}}
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.subtotal")}}
          span.value.value--small {{ selectedShifts.subtotal }} {{$currency.sign}}
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.total_tax")}}
          span.value.value--small {{selectedShifts.totalTax}} %
        div.invoice-panel__item
          span.invoice-panel__label {{$t("billing_sidebar.total_tax_amount")}}
          span.value.value--small {{selectedShifts.totalTaxAmount}} {{$currency.sign}}
        div.invoice-panel__item.last-item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.total")}}
          span.value.value {{selectedShifts.grandTotal}} {{$currency.sign}}
        div.invoice-panel__job-list(v-if="selectedShifts.jobTypes")
          div.job-list-label {{$t("billing_sidebar.job_type_label")}}
          span {{selectedShifts.jobTypes.join(", ")}}
        div.invoice-panel__item.po-number
          span.invoice-panel__label PO#
          baseInput(
            customClass="po"
            v-model="poNumber"
          )
        div.invoice-panel__note
          div.note-label {{$t("billing_sidebar.note_label")}}
          textarea.textarea(
            v-model="note"
          )

    .sidebar-footer
      span {{$t("billing.create_invoice")}}
      .is-pulled-right
        a.button.is-cancelled(@click.prevent="cancel") {{$t("global.cancel")}}
        base-button(@click="submit" customClass="is-small") {{$t("global.create")}}



</template>

<script>
import CreateInvoice from "./VCreateInvoiceLink"
import {mapState, mapActions, mapGetters} from "vuex"

import BaseInput from '@/components/shared/base-components/BaseInput'
import BaseButton from '@/components/shared/base-components/BaseButton'

export default {
  components: {
    CreateInvoice,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      note: "",
      jobTypesTest: ["test 1", "test 2", "test 3"],
      nameLabel: this.$t("billing_sidebar.name"),
      valueLabel: this.$t("billing_sidebar.value"),
      bonusItem: {
        name: '',
        value: null
      },
      customItems: [],
      error: false,
      numberError: false,
      errMessage: '',
      poNumber: '',
      open: false
    }
  },
  computed: {
    ...mapState("shifts", ["selectedShifts", "selectedClient", "additionals"]),
    ...mapState("shifts/table", ["checked"]),
    ...mapGetters("shifts", ["additionalsTotal"]),
    clientName: function() {
      return this.checked[0].client.name
    },
    lastItem: function() {
      return this.customItems[this.customItems.length - 1]
    },
    inputBottom: function() {
      return this.error && !this.bonusItem.value || this.numberError ? 0 : '20px'
    }
  },
  watch: {
    checked: function(item) {
      if(item.length > 0) {
        this.getInvoicePreview({ jobs: this.checked, additionals: this.additionals })
      }
    }
  },
  mounted() {
    this.getInvoicePreview({ jobs: this.checked, additionals: this.additionals })
  },
  methods: {
    ...mapActions("shifts", ["getInvoicePreview", "clearInvoice", "createInvoice", "setActiveState", "setAdditional", "clearAdditionals", "removeAdditional"]),
    ...mapActions("shifts/sidebar", ["setSidebarComponent"]),
    ...mapActions("shifts/table", ["clearCheckedItems"]),
    addCustomItem() {
      if (!this.bonusItem.name || !this.bonusItem.value) {
        this.error = true
      } else {
        this.error = false
        this.setAdditional({
          name: this.bonusItem.name,
          value: parseFloat(this.bonusItem.value).toFixed(2)
        })
        this.clear()
      }
    },
    removeCustomItem(index) {
      this.removeAdditional(index)
    },
    addToInvoice() {
      this.getInvoicePreview({ jobs: this.checked, additionals: this.additionals })
      this.clearAdditionals()
      this.open = !this.open
    },
    clear() {
      this.bonusItem.name = ''
      this.bonusItem.value = null
    },
    cancel() {
      this.clearInvoice()
      this.clearCheckedItems()
    },
    submit() {
      this.createInvoice({jobs: this.checked, note: this.note, additionals: JSON.parse(this.selectedShifts.additionals), poNumber: this.poNumber})
        .then(() => {
          this.cancel()
          this.setSidebarComponent("default")
          this.$router.push({ path: "/invoices" })
        })
        .then(() => this.clearAdditionals())
    },
    isNumber(evt) {
      this.numberError = false
      evt = (evt) ? evt : window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        if((this.bonusItem.value === null || this.bonusItem.value === '' && charCode === 45) || (this.bonusItem.value && this.bonusItem.value.toString().length > 0  && (charCode === 46 || charCode === 44))) {
          return true
        }
        evt.preventDefault()
        this.numberError = true
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/partials/action-buttons';
@import '~@/assets/styles/global/partials/invoice-sidebar';
@import '~@/assets/styles/global/label-input';
@import '~@/assets/styles/global/expandable-input';

.sidebar-control
  height 48px

.action-panel
  display flex
  justify-content space-between
  &--is-disabled
    opacity 0.5
    pointer-events none

.custom-input
  .input-label-group
    .is-expandable:focus + label,
    .is-expandable:valid + label
      color #838d98
      top 5px
    label
      color #838d98


.sidebar-content
  overflow hidden
  height auto
  padding 0
  .first
    margin-bottom 20px
    display flex
    align-items center
    justify-content space-between
    padding 0 10px
    border-radius 30px
    cursor pointer
    @media (min-width: 1366px)
      padding 0 20px
    &:hover
      .icon
        display inline-flex
    .icon
      display none
      font-weight bold
      color $primary
      width 20px
      height 20px
      font-size 20px
      border 1px solid $primary
      border-radius 50%
      line-height 20px
      opacity .7
    .name
      border-bottom 0
      margin-top 3px

.po-number
  margin-top 0
  padding-top 0
  /deep/ .input-label-group 
    margin 0
    input.is-expandable.po
      padding 10px 0 10px 20px
      height auto
      &:hover
        border-color #b5b5b5
      &:active
        border-color $primary

.invoice-panel__item
    .item
      width 100%
      display flex
      justify-content space-between

.customize
  margin-bottom 20px
  .name:first-child
    display flex
    justify-content space-between
    align-items center 
    cursor pointer
    &:hover
      .icon
        display inline-flex
    .icon
      display none
      font-weight bold
      color $primary
      width 20px
      height 20px
      font-size 20px
      border 1px solid $primary
      border-radius 50%
      line-height 20px
      margin-top -5px
  .invoice-panel__item
    .base-input
      width 100%
      /deep/ .input-label-group 
        .control-label
          left: 0
      &.mb20
        margin-bottom 20px
    .error
      color red
      width 100%
      margin 0
      margin-left 10px
      text-align left
    .btn.custom
      margin-left auto
      position relative
    &.additional
      position relative
      cursor pointer
      height 35px
      display flex
      justify-content space-between
      .invoice-panel__label
        width 70%
      .value
        width 30%
        text-align right
      .close-btn
        display none
        position relative
        height 20px
        width 20px
        background-image none
        box-shadow none
        color $primary
        padding 0
        margin-bottom 3px
        margin-left 5px
        @media screen and (max-width: 1136px)
          position absolute
          right 0
          top 8px
        &:before,
        &:after
          position: absolute;
          top 1px
          left 9px
          content ' '
          height 18px
          width 2px
          background-color red
        &:before
          transform rotate(45deg)
        &:after
          transform rotate(-45deg)
      &:hover
        .invoice-panel__label
          width calc(70% - 30px)
        .close-btn
          display block
  .total
    display flex
    justify-content space-between
    border-top 1px solid #eee
    margin-top 10px !important
    padding-top 10px
    font-size 20px
    span
      font-weight bold
</style>
