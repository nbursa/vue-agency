import * as repo from './repository.js'
import { find, findIndex } from 'lodash'
import ShortUniqueId from 'short-unique-id'
const uid = new ShortUniqueId()

export const storeRecipient = ({ commit }, recipient) => {
  commit('STORE_RECIPIENT', recipient)
}

export const getConversation = async (
  { commit, dispatch },
  { id, page = 1 }
) => {
  commit('IS_LOADING', true, { root: true })
  commit('LAST_LOADED_ID', id, { root: true })
  const { conversation, meta } = await repo.conversation(id, page)
  commit('IS_LOADING', false, { root: true })
  commit('STORE_THREAD', { conversation: conversation, id: id })
  commit('STORE_TOTAL_PAGES_PER_THREAD', {
    totalPages: meta.pagination.totalPages,
    id: id
  })
  commit('STORE_CURRENT_PAGE_PER_THREAD', {
    pageNum: page,
    id: id
  })
}

export const markAsReadConversation = async ({ commit, dispatch }, id) => {
  await repo.markAsReadConversation(id)
}

export const addFromPush = async ({ commit, dispatch }, { msg, id }) => {
  msg.createdAt = msg.created_at
  msg.roleName = msg.role_name
  // NOTE we have to override message id here, as it comes from a push
  // and is not the real message id but recipient/conversation id instead!
  msg.oldId = msg.id
  msg.id = uid.randomUUID(6) // workaround for message id
  commit('ADD_NEW_MSG', { msg, id })
  dispatch('markAsReadConversation', id)
}

export const clearThread = ({ commit }, { id: id }) => {
  commit('CLEAR_THREAD', { id: id })
}

export const sendMessage = async (
  { commit, state, dispatch },
  { id, body }
) => {
  commit('IS_LOADING', true, { root: true })
  try {
    const sent = await repo.send(id, body)
    // Add new message to state.thread
    commit('ADD_NEW_MSG', { msg: sent, id: id })
    // Refresh dropdown list
    // TODO do it only for new IDs, so those that do not exist
    // in state.conversations[]
    // if (findIndex(sate.conversations, ["id", id])) {
    //   console.log("jupi")
    // }
    try {
      await dispatch('getConversations')
    } catch (e) {
      console.log('[chatPlugin] Fetch on get conversations failed!', e)
    }
    return Promise.resolve(sent)
  } catch (err) {
    console.log(err)
    throw err
  } finally {
    commit('IS_LOADING', false, { root: true })
  }
}

export const setCurrentPage = ({ commit }, { pageNum, conversationId }) => {
  commit('STORE_CURRENT_PAGE_PER_THREAD', {
    pageNum: pageNum,
    id: conversationId
  })
}

export const incrementCurrentPage = async (
  { state, commit, dispatch },
  { conversationId }
) => {
  const totalPages = state.threads[conversationId].totalPages
  let currentPage = state.threads[conversationId].currentPage

  const oldCurrent = currentPage

  currentPage = ++currentPage > totalPages ? totalPages : currentPage

  if (currentPage !== oldCurrent) {
    await dispatch('setCurrentPage', {
      pageNum: currentPage,
      conversationId: conversationId
    })
    return Promise.resolve(currentPage)
  }
  return Promise.reject()
}

/*
 * Chat popups (dock)
 */
export const closeConversation = ({ commit }, conversationId) => {
  commit('CLOSE_CONVERSATION', conversationId)
}

export const getConversations = async ({ commit }) => {
  const conversations = await repo.conversations()
  commit('STORE_CONVERSATIONS', conversations)
}

export const pushConversationToStack = ({ state, commit }, conversation) => {
  // Allow max of 3 conversations to be opened at a time
  if (state.openedConversations.length === 3) {
    commit('REPLACE_LAST_FROM_STACK', conversation)
  }
  commit('PUSH_CONVERSATION_TO_STACK', conversation)
  return Promise.resolve()
}

export const flickerConversation = ({ commit }, idOrNull) => {
  commit('FLICKER_CONVERSATION', idOrNull)
}
