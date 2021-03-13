<template lang="pug">
div.sector
  v-base-edit(
    :value="sector.name"
    :isEditing="isEditing"
    @blur="onBlur()"
    @input:action-save="onSaveClick"
    @input:action-edit="onEditClick"
    @gradeInput:action-delete="onDestroyClick"
    @expand="showChildren"
  ) 
</template>

<style lang="stylus" scoped>
.sector {
  margin 1em 0
  .control:hover {
    cursor default
  }
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
    sector: {
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
      this.$emit("action:delete-sector", this.sector.id)
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
      this.$emit("action:update-sector", {
        id: this.sector.id,
        name: value
      })
      this.isEditing = false
    }
  }
}
</script>