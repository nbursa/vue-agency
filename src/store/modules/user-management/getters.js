export const getSetupStatus = state => {
  if(state.profile) {
    return state.profile.isSetupCompleted !== undefined ? state.profile.isSetupCompleted : true
  }
}