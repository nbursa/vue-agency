<template lang="pug">
.control.is-expanded(v-if="isEditing")
  .grade-save-cancel
    input.input(
      ref="gradeInput"
      :value="value"
      :class="[ inputSize, value === '' ? 'is-danger' : '' ]"
      type='text'
      v-on="inputListeners"
      )
    v-yes-no(
      v-if="action === 'save'"
      :yes="{ label: $t('global.save'), handler: (e) => { handleSave(e) } }",
      :no="{ label: $t('global.cancel'), handler: (e) => { handleCancel(e) } }"
      )
    v-yes-no(
      v-if="action === 'delete'"
      :yes="{ label: $t('global.remove'), handler: (e) => { handleRemove(e) } }",
      :no="{ label: $t('global.cancel'), handler: (e) => { handleCancel(e) } }"
      )
.control.is-expanded(v-else)
  .grade-box
    .grade-input
      span(
        :alt="value"
        v-tooltip.bottom-start="value"
        ) {{ value | excerpt(4, {maxLength: 25}) }}
    .grade-tools
      button.button.is-outlined(
        @click="$emit('gradeInput:action-edit')"
        )
        svgicon.icon(name="temp/edit-normal" )
      button.button.is-outlined(
        @click="$emit('gradeInput:action-delete')"
        )
        svgicon.icon(name="temp/delete-normal" :fill="false")
</template>
<script>
import { excerpt } from "@/utils/presentational"
import VYesNo from "./VYesNo"
import "@/compiled-icons/temp"
export default {
  components: { VYesNo },
  props: {
    action: {
      type: String,
      required: true,
      default: "save"
    },
    value: {
      type: String,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true,
      default: false
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
            clsValues = clsValues.map(item => item.toLowerCase())
            if (
              ["save", "cancel", "remove"].some(cls =>
                clsValues.includes(cls.toLowerCase())
              )
            ) {
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
            vm.$emit("local:fallbackEntry", vm)
            return false
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
      vm.$emit("input", event.target.value.trim())
    })
    this.$on("local:refreshEntry", function() {
      // On success, save new valid state
      this.originalValue = this.$refs["gradeInput"].value
    })
    this.originalValue = this.value
  },
  methods: {
    handleSave(e) {
      e.stopPropagation()
      this.$emit("grade-input:after-save", this.$refs["gradeInput"].value)
    },
    handleRemove(e) {
      e.stopPropagation()
      this.$emit("grade-input:after-remove", {
        e: e
      })
    },
    handleCancel(e) {
      e.stopPropagation()
      this.$emit("grade-input:after-cancel", {
        e: e
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.control {
  border-radius: 30px;
}

.grade-save-cancel {
  input {
    padding-right: 100px;
    outline: none;
  }
}

.grade-box {
  padding-left: 1em;
  border: 1px solid #DFE6EB;
  height: 100%;
  display: flex;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  align-items: center;
  transition: background-color 0.3s ease;

  button {
    opacity: 0;
  }

  &:hover {
    background-color: #F4F7F9;

    button {
      opacity: 1;
      transition: all 0.6s;
    }
  }
}

.grade-input {
  color: darken(#DFE6EB, 55%);
  flex: 1;
}

.grade-tools {
  margin-right: 12px;

  button {
    margin: 0 0.2em;
    border: 0;
    box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px !important;
    width: 32px;
    height: 32px;
    margin: 0 5px;

    svg {
      color: darken(#856ff9, 10%);
    }

    svg[data-icon='trash-alt'] {
      color: darken(#856ff9, 10%);
    }
  }
}
</style>
