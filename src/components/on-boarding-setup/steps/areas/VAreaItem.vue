<template lang="pug">
div.area
  v-base-edit(
    :value="area.name"
    :isEditing="isEditing"
    @blur="onBlur()"
    @input:action-save="onSaveClick"
    @input:action-edit="onEditClick"
    @gradeInput:action-delete="onDestroyClick"
    @expand="showChildren"
  )
</template>

<style lang="stylus" scoped>
.area {
  margin: 1em 0;
}
</style>

<script>
import { mapActions, mapState } from "vuex"
import _ from "lodash"
import VBaseEdit from "../_shared/VBaseEdit.vue"
import VBaseInput from "../_shared/VBaseInput"

export default {
  components: {
    VBaseEdit,
    VBaseInput
  },
  props: {
    area: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isOpen: false
    }
  },
  methods: {
    onDestroyClick() {
      this.$emit("action:delete-area", this.area.id)
    },
    onBlur() {
      this.isEditing = false
    },
    onEditClick() {
      this.isEditing = true
    },
    showChildren() {
      this.isOpen = this.isOpen ? false : true
    },
    onSaveClick(value) {
      this.$emit("action:update-area", {
        id: this.area.id,
        name: value
      })
      this.isEditing = false
    }
  }
}
</script>