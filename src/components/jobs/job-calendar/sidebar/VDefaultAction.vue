<template lang="pug">
div
  header
    .sidebar-control
      router-link(:to="{name: 'submit-job'}")
        base-button {{ $t("jobs_sidebar.submit") }}

  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t("job_cal.default_title") }}
      p.has-text-left {{ $t("job_cal.default_text") }}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
