import { DateTime } from "luxon"

export default {
  data() {
    return {
      luxonInstance: null
    }
  },
  computed: {
    humanDate: function() {
      return this.luxonInstance && this.luxonInstance.toFormat("dd/LL/yyyy")
    },
    humanTime: function() {
      return this.luxonInstance && this.luxonInstance.toFormat("HH:mm")
    }
  },
  methods: {
    parseIntoLuxon(serverDateFormat) {
      this.luxonInstance = DateTime.fromSQL(serverDateFormat)
      return this.luxonInstance
    }
  }
}
