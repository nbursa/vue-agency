export const toggleModal = ({ commit }, data) => {
  commit("SET_MODAL_DATA", data)
  commit("TOGGLE_MODAL", true)
}

export const closeModal = ({ commit }) => {
  commit("SET_MODAL_DATA", [])
  commit("SET_MODAL_COMPONENT", "")
  commit("TOGGLE_MODAL", false)
}

export const resetModal = ({ commit }) => {
  commit("TOGGLE_MODAL", false)
  commit("SET_MODAL_DATA", null)
}

export const setModalComponent = ({commit, dispatch}, data) => {
  let { modalComponent, modalData } = data
  commit("SET_MODAL_COMPONENT", modalComponent)
  dispatch("toggleModal", modalData)
}

export const updateModalData = ({commit}, data) => {
  commit("UPDATE_MODAL_DATA", data)
}