<template lang="pug">
  .sidebar-form_field
    label.is-size-5 {{label}}
    .is-pulled-right
      label.switch
        input(type="checkbox" @input="toggleSwitch")
        span.slider.round
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    toggleSwitch() {
      this.$emit('input', !this.value)
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/switch';
</style>


