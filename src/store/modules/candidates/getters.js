export const getErrors = state => state.errors

export const getCandidatesWithFullName = state => {
  return state.candidates.map(candidate => {
    candidate.fullName = candidate.firstName + " " + candidate.lastName
    return candidate
  })
}
