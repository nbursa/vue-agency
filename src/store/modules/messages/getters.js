export const conversationMessagesCount = state => {
  if (state.conversations.length) {
    return state.conversations.reduce((total, conversation) => {
      return total + conversation.counter
    }, 0)
  }
}

// Get conversation thread by conversant ID
// @return empty array if conversation not found
export const getThreadById = state => id => {
  const threadObject = state.threads[id]
  if (threadObject) {
    return {
      meta: {
        totalPages: threadObject.totalPages,
        currentPage: threadObject.currentPage
      },
      items: threadObject.items
    }
  } else {
    return {
      meta: {
        totalPages: 1,
        currentPage: 1
      },
      items: []
    }
  }
}

// Prepare messages to be displayed in thread, with datetime stamp
// for the first one in that particular date

import { DateTime } from "luxon"

export const conversationIndexedByDate = (state, getters, rootState) => id => {
  if (state.threads[id]) {
    return state.threads[id].items.reduce((conversation, c) => {
      const key = DateTime.fromSQL(c.createdAt)
      const fmtKey = key.toFormat(rootState.localization.dateFormat)

      conversation[fmtKey] = (conversation[fmtKey] || []).concat([c])
      return conversation
    }, {})
  }
}

export const conversationGroups = (state, getters) => id => {
  return Object.keys(getters.conversationIndexedByDate(id))
}

export const conversationsByDate = (state) => {
  return [...state.conversations].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })
}
