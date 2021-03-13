<template lang="pug">
div
  .sidebar-control.level-path.has-text-grey-light
    | {{ $t("candidates_sidebar.level_1") }}
  v-job-types-picker(
    v-if="jobTypes.children && jobTypes.children.length > 0"
    :hasGrades="hasGrades"
    :jobTypes="jobTypes"
  )
</template>

<script>
import { mapActions, mapState } from "vuex"
import VJobTypesPicker from "./VJobTypesPicker.vue"

export default {
  components: {
    VJobTypesPicker
  },
  props: {
    hasGrades: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState("jobTypes", ["jobTypes"]),
    ...mapState("onboarding/grades", ["grades"]),
    ...mapState("jobTypeSelector", ["selectedJobTypes"])
  },
  mounted() {
    this.getJobTypesWithChildren()
    this.getGrades()
  },
  methods: {
    ...mapActions("jobTypes", ["getJobTypesWithChildren"]),
    ...mapActions("onboarding/grades", ["getGrades"])
  }
}
</script>


