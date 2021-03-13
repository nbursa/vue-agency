
<template lang="pug">
div
  header
    .sidebar-control
      v-new-candidate-link
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t("candidates_sidebar.default_title") }}
      p.has-text-left {{ $t("candidates_sidebar.default_text") }}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")

</template>

<script>
import { mapActions, mapState } from "vuex"
import VNewCandidateLink from "./VNewCandidateLink.vue"

export default {
  components: {
    VNewCandidateLink
  },
  mounted() {},
  methods: {
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
</style>

