<template lang="pug">
.sidebar-jobtypes.selected
  ul
    li(v-for="jobType in jobTypes") 
      .has-text-weight-semibold {{ jobType.name }}
      .has-text-weight-light(v-if="jobType.grade") {{jobType.grade.name}}
      .remove(@click="cancelJobType(jobType)")
        svgicon(name="temp/delete-normal" :width="'26'" :height="'20'" :fill="false")
</template>

<script>
export default {
  props: {
    jobTypes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    cancelJobType(jobType) {
      this.$emit("cancel:jobType", jobType)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>

