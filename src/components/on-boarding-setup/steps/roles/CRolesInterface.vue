<template lang="pug">
  div.roles
    div.columns
      div.column.is-12.roles__labels
        span {{ $t("agency_structure.role_column_0") }}
        span {{ $t("agency_structure.role_column_1") }}
        span {{ $t("agency_structure.role_column_2") }}
    div.columns.roles__content
      div.column.is-4.roles__items--list
        v-roles-list(:roles="roles" :roleSelected="roleSelected" @action:create-role="createRole" @action:delete-role="deleteRole" @action:select-role="selectRole" @action:update-role="updateRole" )
      div.column.is-4.roles__items--middle
        v-permissions-list(:permissions="permissions" :action-type="{name:'add', color:'#135CFE'}" @action:list-add="addPermissions" :can-alter-permissions="roleSelected.name !== 'sign-off-admin' && roleSelected.name !== 'client-admin'")
      div.column.is-4.roles__items--list
        v-permissions-list(:permissions="roleSelected.permissions" v-if="roleSelected.permissions"  @action:list-remove="removePermissions" :action-type="{name:'remove', color:'#D0021B'}" :can-alter-permissions="roleSelected.name !== 'sign-off-admin' && roleSelected.name !== 'client-admin'")
    CErrorValidation
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import VRolesList from "./VRolesList"
import VPermissionsList from "./VPermissionsList"
import CErrorValidation from "../_shared/CErrorValidation.vue"

export default {
  components: {
    VRolesList,
    VPermissionsList,
    CErrorValidation
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("onboarding/roles", ["roles", "permissions", "roleSelected"])
  },
  created() {
    this.getPermissions()
    this.getRoles()
  },
  methods: {
    ...mapActions("onboarding/roles", [
      "getPermissions",
      "removePermissions",
      "addPermissions",
      "getRoles",
      "createRole",
      "updateRole",
      "deleteRole",
      "selectRole"
    ])
  }
}
</script>

<style lang="stylus" scoped>


.roles {
  height: 51.5vh;

  &__labels {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid $darkGray;
    margin-top: 18px;

    span {
      display: inline-block;
      text-align: left;
      width: 100%;
      padding-left: 25px;
      padding-top: 0.5em;
      font-size: 0.75rem;
      color: $fontDark;
    }
  }

  &__content {
    height: 100%;
  }

  &__items {
    &--middle, &--list {
      overflow-y: auto;
      border-left: 1px solid $darkGray;
      border-right: 1px solid $darkGray;
    }

    &--list {
    }
  }
}
</style>
