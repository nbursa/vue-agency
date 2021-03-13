<template lang="pug">
  .permissions-group
    a.permissions-group__slide(@click.prevent="showGroup = !showGroup")
      span.permissions-group__label {{groupName}}
        span(@click.prevent="groupAction" v-if="allowAction")
          svgicon.permissions-group__icon(:name="actionIcon"  :fill="false" :color="actionType.color")
    transition-group(name="base-slide-out")
      div(v-for="(permission, index) in permissionGroup" v-show="showGroup" :key="index")
        a.permissions-group__permission {{permission.label}}
          span(@click.prevent="groupAction($event, permission)" v-if="allowAction")
            svgicon.permissions-group__icon(:name="actionIcon"  :fill="false" :color="actionType.color")

</template>

<script>
import "@/compiled-icons/user-roles"
import { startCase, snakeCase } from "lodash"


export default {
  props: {
    permissionGroup: {
      type: Array,
      required: true
    },
    actionType: {
      type: Object,
      required: true
    },
    allowAction: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      showGroup: false
    }
  },
  computed: {
    groupName: function() {
      return `${this.$t(`agency_structure.` + snakeCase(this.permissionGroup[0].name.split("-").pop()))} ${this.$t('agency_structure.permission_label')}`
    },
    actionIcon: function() {
      return this.actionType.name === "add"
        ? "user-roles/Add"
        : "user-roles/Remove"
    },
    groupAction: function() {
      return this.actionType.name === "add"
        ? this.addPermissions
        : this.removePermissions
    }
  },
  methods: {
    addPermissions(e, permission) {
      e.stopPropagation()
      console.log("add group", permission)
      const data = permission ? permission : this.permissionGroup
      this.$emit("action:permissions-add", data)
    },
    removePermissions(e, permission) {
      e.stopPropagation()
      const data = permission ? permission : this.permissionGroup
      console.log("remove group", data)

      this.$emit("action:permissions-remove", data)
    }
  }
}
</script>

<style lang="stylus" scoped>


.permissions-group {
  &__label {
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 13px;
    color: $fontDark;
    font-size: 0.875rem;

    &:hover {
      background-color: $highlightGray;
      border-radius: 3px;
      color: $fontDark;

      .permissions-group__icon {
        opacity: 1;
      }
    }
  }

  &__icon {
    opacity: 0;
  }

  &__permission {
    padding: 5px 26px;
    color: #2F3439;
    opacity: 0.65;
    font-size: 0.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      color: $fontDark;
      opacity: 1;

      .permissions-group__icon {
        opacity: 1;
      }
    }
  }
}
</style>
