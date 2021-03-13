import easyScroll from "easy-scroll"
export default {
  methods: {
    easyScroll,
    scrollMessagesToEnd() {
      this.scrollMessagesToPoint()
    },
    scrollMessagesToPoint(amount = null) {
      const withAmount = {}
      if (amount) {
        withAmount.scrollAmount = amount
      }
      this.easyScroll({
        scrollableDomEle: this.refEl,
        direction: "bottom",
        duration: 250,
        easingPreset: "easeInQuad",
        ...withAmount
      })
    }
  }
}
