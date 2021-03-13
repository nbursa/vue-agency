import Vue from "vue"

const defaults = {}

const _assign = o => {
  return Object.assign({}, defaults, o)
}

export default Vue.extend({
  data() {
    return {
      days: []
    }
  },
  methods: {
    collectionInit() {
      this.days = []
    },
        /*
     * This method adds regular cells, which means selectable in current month
     * No previous or next month's days included
     */
    add(item) {
      let cellData = _assign({
        meta: {

        }
      })
      this.days.push({
        ...item,
        ...cellData
      })
    },
    /*
    * This method orders and assignes jobs to their respective day object
    */
    order(arr, days) {
      let orderedTimetable = days.map(item => {
        return {
          ...item,
          payload: arr.filter(job => {
            //TODO GENERALIZE ORDERING
            let timeProperty = job._startPropName || "startTime"
            // console.log("job", job.cellData[timeProperty].indexOf(item.sqlDate), timeProperty)
            // console.log("IN ARR", job.cellData[timeProperty].indexOf(item.sqlDate))
            return job.cellData[timeProperty].indexOf(item.sqlDate) !== -1
          })[0]
        }
      });

      return orderedTimetable
    }


  }

})