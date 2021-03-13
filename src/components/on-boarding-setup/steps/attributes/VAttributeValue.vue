<template lang="pug">
div.job-type
  v-base-input(
    :key="attributeValue.id"
    :value="attributeValue.value"
    :isEditing="isEditing"
        @blur="onBlur()"
    @input:action-save="onSaveClick"
    @input:action-edit="onEditClick"
    @gradeInput:action-delete="onDestroyClick"
  )
</template>

<script>
import { mapActions, mapState } from "vuex"
import _ from "lodash"
import VBaseInput from "../_shared/VBaseEdit.vue"

export default {
  components: {
    VBaseInput
  },
  props: {
    attributeValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isOpen: false,
      newValue: ""
    }
  },
  methods: {
    onDestroyClick() {
      this.$emit("action:delete-attribute-value", this.attributeValue)
    },
    onBlur() {
      this.isEditing = false
    },
    onEditClick() {
      this.isEditing = true
    },
    onSaveClick(value) {
      this.$emit("action:update-attribute-value", {
        id: this.attributeValue.id,
        attributeValue: value
      })
      this.isEditing = false
    }
  }
}
</script>