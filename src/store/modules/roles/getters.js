import { fixedRoleIds, clientAdminRoles} from "@/config/fixedRoleList"

export const getUserRoles = state =>
  state.roles.filter(item => item.id >= 7 || !fixedRoleIds.includes(item.id))

export const getFixedRoles = state =>
  state.roles.filter(item => item.id <= 7)

export const getClientAdminRoles = state => 
  state.roles.filter(item => clientAdminRoles.includes(item.id))

export const getAdminRoles = state =>
  state.roles.filter(item => fixedRoleIds.includes(item.id) )

export const getInternalRoles = state => 
  state.roles.filter(item => item.id >= 5)