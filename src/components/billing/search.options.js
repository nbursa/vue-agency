import {
  format,
  addDays,
  startOfWeek,
  endOfWeek
} from "date-fns"

import {
  VClientSelector
} from "@/components/shared/selectors"

const shiftsFilters =  {
  tabbedNav: [
    {
      id: 1,
      label: "billing.filters_tab_0",
      url: "/shifts",
      slug: {
        path: "/shifts"
      }
    },
    {
      id: 2,
      label: "billing.filters_tab_1",
      url: "/invoices",
      slug: {
        path: "/invoices"
      }
    }
  ],
  advancedSearch: [
    {
      id: 5,
      text: "billing.filters_advanced_client",
      icon: "filters/client-location",
      param: "client_id",
      config: {
        alwaysOpen: true
      },
      component: VClientSelector
    }
  ],
  // textSearch: {
  //   paramName: "client",
  //   placeholder: "global.search_client_name"
  // },
  datepicker: [
    {
      id: 1,
      label: "billing.date_today",
      getDate: function() {
        let startDate = new Date()
        let endDate = new Date()
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 2,
      label: "billing.date_tomorrow",
      getDate: function() {
        let startDate = addDays(new Date(), 1)
        let endDate = addDays(new Date(), 1)
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 3,
      label: "billing.date_this_week",
      getDate: function() {
        let startDate = new Date()
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    },
    {
      id: 4,
      label: "billing.date_next_week",
      getDate: function() {
        let startDate = addDays(new Date(), 7)
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    }
  ]
}

const invoiceFilters =  {
  tabbedNav: [
    {
      id: 1,
      label: "billing.filters_tab_0",
      url: "/shifts",
      slug: {
        path: "/shifts"
      }
    },
    {
      id: 2,
      label: "billing.filters_tab_1",
      url: "/invoices",
      slug: {
        path: "/invoices"
      }
    }
  ],
  advancedSearch: [
    {
      id: 5,
      text: "billing.filters_advanced_client",
      icon: "filters/client-location",
      param: "client_id",
      component: VClientSelector
    }
  ],
  // textSearch: {
  //   paramName: "client",
  //   placeholder: "global.search_client_name"
  // },
  datepicker: [
    {
      id: 1,
      label: "billing.date_today",
      getDate: function() {
        let startDate = new Date()
        let endDate = new Date()
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 2,
      label: "billing.date_tomorrow",
      getDate: function() {
        let startDate = addDays(new Date(), 1)
        let endDate = addDays(new Date(), 1)
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 3,
      label: "billing.date_this_week",
      getDate: function() {
        let startDate = new Date()
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    },
    {
      id: 4,
      label: "billing.date_next_week",
      getDate: function() {
        let startDate = addDays(new Date(), 7)
        return [
          startOfWeek(startDate, { weekStartsOn: 1 }),
          endOfWeek(startDate, { weekStartsOn: 1 })
        ]
      }
    }
  ]
}

export default {
  shiftsFilters,
  invoiceFilters
}
