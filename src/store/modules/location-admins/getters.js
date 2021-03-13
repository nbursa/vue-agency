export const getErrors = state => state.errors

export const getLocationAdminsWithFullName = state => {
  return state.locationAdmins.map(locationAdmin => {
    locationAdmin.fullName =
      locationAdmin.firstName + " " + locationAdmin.lastName
    return locationAdmin
  })
}
