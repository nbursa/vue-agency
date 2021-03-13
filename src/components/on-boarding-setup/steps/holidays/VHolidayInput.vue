<template lang="pug">
.control.is-expanded(v-if="isEditing")
  .grade-save-cancel
    input.input.grade-input(
      ref="gradeInput"
      v-model="inputValue"
      :class="[ inputSize ]"
      type='text'
      :placeholder="placeholder"
    )
    v-yes-no(
      v-show="!hideControls"
      :yes="{ label: $t('global.save'), handler: (e) => { onSaveClick(e) } }",
      :no="{ label: $t('global.cancel'), handler: (e) => { onCancel(e) } }"
      style="right: 120px"
    )
    flatpickr.control-input-date-picker(
      :options="config",
      v-model="pickerDate",
      :placeholder="$t('global.date')"
      :showInternalInput="false"
      customClass="fat-input"
    )


.control.is-expanded(v-else)
  .grade-box(@click="$emit('expand')")
    .grade-input
      span {{ value || this.placeholder }}
    .grade-tools
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
    div.control-show-date {{pickerDate}}

</template>
<script>
import VYesNo from "../OnBoardingSetupGrades/VYesNo.vue"
import flatpickr from "@/components/shared/flat-pickr"
import DateTimeUtils from "@/utils/dateUtils.js"
import "flatpickr/dist/flatpickr.css"

export default {
  components: { VYesNo, flatpickr },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    inputSize: {
      type: String,
      default: ""
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    showHandle: {
      type: Boolean,
      required: false
    },
    hideControls: {
      type: Boolean,
      required: false,
      default: false
    },
    date: {
      type: String,
      requred: true
    }
  },
  data() {
    return {
      valueInternal: "",
      dateInternal: null,
      config: {
        mode: "single",
        dateFormat: this.$localization.flatpickrFormat,
        enableTime: false
      }
    }
  },
  computed: {
    pickerDate: {
      get() {
        if(!this.date && !this.dateInternal ) return null
        return !this.dateInternal ? DateTimeUtils.getDateFromSQL(this.date) : this.dateInternal
      },
      set(newDate) {
        this.dateInternal = newDate
      }
    },
    inputValue: {
      get() {
        return this.valueInternal ? this.valueInternal : this.value
      },
      set(val) {
        this.valueInternal = val
      }
    }
  },
  created() {

  },
  methods: {
    onSaveClick(e) {
      e.stopPropagation()
      this.$emit("input:action-save", {name: this.$refs.gradeInput.value, date: DateTimeUtils.getDateTimeFromClient(this.dateInternal) || this.date})
      this.dateInternal = null
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
    onCancel(e) {
      this.valueInternal = ""
      this.dateInternal = null
      this.$emit("input:action-cancel")
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
  .control-input-date-picker {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .control-show-date {
    width: 100px;
    height: 40px;
    border: 1px solid #DAE1E6;
    border-radius: 3px;
    margin-right: 10px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
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
