import VCandidateCell from "@/components/jobs/job-scheduleList/VCandidateCell"

export const invoices = [{
    show: "id",
    label: "billing.invoices_column_0",
    width: 0.25
  },
  // {
  //   show: "fromDate",
  //   label: "billing.invoices_column_1",
  //   type: "date"
  // },
  // {
  //   show: "toDate",
  //   label: "billing.invoices_column_2",
  //   type: "date"
  // },
  {
    show: "client",
    label: "billing.invoices_column_3"
  },
  {
    show: "invoiceNumber",
    label: "billing.invoices_column_4"
  },

  {
    show: "jobsCount",
    label: "billing.invoices_column_5"
  }
]

export const shifts = [{
    show: "id",
    label: "billing.shifts_column_0",
    width: 0.25
  },

  {
    show: "shiftDate",
    label: "billing.shifts_column_1"
  },
  {
    show: "shiftTime",
    label: "billing.shifts_column_2"
  },
  {
    show: "client.name",
    label: "billing.shifts_column_3"
  },
  {
    component: VCandidateCell,
    label: "billing.shifts_column_4"
  }
]

export default {
  invoices,
  shifts
}