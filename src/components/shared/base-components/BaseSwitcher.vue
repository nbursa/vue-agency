<template lang="pug">
  .sidebar-form_field.is-flex
    label.is-size-6 {{label}}
    .is-pulled-right
      label.switch
        input(
          type="checkbox"
          :checked="shouldBeChecked"
          :value="value"
          :disabled="disabled"
          @change="updateInput"
          )
        span.slider.round
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    trueValue: {
      type: [Boolean, String],
      default: true
    },
    falseValue: {
      type: [Boolean, String],
      default: false
    },
    value: {
      type: [Boolean, String],
      required: true,
      default: false
    },
    modelValue: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked
      this.$emit("change", isChecked ? this.trueValue : this.falseValue)
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/switch';

.sidebar-form_field {
  .is-flex {
    display: flex;

    label {
      flex: 1;
    }
  }
}
</style>
