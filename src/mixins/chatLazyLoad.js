import { mapActions } from "vuex"
import chatScrollBehaviour from "@/mixins/chatScrollBehaviour"
export default {
  mixins: [chatScrollBehaviour],
  methods: {
    ...mapActions("messages", ["incrementCurrentPage"]),
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
    },
    lazyLoadMoreMessages() {
      if (this.refEl.scrollTop === 0) {
        this.incrementCurrentPage({ conversationId: this.id })
          .then(currentPage => {
            this.$emit(
              "lazy-load",
              {
                done: this.scrollMessagesToPoint,
                conversationId: this.id,
                currentPage: currentPage
              },
              200
            )
          })
          .catch(_ => {
            if (!_) return
            console.log(`Exception: ${_}`)
          })
      }
    }
  }
}
