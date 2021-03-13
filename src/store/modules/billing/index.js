// import * as actions from "./actions"
// import * as mutations from "./mutations"
// import * as getters from "./getters"
// import SidebarModule from "@/store/modules/sidebar/"
// import TableModule from "@/store/modules/table/"
// import JobsModule from "@/store/modules/job-management"
// import SearchModule from "@/store/modules/search"

// import shifts from "./shifts"
// import invoices from "./invoices"

// const state = {
//   shifts: [],
//   invoices: [],
//   selectedInvoice: {},
//   editedInvoice: {},
//   selectedClient: { id: "placeholder", name: "Select client" },
//   status: false,
//   activeState: "jobManagement",
//   meta: {},
//   errors: []
// }

// export default {
//   namespaced: true,
//   state,
//   actions,
//   mutations,
//   getters,
//   modules: {
//     invoices: invoices,
//     shifts: shifts,
//     sidebar: SidebarModule,
//     table: TableModule,
//     jobs: JobsModule,
//     search: SearchModule
//   }
// }

import shifts from "./shifts"
import invoices from "./invoices"

export {
  shifts,
  invoices
}