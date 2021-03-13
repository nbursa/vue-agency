<template lang="pug">
div
  header
    .sidebar-control
      router-link(:to="{path: '/submit-job'}")
        base-button(v-tooltip.bottom-start="$t('tooltips.job_submit.add_job')") {{$t("jobs_sidebar.submit")}}

  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t('pagenames.clientschedule') }}
      p.has-text-left {{ $t('jobs_sidebar.client_schedule_txt') }}  
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

