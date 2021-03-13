<template lang="pug">
.control.is-expanded
  .grade-save-cancel
    input.input.grade-input(
      ref="gradeInput"
      :value.number="value"
      :class="[ inputSize, value === '' ? 'is-danger' : '' ]"
      type='number'
      v-on="inputListeners"
    )



</template>
<script>

export default {
  props: {
    value: {
      required: true
    },
    inputSize: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      originalValue: ""
    }
  },
  computed: {
    inputListeners: function() {
      let vm = this
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event.target.value)
        },
        blur: function(event) {
          if (event.relatedTarget) {
            let clsValues = Object.values(event.relatedTarget.classList)
            if (["save"].some(cls => clsValues.includes(cls))) {
              vm.$emit("grade-input:after-save-or-cancel", clsValues)
              return false
            }
          }

          if (vm.value === "") {
            vm.$emit("local:fallbackEntry", vm)
          }
          vm.$emit("blur", event)
        },
        keypress: function(event) {
          // Save on Enter key
          if (event.keyCode === 13 && vm.value === "") {
            return
          }

          if (event.keyCode === 13) {
            vm.$emit("input:action-save", vm.$refs.gradeInput.value)
            vm.$refs["gradeInput"].blur()
            return
          }
          // Make this new default valid entry
          vm.$emit("local:refreshEntry")
          vm.$emit("keypress", event)
        }
      })
    }
  },
  created() {
    this.$on("local:fallbackEntry", function(vm) {
      // On invalid state focus, revert back to last known valid state
      this.$refs["gradeInput"].value = this.originalValue
      // Emit newly set value, as you can not directly mutate the prop
      vm.$emit("input", event.target.value)
    })
    this.$on("local:refreshEntry", function() {
      // On success, save new valid state
      this.originalValue = this.$refs["gradeInput"].value
    })
    this.originalValue = this.value
  },
  methods: {
    onSaveClick(e) {
      e.stopPropagation()
      this.$emit("input:action-save", this.$refs.gradeInput.value)
    },
    onEditClick(e) {
      e.stopPropagation()
      this.$emit("input:action-edit", e)
      this.$nextTick(() => {
        if (this.$refs.gradeInput) {
          this.$refs.gradeInput.focus()
        }
      })
    },
    onDeleteClick(e) {
      e.stopPropagation()
      this.$emit("gradeInput:action-delete")
    },
    onBlur(e) {
      this.$emit("input:action-blur")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';

.control {
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }
}



.grade-box {
  display: flex;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  align-items: center;
  background-color: white;
  user-select: none;

  &:hover {
    // background-color: #F4F7F9;
  }
}

.grade-input {
  color: darken(#DFE6EB, 55%);
  border-radius: 4px;
  height: 1.5rem;
  padding: 0px 5px 0px 20px;
  font-size: inherit;
  text-align: right;

  @media (max-width: $display-small-desktop) {
    font-size: 12px !important;
  }

  &:focus {
  }
}
</style>
