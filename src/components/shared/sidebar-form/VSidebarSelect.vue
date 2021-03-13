

<template lang="pug">
.sidebar-form_field(:class="[!activeLabel ? 'is-disable' : '']")
  label.sidebar-form_label(:class="[activeLabel ? 'is-active' : '']") {{ label || name }}:
  .select(v-if="value.length > 0 && activeLabel")
    select(v-model="active" @input="updateVal")
      option(v-for="item in value" :key="item.id" :value="item.id" :selected="item.id == selected") {{ item.label || item.name }}
  input.sidebar-form_input.is-disable.is-fullwidth(
    v-else
    :value="value"
    disabled="disabled"
  )
  .help.is-danger(v-if="error") {{error}}
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    value: {
      type: [String, Array],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false,
      default: ""
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selectValues: [],
      active: 0
    }
  },
  computed: {
    activeLabel() {
      return typeof value === 'string'
    }
  },
  mounted() {
    this.active = this.selected
  },
  methods: {
    updateVal(e) {
      this.$emit("input", e.target.value)
    },
    isSelected(item) {
      return item.id == this.selected ? true : false
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
</style>
