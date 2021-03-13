import { parseValidationMessages } from "@/utils/errorParser"

export const getIsLoading = state => state.isLoading
/*
 * Triggered from axios interceptor on 401 and 422
 */
export const getValidationMessages = state => {
  const errorsObject = state.serverErrors.errors || {}

  const errors = [...Object.values(errorsObject)]
  const message = state.serverErrors.message || ""

  if (errors && errors.length) {
    return {
      errors: parseValidationMessages(errors),
      message
    }
  } else {
    return { message }
  }
}

export const getTabIterations = ({ tabState }) => {
  return tabState.iterations
}

export const getActiveTab = ({ tabState }) => {
  return tabState.active.hash
}

export const noPreviousTab = ({ tabState }) => {
  if (tabState.iterations) {
    return tabState.iterations.indexOf(tabState.active.hash) === 0
  }
}

export const noNextTab = ({ tabState }) => {
  if (tabState.iterations) {
    const last = tabState.iterations.length - 1
    return tabState.iterations.indexOf(tabState.active.hash) === last
  }
}

export const getInclude = state => {
  return state.storeInclude
}

export const getLocalization = state => {
  return state.localization
}