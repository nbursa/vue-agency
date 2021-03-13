<template lang="pug">
  .roles-list
    a.roles-list__add-new-button.is-pulled-right(@click.prevent="showNewRole") + {{ $t("agency_structure.button_role_add") }}
    .is-clearfix
    div(v-for="(role, index) in roles")
      v-role(
        :id="role.id"
        :name="role.name"
        :key="index"
        :value="role.label"
        :selected="isSelected(role)"
        @select="onRoleSelected(role, $event)"
        @blur="onBlur()"
        @input:action-save="onSaveClick(role, $event)"
        @input:action-edit="onEditClick"
        @roleInput:action-delete="onDestroyClick(role)"
      )
    v-role(
      ref="newRole"
      v-show="showNew"
      :value="newRole.label"
      :hasControls="false"
      @blur="cancelNewRole"
      @input:action-blur="cancelNewRole"
      @input:action-save="createNewRole"
      @input:action-edit="onEditClick"
    )

</template>

<script>
import VRole from "./VRole.vue"
import VBaseInput from "../_shared/VBaseInput"

export default {
  components: {
    VRole,
    VBaseInput
  },
  props: {
    roles: {
      type: Array,
      required: true
    },
    roleSelected: {
      type: Object,
      required:true
    }
  },
  data() {
    return {
      showNew: false,
      newRole: {
        label: 'New Role',
        name: '',
        permissions:[]
      }
    }
  },
  methods: {
    isSelected: function(role) {
      return this.roleSelected.id  ? this.roleSelected.id === role.id : false
    },
    showNewRole() {
      this.showNew = true
      this.$nextTick(() => this.$refs.newRole.$refs.roleInput.focus())
    },
    createNewRole(label) {
      if(label === '') return
      this.$emit("action:create-role", {label: label, name: label, permissions: []})
      this.showNew = false
    },
    cancelNewRole() {
      this.showNew = false
    },
    onRoleSelected(role, event) {
      this.$emit("action:select-role", role)
    },
    onDestroyClick(role) {
      this.$emit("action:delete-role", role)
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
    onSaveClick(role, value) {
      if(value === '') return
      this.$emit("action:update-role", {
        id: role.id,
        name: value,
        label: value,

      })
      this.isEditing = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.roles-list {
  &__add-new-button {
    font-size: 0.75rem;
  }
}
</style>
