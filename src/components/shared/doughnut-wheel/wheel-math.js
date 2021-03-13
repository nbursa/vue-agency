import { curry } from "lodash"

export const degreesToRadians = degrees => {
  return degrees * Math.PI / 180
}

export const radiansToDegrees = radians => {
  if (radians < 0) {
    return radians * 180 / Math.PI + 360
  } else {
    return radians * 180 / Math.PI
  }
}

// calculates minimum signed angle between slices
export const minSigAngle = (target, source) => {
  return Math.atan2(Math.sin(target - source), Math.cos(target - source))
}

export const normaliseAngle = angle => {
  return mod(angle + Math.PI, Tau) - Math.PI
}

// converts polar coordinates(distance from 0) to cartesian (distance from x,y axis)
export const polarToCartesian = (angle, radius) => {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
}

export const findClosestNumber = curry((counts, goal) => {
  return counts.reduce(
    (prev, curr) =>
      Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  )
})

export const Tau = Math.PI * 2

export const mod = (n, m) => {
  return (n % m + m) % m
}

export const roundTo = (num,dec) => {
  const roundTo = Math.pow(10, dec)
  return Math.round(num * roundTo) / roundTo
}
