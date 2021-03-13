import { mapActions } from "vuex"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { readServerMessages } from "@/mixins/validationMixin"
import chatScrollBehaviour from "@/mixins/chatScrollBehaviour"
export default {
  mixins: [readServerMessages, chatScrollBehaviour],
  methods: {
    ...mapActions("messages", ["sendMessage"]),

    async send(e) {
      if(!this.message) return
      if (e.shiftKey) return
      // e.preventDefault()
      try {
        const sent = await this.sendMessage({
          id: this.id,
          body: this.message
        })
        this.message = ""
        this.scrollMessagesToEnd()
      } catch (_) {
        console.log(_)
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: this.serverErrors.join("")
        })
        this.$notify(e)
      }
    }
  }
}
