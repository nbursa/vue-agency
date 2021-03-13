import * as repository from "./repository"

export const logError = (msg, err) => {
  console.error(msg)
  console.log(err)
}

export const getSectors = async ({
  commit
}) => {
  try {
    const {
      data
    } = await repository.getAllSectors()
    commit("SET_SECTORS", data.data)
  } catch (e) {
    console.log(e)
  }
}

export const createSector = async ({
  commit
}, payload) => {
  try {
    const {
      data
    } = await repository.createSector(payload)
    commit("ADD_SECTOR", data.data)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const updateSector = async ({
  commit
}, payload) => {
  try {
    commit("IS_LOADING", true, {
      root: true
    })
    const response = await repository.updateSector(payload)
    commit("UPDATE_SECTOR", payload)
    commit("IS_LOADING", false, {
      root: true
    })
  } catch (e) {
    console.log(e)
  }
}

export const deleteSector = async ({
  commit
}, payload) => {
  try {
    await repository.deleteSector(payload)
    commit("DELETE_SECTOR", payload)
  } catch (e) {
    logError("Sector could not be deleted.", e)
  }
}