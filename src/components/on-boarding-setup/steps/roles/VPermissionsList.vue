<template lang="pug">
  .permissions
    div(v-for="(permissionGroup, index) in permissionsGrouped")
      v-permission-group(:permission-group="permissionGroup" :key="index" :action-type="actionType" @action:permissions-add="onAdd" @action:permissions-remove="onRemove" :allow-action="canAlterPermissions")
</template>

<script>
import VPermissionGroup from "./VPermissionGroup"
import { groupBy } from "lodash"

export default {
  components: {
    VPermissionGroup
  },
  props: {
    permissions: {
      type: Array,
      required: true
    },
    actionType: {
      type: Object,
      required: true,
      default: () => ({ name: "add", color: "#135CFE" })
    },
    canAlterPermissions: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    permissionsGrouped: function() {
      const result = groupBy(this.permissions, permission => {
        return permission.name.split("-").pop()
      })

      return result
    }
  },
  methods: {
    onAdd(data) {
      this.$emit("action:list-add", data)
    },
    onRemove(data) {
      this.$emit("action:list-remove", data)
    }
  }
}
</script>

<style>
</style>
