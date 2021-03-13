import { mapGetters } from "vuex"
/*
 * Adds ability to a compnent to read server messages
 */
export const readServerMessages = {
  computed: {
    ...mapGetters(["getValidationMessages"]),

    serverMessage: function() {
      const { message } = this.getValidationMessages
      return message || ""
    },
    serverErrors: function() {
      const { errors } = this.getValidationMessages
      return errors || []
    }
  }
}
