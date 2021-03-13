export const getActivePage = state => {
  //let x = state.params.find(i => Object.keys(i)[0] === "page")

  if (state.params.page) {
    return state.params.page
  } else {
    return 1
  }
}
