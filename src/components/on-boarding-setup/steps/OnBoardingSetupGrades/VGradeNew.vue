<template lang="pug">
div.grade
  .field.has-addons
    .control
      a.button.is-static(
        :class="inputSize"
        :disabled="isEditing"
        )
        | {{ grade.id }}
    v-grade-input(
      ref="grade"
      :value="grade.name"
      @input="$emit('grade-input:input', $event, grade.id)"
      :input-size="inputSize"
      :isEditing="isEditing"
      @gradeInput:action-edit="enterEditMode('save')"
      @blur="isEditing = false"
      @grade-input:after-save="afterSave($event, grade.id)"
      @grade-input:after-cancel="afterCancel($event, grade.id)"
      @keypress.enter="isEditing = false; $emit('grade-input:enter', $event, grade.id)"
      :action="action"
      )
</template>
<script>
import VGradeInput from "./VGradeInput"
export default {
  components: { VGradeInput },
  props: {
    grade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      action: "save",
      inputSize: "is-large",
      isEditing: false
    }
  },
  methods: {
    afterSave(newValue, id) {
      this.$emit("grade-input:enter", newValue, id)
      this.isEditing = false
    },
    afterCancel({ e }, id) {
      $logger.blue(`canceling record ${id}`)
      this.isEditing = false
    },
    enterEditMode(action, id) {
      /* Enter editing mode */
      this.isEditing = true
      /* Pass action prop, to denote if we are saving or deleting */
      this.action = action

      this.$nextTick(() => {
        this.$children[0].$refs["gradeInput"].focus()
      })
    }
  }
}
</script>
