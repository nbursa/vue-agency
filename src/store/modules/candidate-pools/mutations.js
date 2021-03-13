export const SET_META_DATA = (state, meta) => {
  state.meta = meta.pagination
}

export const UPDATE_STATUS = (state, newStatus) => {
  state.status = newStatus
}

export const SET_ERRORS = (state, errors) => {
  state.errors = errors
}

export const SET_POOLS = (state, pools) => {
  state.pools = pools
}

export const DELETE_POOL = (state, poolId) => {
  state.pools = state.pools.filter((item) => item.id != poolId)
}

export const ADD_POOL = (state, value) => {
  state.pools.unshift(value)
}

export const UPDATE_POOL = (state, pool) => {
  const { id } = pool
  let oldPool = state.pools.find((item) => item.id === id)
  Object.keys(oldPool).forEach((key) => {
    oldPool[key] = pool[key]
  })
}
