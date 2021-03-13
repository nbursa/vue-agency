<template lang="pug">
div
  v-message-thread(
    :recipient="recipient"
    :conversation="getThreadById(recipient.id).items"
    :total-pages="totalPages"
    @lazy-load="lazyLoad(...arguments, $event)"
    @go-back="goBack"
    ref="thread"
  )
</template>
<script>
import VMessageThread from "./VMessageThread"
import { mapGetters, mapState, mapActions } from "vuex"
export default {
  components: { VMessageThread },
  data() {
    return {}
  },
  computed: {
    ...mapGetters("messages", ["getThreadById"]),
    // TODO remove currentPage when currentPagePerThread gets implemented
    ...mapState("messages", ["recipient", "totalPages", "currentPage"]),
    meta: function() {
      return this.getThreadById(this.recipient.id).meta
    }
  },
  mounted() {
    this.clearThread({ id: this.recipient.id }).then(() => {
      this.setCurrentPage({
        pageNum: 1,
        conversationId: this.recipient.id
      })
      this.fetchMessages().then(() => {
        this.$refs.thread.scrollMessagesToEnd()
      })
    })
  },
  methods: {
    ...mapActions("messages", [
      "getConversation",
      "clearThread",
      "setCurrentPage"
    ]),
    goBack() {
      this.$emit("sidebar:navigate", "edit")
    },
    fetchMessages(page = 1) {
      // Fetch first page by default
      return this.getConversation({ id: this.recipient.id, page })
    },
    async lazyLoad({ done, currentPage }, args) {
      await this.fetchMessages(currentPage)
      done(args)
    }
  }
}
</script>
