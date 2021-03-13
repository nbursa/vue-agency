<template lang="pug">
div.base-input
  div.input-label-group
    input.is-expandable(:class="{'base-input--has-error': error.length, 'base-input--disabled': disabled}" @input="update" :value="value" required :type="inputType" @focus="focus" :placeholder="placeholder")
    label.control-label(for="input") {{ label }}
  span.base-input__error(v-if="error")  {{ error }}
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    optionName: {
      type: String,
      required: false,
      default: null
    },
    inputType: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    update(e) {
      this.$emit(
        'input',
        this.optionName ? { [this.optionName]: e.target.value } : e.target.value
      )
    },
    focus(e) {
      this.$emit('focus', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
$font-size = 18px;
$active-font-size = 13px;
$active-top = 0.4rem;
$label-color = #838D98;
$active-color = $focus-color = $label-color;

@import '~@/assets/styles/global/label-input';
@import '~@/assets/styles/global/expandable-input';

.base-input {
  .input-label-group {
    margin-bottom: 5px;
  }

  &--has-error {
    border: 1px solid $error-color !important;
  }

  &__error {
    color: $error-color;
  }

  &--disabled {
    pointer-events: none;
    background-color: #F8F8F8 !important;
  }
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
