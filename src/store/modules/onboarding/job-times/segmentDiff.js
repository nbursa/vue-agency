import _ from 'lodash'

export const checkSegments = (newState, oldState) => {
  const prunedNewState = JSON.parse(JSON.stringify(newState)).map((item) => {
    delete item.computedTime
    delete item.arcSize
    return item
  })

  let segmentsEqual = isArrayEqual(prunedNewState, oldState)
  let segmentsClean = isArrayClean(prunedNewState)
  let action

  if (!segmentsClean || !segmentsEqual) {
    action = 'POST'
  } else {
    action = 'SKIP'
  }

  return action
}

const isArrayEqual = (arr1, arr2) => {
  return (
    _(arr1).differenceWith(arr2, _.isEqual).isEmpty() &&
    arr1.length === arr2.length
  )
}

const isArrayClean = (arr) => {
  let check = _(arr).every((elem) => {
    return elem.id
  })
  return check
}
