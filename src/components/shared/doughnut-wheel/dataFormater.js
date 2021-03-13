import { colorGenerator } from './randomColorGen.js'

const halfPi = Math.PI / 2

export const wheelFormat = data => {
  const sliceNumber = data.length
  data.forEach((slot, index) => {
    slot.angle = timeToAngleConverter(slot.from, sliceNumber)
    slot.format = {
      name: slot.name,
      color: colorGenerator(sliceNumber, index)
    }
    slot.inherit_id = slot.id
    delete slot.inheritId
  })
  return data
}

export const angleToTimeConverter = (angle, arcsize, increment) => {
  //adjusts result for Pi/2 to Pi
  let adjust = 0

  switch (angle) {
    case halfPi >= angle:
      adjust = 24
      break
    case halfPi < angle:
      adjust = 0
      break
  }

  //let adjust = halfPi >= angle ? 24 : 0

  let startResult =
    angle >= 0
      ? Math.abs(Math.round(angle / increment)) / 2 + 6
      : negativeProper(angle, increment)

  let endResult =
    halfPi >= Math.abs(angle)
      ? Math.round(arcsize / increment) / 2 + startResult
      : Math.round(arcsize / increment) / 2 + startResult - adjust

  let endResultOffseted = endResult > 24 ? endResult - 24 : endResult

  let fromResultTime =
    startResult !== 0 && startResult % parseInt(startResult) !== 0
      ? `${parseInt(startResult)}:30`
      : `${parseInt(startResult)}:00`
  let toResultTime =
    endResultOffseted !== 0 &&
    endResultOffseted % parseInt(endResultOffseted) !== 0
      ? `${parseInt(endResultOffseted)}:30`
      : `${parseInt(endResultOffseted)}:00`

  const result = {
    defaults: {
      from: startResult,
      to: endResultOffseted
    },
    from: fromResultTime,
    to: toResultTime
  }
  return result
}

export const timeToAngleConverter = from => {
  const timeParts = from.split(':')
  const increment = Math.PI * 2 / 48
  const minutes = timeParts[1] / 60
  const hours = parseInt(timeParts[0])
  let angleOffset = null

  if (hours >= 18 && hours !== 0) {
    //offset  accounting for -PI to -PI/2
    angleOffset = -1 * (Math.PI / 2 + 2 * Math.PI)
  } else {
    angleOffset = -1 * Math.PI / 2 //offset accounting for -PI/2 to -PI
  }

  let result = (hours + minutes) * increment * 2 + angleOffset

  return result
}

const negativeProper = (angle, increment) => {
  let result
  const reducer = halfPi >= Math.abs(angle) ? 6 : 30
  result = Math.abs(Math.abs(Math.round(angle / increment)) / 2 - reducer)
  return result
}
