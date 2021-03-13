<template lang="pug">
      transition(
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      )
        div.pull-right(ref="container")
          v-job-types-picker(
            v-if="jobTypes.children"
            :jobTypes="jobType"
          )
</template>

<style lang="stylus" scoped>
.pull-right {
  margin-left: 20px;
}

.closed {
  max-height: 0px;
  overflow: hidden;
}
</style>

<script>
export default {
  props: {
    jobType: {
      type: Object,
      required: true
    }
  }
}
</script>

