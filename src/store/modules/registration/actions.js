import * as repository from "./repository"


export const setFormModel = ({commit}, payload) => {
    commit("SET_FORM_MODEL", payload)
}

export const updateModel = ({commit}, payload) => {
    commit("UPDATE_MODEL", payload)
}

export const submitAgency = async ({ commit }, payload) => {
    const response = await repository.submit(payload)
    return response 
}