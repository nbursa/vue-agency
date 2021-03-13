<template lang="pug">
.control.is-expanded(v-if="isEditing || !hasControls")
  .role-save-cancel
    input.input.role-input(
      ref="roleInput"
      :value="value"
      :class="[ value === '' ? 'is-danger' : '' ]"
      type='text'
      v-on="inputListeners"
    )
    v-yes-no(
      :yes="{ label: $t('global.save'), handler: (e) => { onSaveClick(e) } }",
      :no="{ label: $t('global.cancel'), handler: (e) => { onBlur(e) } }"
    )

.control.is-expanded(v-else)
  .role-box(@click="onRoleSelect" :class="{'selected': selected}")
    .role-input
      span {{ value }}
    .role-tools(v-show="isEditableRole")
      button.button.is-outlined#role-edit(
        @click="onEditClick"
      )
        svgicon.icon(
          name="temp/edit-normal" 
          width="20" 
          height="20"
        )
      button.button.is-outlined#role-delete(
        @click="onDeleteClick"
      )
        svgicon.icon(
          name="temp/delete-normal" 
          :fill="false" 
          color="#D0021B" 
          width="20" 
          height="20"
        )

</template>
<script>
import VYesNo from "../OnBoardingSetupGrades/VYesNo.vue"
import { fixedRoleIds } from "@/config/fixedRoleList"

export default {
  components: { VYesNo },
  props: {
    selected: {
      type: Boolean,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    hasControls: {
      type: Boolean,
      default: true
    },
    id: {
      type: Number,
      required: false
    },
    name: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  data() {
    return {
      originalValue: "",
      isEditing: false
    }
  },
  computed: {
    isEditableRole: function() {
      return !fixedRoleIds.includes(this.id)
    },
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
            if (["save"].some(cls => clsValues.includes(cls))) {
              vm.$emit("role-input:after-save-or-cancel", clsValues)
              return false
            }
          }

          if (vm.value === "") {
            vm.$emit("local:fallbackEntry", vm)
          }
          vm.$emit("blur", event)
          vm.isEditing = false
        },
        keypress: function(event) {
          // Save on Enter key
          if (event.keyCode === 13 && vm.value === "") {
            return
          }

          if (event.keyCode === 13) {
            vm.$emit("input:action-save", vm.$refs.roleInput.value)
            vm.isEditing = false
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
      this.$refs["roleInput"].value = this.originalValue
      // Emit newly set value, as you can not directly mutate the prop
      vm.$emit("input", event.target.value)
    })
    this.$on("local:refreshEntry", function() {
      // On success, save new valid state
      this.originalValue = this.$refs["roleInput"].value
    })
    this.originalValue = this.value
  },
  methods: {
    onRoleSelect(e) {
      e.stopPropagation()
      this.$emit("select", this.value)
    },
    onSaveClick(e) {
      e.stopPropagation()
      this.$emit("input:action-save", this.$refs.roleInput.value)
      this.isEditing = false
    },
    onEditClick(e) {
      e.stopPropagation()
      this.isEditing = true
      this.$emit("input:action-edit", e)
      this.$nextTick(() => {
        this.$refs.roleInput.focus()
      })
    },
    onDeleteClick(e) {
      e.stopPropagation()
      this.$emit("roleInput:action-delete")
    },
    onBlur(e) {
      this.$emit("input:action-blur")
    }
  }
}
</script>

<style lang="stylus" scoped>


.control {
  border-radius: 30px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
}

.role-box {
  position: relative;
  height: 32px;
  padding-left: 1.5em;
  display: flex;
  align-items: center;
  background-color: white;
  user-select: none;

  &:hover, &.selected {
    background-color: $highlightBlue;
    border-radius: 3px;

    .role-input {
      color: white;
    }

    .role-tools {
      opacity: 1;
    }
  }

  &.selected {
    &::before {
      content: '';
      width: 7px;
      height: 7px;
      left: 10px;
      background-color: white;
      position: absolute;
      border-radius: 50%;
    }
  }
}

.role-input {
  color: $fontDark;
  flex: 1;

  &:active {
    border-color: $darkGray;
    box-shadow: none;
  }
}

.role-tools {
  margin-right: 5px;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;

  button {
    margin: 0 0.2em;
    width: 1.5em;
    height: 1.5em;
    padding: 0;
    border: 0;
    transition: all 0.25e ease;

    &:hover {
      box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.6);
    }

    svg {
      color: #856ff9;
    }
  }
}

.role-input {
  font-size: 0.875rem;
  box-shadow: none;

  &.input {
    height: 32px;
    padding-left: 1.5em;
    padding-right: 136px;
  }
}

.save-button {
  position: absolute;
  right: 0;
  top: 30px;
}
</style>
