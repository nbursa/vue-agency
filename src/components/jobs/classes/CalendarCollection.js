import Vue from "vue"

/*
 * Common data shared between methods
 */
const defaults = {
  meta: {
    isAffected: false,
    isHighlighted: false
  },
  payload: {}
}

const _assign = o => {
  return Object.assign({}, defaults, o)
}
export default Vue.extend({
  data() {
    return {
      /*
      * Contains array of day objects
      * These objects contain luxon DateTime instances
      * along with meta: {} which holds some additional info
      */
      days: []
    }
  },

  methods: {
    /*
    *  Class can be
    *  "normal", "head" or "tail"
    *  normal: Current month's calendar days
    *  head: Previous months's calendar days
    *  tail: Next months's calendar days
    */
    init() {
      this.days = []
    },

    /*
     * This method adds regular cells, which means selectable in current month
     * No previous or next month's days included
     */
    add(item) {
      let cellData = _assign({
        meta: {
          className: "normal",
          /*
           * Check if day is today
           */
          isToday: item.hasSame(this.dt, "day"),
          /*
           * Check if day falls on the end of the week
           */
          isEndOfWeek: item.hasSame(item.endOf("week"), "day"),
          isSaturday: item.hasSame(
            item.endOf("week").minus({ days: 1 }),
            "day"
          ),
          /*
           * In past, when less than today and not today at the same time
           */
          isInPast: item < this.dt && !item.hasSame(this.dt, "day")
        }
      })
      this.days.push({
        item,
        ...cellData
      })
    },

    /*
     * This adds previous month's cells
     */
    head(item) {
      let cellData = _assign({
        meta: {
          className: "head",
          isEndOfWeek: item.hasSame(item.endOf("week"), "day")
        }
      })
      this.days.unshift({
        item,
        ...cellData
      })
    },

    /*
     * This adds next month's cells
     */
    tail(item) {
      let cellData = _assign({
        meta: {
          className: "tail",
          isEndOfWeek: item.hasSame(item.endOf("week"), "day")
        }
      })
      this.days.push({
        item,
        ...cellData
      })
    },

    /*
    * Repeater
    */
    repeat: function() {
      return function(times) {
        return Array.from(Array(times), () => 0)
      }
    }
  }
})
