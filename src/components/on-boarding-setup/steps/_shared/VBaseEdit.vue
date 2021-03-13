<template lang="pug">
.control.is-expanded(v-if="isEditing")
  .grade-save-cancel
    input.input.grade-input(
      ref="gradeInput"
      :value="value"
      :class="[ inputSize, value === '' ? 'is-danger' : '' ]"
      type='text'
      v-on="inputListeners"
    )
    v-yes-no(
      :yes="{ label: $t('global.save'), handler: (e) => { onSaveClick(e) } }",
      :no="{ label: $t('global.cancel'), handler: (e) => { onBlur(e) } }"
    )

.control.is-expanded(v-else)
  .grade-box(@click="$emit('expand')")
    .grade-input
      span.grade-input__child-count(v-if="childCount && childCount !== 0") {{ childCount }}
      span {{ value }}
    .grade-tools
      button.button.is-outlined#grade-edit(
        @click="onTimeSheetSendClick"
        )
        svgicon.icon(name="job-schedule/change-view/time-sheet" )
      button.button.is-outlined#grade-edit(
        @click="onEditClick"
        )
        svgicon.icon(name="temp/edit-normal" )
      button.button.is-outlined#grade-remove(
        @click="onDeleteClick"
        )
        svgicon.icon(name="temp/delete-normal" :fill="false")
    .control.handle(
      v-if="showHandle"
    )
      a.button.is-static.is-handle(
        :class="inputSize"
        )
        svgicon.icon(name="temp/drag-normal" )

</template>
<script>
import VYesNo from '../OnBoardingSetupGrades/VYesNo.vue'

export default {
  components: { VYesNo },
  props: {
    sendTimeSheet: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [String, Number],
      required: true
    },
    childCount: {
      type: Number,
      requred: false,
      default: 0
    },
    inputSize: {
      type: String,
      default: ''
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    showHandle: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      originalValue: ''
    }
  },
  computed: {
    inputListeners: function () {
      let vm = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          vm.$emit('input', event.target.value)
        },
        blur: function (event) {
          if (event.relatedTarget) {
            let clsValues = Object.values(event.relatedTarget.classList)
            clsValues = clsValues.map((item) => item.toLowerCase())
            if (['save'].some((cls) => clsValues.includes(cls))) {
              vm.$emit('grade-input:after-save-or-cancel', clsValues)
              return false
            }
          }

          if (vm.value === '') {
            vm.$emit('local:fallbackEntry', vm)
          }
          vm.$emit('blur', event)
        },
        keypress: function (event) {
          // Save on Enter key
          if (event.keyCode === 13 && vm.value === '') {
            return
          }

          if (event.keyCode === 13) {
            vm.$emit('input:action-save', vm.$refs.gradeInput.value)
            return
          }
          // Make this new default valid entry
          vm.$emit('local:refreshEntry')
          vm.$emit('keypress', event)
        }
      })
    }
  },
  created() {
    this.$on('local:fallbackEntry', function (vm) {
      // On invalid state focus, revert back to last known valid state
      this.$refs['gradeInput'].value = this.originalValue
      // Emit newly set value, as you can not directly mutate the prop
      vm.$emit('input', event.target.value)
    })
    this.$on('local:refreshEntry', function () {
      // On success, save new valid state
      this.originalValue = this.$refs['gradeInput'].value
    })
    this.originalValue = this.value
  },
  methods: {
    onSaveClick(e) {
      e.stopPropagation()
      this.$emit('input:action-save', this.$refs.gradeInput.value)
    },
    onEditClick(e) {
      e.stopPropagation()
      this.$emit('input:action-edit', e)
      this.$nextTick(() => {
        if (this.$refs.gradeInput) {
          this.$refs.gradeInput.focus()
        }
      })
    },
    onDeleteClick(e) {
      e.stopPropagation()
      this.$emit('gradeInput:action-delete')
    },
    onTimeSheetSendClick(e) {
      e.stopPropagation()
      this.$emit('input:action-send-timesheet')
    },
    onBlur(e) {
      this.$emit('input:action-blur')
    }
  }
}
</script>

<style lang="stylus" scoped>
.control {
  cursor grab
  &:active {
    cursor grabbing
  }
  .handle .button {
    height 65px
  }
}

.grade-box {
  padding-left: 8px;
  border: 1px solid #DFE6EB;
  display: flex;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  align-items: center;
  background-color: white;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #F4F7F9;

    .grade-tools {
      opacity: 1;
    }
  }
}

.grade-input {
  color: #2F3439;
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  &__child-count {
    position: absolute;
    left: -18px;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    margin-right: 10px;
    border-radius: 50px;
    background-color: $primary;
    font-size: 0.75rem;
    color: white;
    width: 20px;
    height: 20px;
    font-weight:bold;
  }
}

.grade-tools {
  margin-right: 14px;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;

  button {
    margin-left: 10px;
    border: 0;
    box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    height: 32px;
    width: 32px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #856ff9;

      svg {
        color: #fff;
      }
    }

    svg {
      color: #856ff9;
      margin-top: -1px;
      transition: all 0.3s ease;
    }
  }
}

.grade-input {
  padding: 16px 12px;
  font-size: 1.1em;

  &.input {
    height: 60px;
    outline: none;
    padding-left: 1em;
    box-shadow: none;
    padding: 0 20px;
  }
}

.save-button {
  position: absolute;
  right: 0;
  top: 30px;
}
</style>
