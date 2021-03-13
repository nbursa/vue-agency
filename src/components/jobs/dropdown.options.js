import { format, compareAsc, addDays, subDays } from "date-fns"

export default {
  datepicker: [
    {
      id: 1,
      label: "jobs.date_today",
      getDate: function() {
        let startDate = new Date()
        let endDate = new Date()
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 2,
      label: "jobs.date_tomorrow",
      getDate: function() {
        let startDate = addDays(new Date(), 1)
        let endDate = addDays(new Date(), 1)
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 3,
      label: "jobs.date_this_week",
      getDate: function() {
        let startDate = subDays(new Date(), 7)
        let endDate = new Date()
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 4,
      label: "jobs.date_next_week",
      getDate: function() {
        let startDate = new Date()
        let endDate = addDays(new Date(), 7)
        return [format(startDate, "MM-DD-YYYY"), format(endDate, "MM-DD-YYYY")]
      }
    },
    {
      id: 5,
      label: "Reset",
      getDate: function() {
        return ["", ""]
      }
    }
  ]
}
