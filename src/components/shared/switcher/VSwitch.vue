<template lang="pug">
  label.switch
    input(type="checkbox" :checked="value" @input="onInput")
    span.slider.round
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      reuqired: false,
      default: false
    }
  },
  methods: {
    onInput(e) {
      this.$emit("input", !this.value)
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/switch';
</style>


