<template lang="pug">
div.holiday
  v-holiday-input.holiday__holiday-edit(
    :value="holiday.name"
    :date="holiday.date"
    :isEditing="isEditing"
    @input:action-save="onSaveClick"
    @input:action-edit="onEditClick"
    @input:action-cancel="isEditing = false"
    @gradeInput:action-delete="onDestroyClick"
  )
</template>

<script>
import { mapActions, mapState } from "vuex"
import VHolidayInput from "./VHolidayInput.vue"



export default {
  components: {
    VHolidayInput
  },
  props: {
    holiday: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isOpen: false,
    }
  },
  methods: {
    onDestroyClick() {
      this.$emit("action:delete-holiday", this.holiday.id)
    },
    onBlur() {
      this.isEditing = false
    },
    onEditClick() {
      this.isEditing = true
    },
    onSaveClick(value) {
      this.$emit("action:update-holiday", {
        id: this.holiday.id,
        name: value.name,
        date: value.date
      })
      this.isEditing = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.holiday {
  margin: 1em 0;
  position: relative;
}
</style>
