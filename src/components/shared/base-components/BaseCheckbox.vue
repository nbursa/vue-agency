<template lang="pug">
  label(:class="{'active': value}")
    input(type="checkbox" :checked="value" @change="onChange")
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    onChange() {
      this.$emit("input", !this.value)
    }
  }
}
</script>

<style lang="stylus" scoped>


input {
  display: none;
}

.active {
  background-color: $checkboxBlue;
}

label {
  display: block;
  width: 12px;
  height: 12px;
  border: 1px solid $checkboxBlue;
  border-radius: 3px;
}
</style>
