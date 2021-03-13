import { app } from "../main.js"

export const titleUpdate = {
  created() {
    this.setTitle()
  },
  watch:{
    "$route": {
      handler: "setTitle",
      deep: true
    }
  },
  computed: {
    caption: function() {
      return this.$route.meta.caption
        ? `pagenames.${[this.$route.meta.caption]}`
        : ""
    },
  },
  methods: {
    setTitle(route, newRoute) {
      document.title =  this.caption ? app.$t(this.caption) : "Realday Portal"
    },
  }
}