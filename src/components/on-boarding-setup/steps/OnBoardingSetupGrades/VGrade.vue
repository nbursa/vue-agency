<template lang="pug">
div.grade
  .field.has-addons
    .control
      a.button.is-static.grade-level(
        :class="inputSize"
        :disabled="isEditing"
        )
        | {{ grade.level }}
    v-grade-input(
      ref="grade"
      :value="grade.name"
      @input="$emit('grade-input:input', $event, grade.id)"
      :input-size="inputSize"
      :isEditing="isEditing"
      @gradeInput:action-edit="enterEditMode('save')"
      @gradeInput:action-delete="enterEditMode('delete')"
      @blur="isEditing = false"
      @grade-input:after-save="afterSave($event, grade.id)"
      @grade-input:after-remove="afterRemove($event, grade.id)"
      @grade-input:after-cancel="afterCancel($event, grade.id)"
      @keypress.enter="isEditing = false; $emit('grade-input:enter', $event, grade.id)"
      :action="action"
      )
    .control.handle(
      v-show="showHandle"
    )
      a.button.is-static.is-handle(
        :class="inputSize"
        )
        svgicon.icon(name="temp/drag-normal" )
</template>
<script>
import VGradeInput from "./VGradeInput"
export default {
  components: { VGradeInput },
  props: {
    grade: {
      type: Object,
      required: true
    },
    showHandle: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      action: "save", // default to save until changed
      inputSize: "is-large",
      isEditing: false,
      gradeInputElement: null
    }
  },
  mounted() {
    if (this.$children[0].$refs["gradeInput"]) {
      this.gradeInputElement = this.$children[0].$refs["gradeInput"].focus()
    }
  },
  methods: {
    afterSave(newValue, id) {
      this.$emit("grade-input:enter", newValue, id)
      this.isEditing = false
    },

    afterRemove({ e }, id) {
      $logger.blue(`removing record id ${id}`)
      this.deleteGrade(id)
      this.isEditing = false
    },

    afterCancel({ e }, id) {
      $logger.blue(`canceling record id ${id}`)
      this.isEditing = false
    },

    enterEditMode(action, id) {
      /* Enter editing mode */
      this.isEditing = true
      /* Pass action prop, to denote if we are saving or deleting */
      this.action = action

      this.$nextTick(() => {
        if (this.gradeInputElement) {
          this.gradeInputElement.focus()
        }
      })
    },

    deleteGrade(id) {
      this.$emit("grade-input:delete", id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.handle {
  cursor: pointer;

  a {
    width: 26px;

    svg {
      width: 24px;
      color: #D3D9DE;
    }
  }
}

.grade {
  margin: 1em 0;
  user-select: none;
  height: 60px;
  transition: background-color 0.3s ease;

  &.sortable-chosen {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: #F4F7F9;

    .grade-box {
      background-color: #F4F7F9;
    }
  }

  .field {
    height: 100%;

    .button {
      height: 100%;
      background-color: transparent;

      &.grade-level {
        font-size: 18px;
        width: 60px;
        color: #2F3439;
      }
    }

    .control {
      font-size: 18px;
    }
  }
}

.is-static.is-handle {
  padding: 0 0.3em;
}
</style>
