import * as repository from "./repository"

export const updateNote = async ({ commit, dispatch }, payload) => {
    let { noteId, note, route } = payload
    const response = await repository.update(noteId, note, route)
}

export const createNote = async ({ commit , dispatch}, payload) => {
    commit("SET_STATUS", true)
    try {
        let {id, note, route} = payload
        const response = await repository.create(id, note, route)
        return response
    } catch (e) {
        console.log(e)
    } finally {
        commit("SET_STATUS", false)
    }
}

export const deleteNote = async ({commit, dispatch}, payload) => {
    commit("SET_STATUS", true)
    try {
        const response = await repository.remove(payload)
        return response
    } catch (e) {
        console.log(e)
    } finally {
        commit("SET_STATUS", false)
    }
}