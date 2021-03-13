import CShifts from "./shifts/CShifts"
import CInvoices from "./invoices/CInvoices"


export default [{
  path: "/shifts",
  name: "billing-finance-shifts",
  component: CShifts,
  meta: {
    caption: "billingshifts",
    resource: "Job"
  }
},
{
  path: "/invoices",
  name: "billing-&-finance-invoices",
  component: CInvoices,
  meta: {
    caption: "billinginvoices",
    resource: "Invoice"
  }
}]