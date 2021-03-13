export const SET_ALL_WORKERS = (state, payload) => {
  const payloadFormat = Object.keys(payload).reduce((acc, key) => {
    if(key === "total") {
      state.total = payload[key]
    } else {
      acc[key.replace("people","")] = payload[key]
    }
    return acc
  }, {})
  state.workers = payloadFormat
}