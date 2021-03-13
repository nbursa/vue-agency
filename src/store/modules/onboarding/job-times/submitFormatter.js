export const submitFormatter = (data, selectedClient) => {
  // eslint-disable-next-line no-console
  console.log(data)
  let result = data.map((item) => {
    let timeObj = {
      name: item.name ? item.name : '',
      from: adjustDate(item.computedTime.from),
      to: adjustDate(item.computedTime.to),
      inherit_id: item.inherit_id === 0 ? null : item.inherit_id
    }
    if (item.id) {
      timeObj.id = item.id
    }
    return timeObj
  })
  // eslint-disable-next-line no-console
  console.log(result)

  let payload = selectedClient
    ? {
        clientId: selectedClient.id,
        segments: result
      }
    : {
        segments: result
      }

  return payload
}

const adjustDate = (time) => {
  let [hours, minutes] = time.split(':')

  if (hours < 10 && hours.length < 2) {
    hours = `0${hours}`
  }
  if (hours == 24) {
    hours = '00'
  }
  if (minutes < 10 && minutes.length < 2) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}:00`
}
