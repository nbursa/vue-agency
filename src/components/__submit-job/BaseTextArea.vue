<template lang="pug">
  div.columns
    .column.is-3.label-wrapper
      slot(name="label")
      span.required(v-if="required") *
    .column.is-9
      textarea(:placeholder="placeholder" @input="update" :value="value")
</template>
<script>
export default {
  props: {
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: function () {
        return this.$t('jobs_submit.base_text_area_placeholder_default')
      }
    },
    optionName: {
      type: String,
      required: false,
      default: null
    },
    value: {
      type: [String, Number],
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
    }
  }
}
</script>
<style lang="stylus" scoped>
textarea {
  min-height: 100px;
  border: none;
  border-radius: 8px;
  width: 100%
  background: #f2f2f2
  padding: 8px 11px;
  resize: true
}
</style>
