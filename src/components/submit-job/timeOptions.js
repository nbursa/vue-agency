export const getTimeOptions = () => {
  var toInt = (time) =>
      ((h, m) => h * 2 + m / 30)(...time.split(':').map(parseFloat)),
    toTime = (int) => [Math.floor(int / 2), int % 2 ? '30' : '00'].join(':'),
    range = (from, to) =>
      Array(to - from + 1)
        .fill()
        .map((_, i) => from + i),
    eachHalfHour = (t1, t2) => range(...[t1, t2].map(toInt)).map(toTime)

  return eachHalfHour('00:00', '23:30').map((item, i) => {
    return {
      id: i + 1,
      label: item
    }
  })
}

export const getIncrementTimeOptions = () => {
  const times = Array(288)
    .fill(0)
    .map((_, i) => {
      return (
        '0' +
        ~~(i / 12) +
        ':0' +
        Math.round(60 * ((i / 12) % 1))
      ).replace(/\d(\d\d)/g, '$1')
    })

  return times.map((item, i) => {
    return {
      id: i + 1,
      label: item
    }
  })
}
