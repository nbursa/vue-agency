import * as repository from "./repository"

export const getPermissions = async ({
  commit
}) => {
  try {
    const data = await repository.getAllPermissions()
    commit("SET_ALL_PERMISSIONS", data)
  } catch (e) {
    console.log("err:roles:actions-getPermissions", e)
  }
}

export const addPermissions = async ({
  commit,
  getters,
  dispatch
}, payload) => {
  try {
    // <=1 to account for vue observer
    if (Object.getOwnPropertyNames(getters.getSelectedRole).length <= 1) return
    commit("SET_SELECTED_PERMISSIONS", payload)
    dispatch("updateRole", getters.getSelectedRole)
  } catch (e) {
    console.log("err:roles:actions-addPermissions", e)
  }
}

export const removePermissions = async ({
  commit,
  getters,
  dispatch
}, payload) => {
  try {
    commit("DELETE_PERMISSIONS", payload)
    dispatch("updateRole", getters.getSelectedRole)
  } catch (e) {
    console.log("err:roles:actions-removePermissions")
  }
}

export const getRoles = async ({
  commit
}) => {
  try {
    const data = await repository.getAllRoles()
    commit("SET_ALL_ROLES", data)
  } catch (e) {
    console.log("err:roles:actions-getRoles")
  }
}

export const createRole = async ({
  commit
}, payload) => {
  try {
    const response = await repository.createNewRole(payload)
    commit("SET_NEW_ROLE", response.data.data)
  } catch (e) {
    console.log("err:roles:actions-create", e)
  }
}

export const updateRole = async ({
  commit
}, payload) => {
  try {
    console.log("update role", payload)
    const response = await repository.updateRole(payload)
    commit("UPDATE_ROLE", response.data.data)
  } catch (e) {
    console.log("err:roles:actions-update", e)
  }
}

export const selectRole = ({
  commit
}, payload) => {
  try {
    commit("SET_SELECTED_ROLE", payload)
  } catch (e) {
    console.log("err:roles:actions-selectRole", e)
  }
}

export const deleteRole = async ({
  commit
}, payload) => {
  try {
    await repository.deleteRole(payload)
    commit("DELETE_ROLE", payload)
  } catch (e) {
    console.log("err:roles:actions-deleteRole", e)
  }
}

export const completeSetup = async ({commit}) => {
  try {
    return await repository.completeSetup()
  } catch(e) {
    console.log("err:roles:actions-completeSetup", e)
  }
}