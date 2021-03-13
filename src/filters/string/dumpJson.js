export const d = function(value) {
  let arr = value instanceof Array ? value : [value]
  return arr.map(v => JSON.stringify(v)).join(",")
}
