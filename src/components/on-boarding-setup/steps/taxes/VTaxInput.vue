<template lang="pug">
.control.is-expanded(v-if="isEditing")
  .tax-save-cancel
    input.input.name(
      ref="taxInputName"
      :value="name"
      :class="[ inputSize, name === '' ? 'is-danger' : '' ]"
      type='text'
      v-on="inputListeners"
      )
    div.percent-cont
      input.input.percent(
        ref="taxInputPercent"
        :value="percent"
        type="number"
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
  .tax-box
    .tax-input
      span.name(
        :alt="name"
        v-tooltip.bottom-start="name"
        ) {{ name | excerpt(4, {maxLength: 25}) }}
      span.percent(
        :alt="percent"
        v-tooltip.bottom-start="percent"
      ) {{ percent }} %
    .tax-tools
      button.button.is-outlined(
        @click="$emit('taxInput:action-edit')"
        )
        svgicon.icon(name="temp/edit-normal" )
      button.button.is-outlined(
        @click="$emit('taxInput:action-delete')"
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
    name: {
      type: String,
      required: true
    },
    percent: {
      type: Number,
      required: true,
      default: 0
    },
    isEditing: {
      type: Boolean,
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
        // blur: function(event) {
        //   if (event.relatedTarget) {
        //     let clsValues = Object.values(event.relatedTarget.classList)
        //     clsValues = clsValues.map(item => item.toLowerCase())
        //     if (
        //       ["save", "cancel", "remove"].some(cls =>
        //         clsValues.includes(cls.toLowerCase())
        //       )
        //     ) {
        //       return false
        //     }
        //   }

        //   if (vm.value === "") {
        //     vm.$emit("local:fallbackEntry", vm)
        //   }
        //   vm.$emit("blur", event)
        // },
        keypress: function(event) {
          // Save on Enter key
          if (event.keyCode === 13 && (vm.name === "" || vm.percent === "")) {
            vm.$emit("local:fallbackEntry", vm)
            return false
          }
          // Make this new default valid entry
          if(event.keyCode === 13 && vm.name !== "" && vm.percent !== "") {
            vm.$emit("local:refreshEntry")
            vm.$emit("keypress:enter", {name: vm.$refs["taxInputName"].value, percent: vm.$refs["taxInputPercent"].value})
          }
        }
      })
    }
  },
  created() {
    this.$on("local:fallbackEntry", function(vm) {
      // On invalid state focus, revert back to last known valid state
      this.$refs["taxInputName"].value = this.originalValue
      // Emit newly set value, as you can not directly mutate the prop
      vm.$emit("input", event.target.value.trim())
    })
    this.$on("local:refreshEntry", function() {
      // On success, save new valid state
      this.originalValue = this.$refs["taxInputName"].value
    })
    this.originalValue = this.name
  },
  methods: {
    handleSave(e) {
      e.stopPropagation()
      this.$emit("tax-input:after-save", {name: this.$refs["taxInputName"].value, percent: this.$refs["taxInputPercent"].value} )
    },
    handleRemove(e) {
      e.stopPropagation()
      this.$emit("tax-input:after-remove", {
        e: e
      })
    },
    handleCancel(e) {
      e.stopPropagation()
      this.$emit("tax-input:after-cancel", {
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

.tax-save-cancel {
  position: relative;
  input {
    z-index: 0 !important;
  }
  input.input.name {
    padding-right: 40%;
    outline: none;
  }
  .percent-cont {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20%;
    .percent {
      height: 40px;
      width: 90px;
      border-radius: 3px !important;
      text-align: right;
      padding-right: 25px;
    }
    &:after {
      content: "%"
      position: absolute;
      top: 8px;
      right: 5px;
    }
  }
}

.tax-box {
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

.tax-input {
  color: darken(#DFE6EB, 55%);
  flex: 1;
  display: flex;
  justify-content: space-between
  .name,
  .percent {
    font-weight: 400;
  }
  .percent {
    margin: 0px 10px;
  }
}

.tax-tools {
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
