export const getUsersWithFullName = state => {
  return state.users.map(user => {
    user.fullName = user.firstName + " " + user.lastName
    return user
  })
}
