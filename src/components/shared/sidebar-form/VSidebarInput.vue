<template lang="pug">
.sidebar-form_field(:class="[disabled ? 'is-disable' : '']")
  label.sidebar-form_label(:class="[activeLabel ? 'is-active' : '']") {{ label }}
  input.sidebar-form_input.is-fullwidth(
    v-if="tagType === 'input'"
    :placeholder="placeholder"
    :value="altInputFormater ? formatedValue : value"
    :type="type"
    @input = "updateVal"
    @focus="activeLabel = true"
    @blur="activeLabel = false"
    :disabled="disabled"
  )
  textarea.sidebar-form_input.is-fullwidth(
    v-if="tagType === 'textarea'"
    :value="altInputFormater ? formatedValue : value"
    :type="type"
    @input = "updateVal"
    @focus="activeLabel = true"
    @blur="activeLabel = false"
    :disabled="disabled"
  )
  .help.is-danger.full-text-visibility(v-if="error") {{error}}
</template>

<script>
import { mapActions, mapState } from "vuex"
import DateTimeUtils from "@/utils/dateUtils.js"
import InputTypeValidation from '@/utils/inputTypeValidation'

export default {
  props: {
    value: {
      type: null, // match any value type
      required: true,
      default: ""
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    tagType: {
      type: String,
      required: false,
      default: "input"
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    altInputFormater: {
      type: String,
      required: false,
      default() {
        return null
      } 
    },
    inputType: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      activeLabel: false
    }
  },
  computed: {
    formatedValue: function() {
      return DateTimeUtils[this.altInputFormater](this.value)
    }
  },
  methods: {
    updateVal(e) {
      if (this.inputType) {
        InputTypeValidation.validate(e, this.inputType)
      }
      this.$emit("input", e.target.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

input {
  &::placeholder {
    opacity: 0.6
  }
}
  .full-text-visibility {
    height : auto !important;
    width : 100% !important;
  }
</style>
