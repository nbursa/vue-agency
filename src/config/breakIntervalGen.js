const generateBreakIntervals = () => {
  let breaks = Array.from(Array(6).keys())
  return breaks.map(item => {
    item++
    return {
      id: parseInt(item),
      label: parseInt(item * 15)
    }
  })
}

export default generateBreakIntervals