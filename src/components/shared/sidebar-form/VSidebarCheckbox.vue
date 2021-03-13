<template lang="pug">
  .sidebar-form_field.is-flex
    label.sidebar-form_label(:for="label")
      | {{label}}
    input.sidebar-form_input(:id="label" type="checkbox" @input="toggleCheck" v-model="internalValue")
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    internalValue: {
      set() {},
      get() {
        return this.value
      }
    }
  },
  methods: {
    toggleCheck() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

.sidebar-form_field.is-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;

  label.sidebar-form_label {
    min-width: calc(100% - 20px) !important;
    flex: 2;
    height: 40px;
    padding: 0 20px 0 0;
    display: flex;
    align-items: center;
  }

  input.sidebar-form_input {
    float: none;
  }

  &:hover {
    label.sidebar-form_label {
      color: #4a4a4a;
    }
  }
}
</style>
