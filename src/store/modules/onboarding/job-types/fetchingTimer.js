let cacheTimers = []
const EXPIRY_TIME = 60000

const getCurrentTime = () => {
  return Date.now()
}

const isExpired = item => {
  if (getCurrentTime() - item.time < EXPIRY_TIME) {
    return false
  } else {
    return true
  }
}

const deleteItem = item => {
  let index = cacheTimers.indexOf(item)
  cacheTimers.splice(index, 1)
}

const getById = id => {
  let item = cacheTimers.find(e => e.parentId === id)
  return item
}

const invalidateEntry = () => {
  let index = cacheTimers.indexOf(cacheEntry)
  cacheTimers.splice(index, 1)
}

const hasCache = id => {
  let item = getById(id)
  if (!item) {
    return false
  }

  if (item && isExpired(item)) {
    deleteItem(item)
    return false
  }

  return true
}

const reset = () => {
  cacheTimers = []
}

const addItem = id => {
  if (!id) {
    return
  }
  cacheTimers.push({
    parentId: id,
    time: Date.now()
  })
}

export { hasCache, addItem, reset }
