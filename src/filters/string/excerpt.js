export const excerpt = function(v, numWords, options = {}) {
  let { suffix = "...", maxLength = 50 } = options
  let numWordsOld = numWords
  if (v) {
    let rep = v
      .split(" ")
      .reduce((acc, word) => {
        if (numWords !== 0) {
          acc.push(word)
          numWords--
        }
        return acc
      }, [])
      .join(" ")

    if (rep.trim().length > maxLength) {
      return rep.trim().substr(0, maxLength) + suffix
    } else if (v.trim().split(" ").length > numWordsOld) {
      return rep.trim() + suffix
    }

    return rep.trim()
  }
}
