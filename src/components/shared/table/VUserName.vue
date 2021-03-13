
<template lang="pug">
div
    span
      | {{ options.firstName}}  {{options.lastName }}
      svgicon(v-if="options.userStatus === 1" style="margin-left: 10px" name="global/candidate-approved" :fill="true" ref="svgicon" :original="true")
      span.candidate-table-name__resend-invitation(v-if="options.userStatus !== 1"  @click.stop="resendInvite" v-tooltip.top-start="$t('candidates_sidebar.tooltip_reinvite')")
        svgicon(:class="{'load-spin': isLoading}" style="margin-left: 10px;" name="multifile-uploader/reupload" :fill="true" ref="svgicon" :original="true")
</template>

<script>
import "@/compiled-icons/position"
import { mapActions } from "vuex"
import { errorDefaults, successDefaults } from "@/config/notifications"

export default {
  functional: false,
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions("auth", ["requestNewPassword"]),
    resendInvite: async function() {
      if(this.isLoading) return false
      try {
        this.isLoading = true
        const success = await this.requestNewPassword({email: this.options.email})
        const msg = this.$merge(successDefaults, {
          group: "foo",
          text: this.$t("candidates_sidebar.reinvite_success")
          // text: success.message
        })
        this.$notify(msg)
      } catch (errData) {
        this.handleError(errData)
      } finally {
        this.isLoading = false
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.candidate-table-name
  position relative

.load-spin {
    animation:spin 2s linear infinite;
}

@keyframes spin { 100% { transform:rotate(360deg); } }


</style>