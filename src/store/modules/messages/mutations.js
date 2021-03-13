import { uniqBy, isObject } from 'lodash'
export const STORE_RECIPIENT = (state, recipient) => {
  state.recipient = recipient
}

export const STORE_THREAD = (state, { conversation, id }) => {
  const dedupe = uniqBy(
    [...((state.threads[id] || {}).items || []).reverse(), ...conversation],
    'id'
  ).reverse()
  // Store threads per conversant id
  state.threads = Object.assign({}, state.threads, {
    [id]: {
      items: dedupe
    }
  })
}

// Receives totalPages & conversation id as params
export const STORE_TOTAL_PAGES_PER_THREAD = (state, { totalPages, id }) => {
  state.threads[id].totalPages = totalPages
}

// Receives thread currentPage (pageNum) & conversation id as params
export const STORE_CURRENT_PAGE_PER_THREAD = (state, { pageNum, id }) => {
  if (state.threads[id]) {
    state.threads[id] = Object.assign({}, state.threads[id], {
      currentPage: pageNum
    })
  }
}

export const ADD_NEW_MSG = (state, { msg, id }) => {
  if (state.threads[id]) {
    state.threads[id].items.push(msg)
  }
}

export const CLEAR_THREAD = (state, { id }) => {
  if (state.threads[id]) {
    state.threads[id] = Object.assign({}, state.threads[id], {
      items: []
    })
  }
}

export const SET_MSG_PROP_IN_STATE = (state, { prop, value }) => {
  state[prop] = value
}

// Chat popups (dock)
export const STORE_CONVERSATIONS = (state, conversations) => {
  state.conversations = conversations
}

// Push conversation to a stack of opened ones
export const PUSH_CONVERSATION_TO_STACK = (state, conversation) => {
  state.openedConversations.push(conversation)
}

// If limit is reached replace last conversation
export const REPLACE_LAST_FROM_STACK = (state, conversation) => {
  state.openedConversations.pop()
}

export const CLOSE_CONVERSATION = (state, conversationId) => {
  state.openedConversations = state.openedConversations.filter(
    (conversation) => {
      return conversation.id !== conversationId
    }
  )
}

export const FLICKER_CONVERSATION = (state, idOrNull) => {
  state.flickeringId = idOrNull
}
