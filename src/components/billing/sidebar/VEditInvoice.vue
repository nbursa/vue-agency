<template lang="pug">
div
  header
    .sidebar-control
  section.sidebar-overflow
    .sidebar-content
      div.invoice-panel
        div.name {{selectedInvoice.client.name}}
        div.invoice-panel__item
          span.invoice-panel__label {{$t("billing_sidebar.jobscount")}}
          span.value.value--small {{selectedInvoice.jobsCount}}
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.total_net")}}
          span.value--small {{selectedInvoice.totalNetAmount}}
        div.invoice-panel__item.has-border(v-if="JSON.parse(selectedInvoice.additionals) && JSON.parse(selectedInvoice.additionals).length")
        div.invoice-panel__label(v-if="selectedInvoice.additionalTotalAmount > 0") {{$t("billing_sidebar.title")}}
        div.invoice-panel__item(v-for="(item, index) in JSON.parse(selectedInvoice.additionals)" :key="index")
          span.invoice-panel__label(v-if="item.name") {{ item.name }}
          span.value.value--small(v-if="item.value") {{$currency.sign}} {{ parseInt(item.value).toFixed(2) }} 
        div.invoice-panel__item(v-if="selectedInvoice.additionalTotalAmount > 0")
          span.invoice-panel__label {{$t("billing_sidebar.additionals_total")}}
          span.value.value--small {{$currency.sign}} {{ selectedInvoice.additionalTotalAmount }} 
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.subtotal")}}
          span.value.value--small {{$currency.sign}} {{ selectedInvoice.subtotal }} 
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.total_tax")}}
          span.value.value--small {{selectedInvoice.totalTax}} %
        div.invoice-panel__item
          span.invoice-panel__label {{$t("billing_sidebar.total_tax_amount")}}
          span.value.value--small {{$currency.sign}} {{selectedInvoice.totalTaxAmount}} 
        div.invoice-panel__item.has-border
          span.invoice-panel__label {{$t("billing_sidebar.total")}}
          span.value.value {{$currency.sign}} {{selectedInvoice.grandTotal}} 
        div.invoice-panel__job-list(v-if="selectedInvoice.jobTypes")
          div.job-list-label {{$t("billing_sidebar.job_type_label")}}
          span {{selectedInvoice.jobTypes.join(", ")}}
        div.invoice-panel__item.po-number.has-border
          span.invoice-panel__label PO#
          span.value.value--small {{ selectedInvoice.poNumber }}
        div.invoice-panel__item.last-item.note
          div.invoice-panel__label {{$t("billing_sidebar.note_label")}}
          div.value {{selectedInvoice.note}}
        create-invoice(namespace="invoices" :pdfLink="selectedInvoice.fileUrl")


</template>

<script>
import CreateInvoice from './VCreateInvoiceLink'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CreateInvoice
  },
  computed: {
    ...mapState('invoices', ['selectedClient']),
    ...mapState('invoices/table', ['selected']),
    selectedInvoice: function () {
      return this.selected[0] || []
    }
  },
  watch: {
    selectedClient: function (oldVal, newVal) {
      if (oldVal.id !== newVal.id) {
        this.setSidebarComponent('default')
        this.clearInvoice()
      }
    }
  },
  methods: {
    ...mapActions('invoices', ['clearInvoice', 'createInvoice']),
    ...mapActions('invoices/sidebar', ['setSidebarComponent']),
    ...mapActions('invoices/table', ['clearCheckedItems']),
    cancel() {
      this.clearInvoice()
      this.clearCheckedItems()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/partials/action-buttons';
@import '~@/assets/styles/global/partials/invoice-sidebar';

.sidebar-control {
  height: 48px;
}
.po-number .value,
.note .value {
  width: 100%;
  max-width: 100%;
  word-break: break-all;
  text-align: left;
  font-size: 16px;
}
</style>
