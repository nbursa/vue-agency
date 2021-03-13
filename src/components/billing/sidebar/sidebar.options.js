import VPreviewInvoice from "./VPreviewInvoice"
import VDefaultAction from "./VDefaultAction"
import VEditInvoice from "./VEditInvoice"

const optionsShifts = [
  {
      label: "edit",
      component: VPreviewInvoice
  },
  {
      label: "default",
      component: VDefaultAction
  }
]

const optionsInvoices = [
  {
      label: "edit",
      component: VEditInvoice
  },
  {
      label: "default",
      component: VDefaultAction
  }
]

export {
  optionsShifts,
  optionsInvoices
}