import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"

const state = {
  // Chat in sidebar
  recipient: null,

  // Chat popups
  conversations: [],
  openedConversations: [],

  // threads that are used in all opened conversations
  threads: {},

  flickeringId: null
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
