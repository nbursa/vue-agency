/*
 * Import more filters here
 */
import { d } from "./string/dumpJson"
import { excerpt } from "./string/excerpt"
import { niceDate } from "./date/niceDate"
import { niceTime, niceHours } from "./time/niceTime"
import { statusFromNumber } from "./number/statusFromNumber"
import { rowFilter } from "./table/rowFilter"
/*
 * Register them here
 */
export const CustomFilters = {
  install: function(Vue) {
    Vue.filter("d", d)
    Vue.filter("nice-time", niceTime)
    Vue.filter("nice-date", niceDate)
    Vue.filter("excerpt", excerpt)
    Vue.filter("status-name", statusFromNumber)
    Vue.filter("nice-hours", niceHours)
    Vue.filter("row-filter", rowFilter)
  }
}
