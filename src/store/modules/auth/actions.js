// Import here repository, as a proxy interface for api methods
import * as repo from "@/store/modules/auth/repository"
import { localforage } from "@/utils/localforage"
import { jsonify } from "@/utils/presentational"
import User from "@/models/User"
import blacklistedRoles from "@/config/blacklistedRoles"


import router from "@/router"

export const login = async ({ commit }, user) => {
  try {
    const res = await repo.login(user)

    try {
      const { hash } = res.data
      if (hash) {
        // TWO WAY auth is enabled
        console.log("Two way auth enabled...")
        console.log(`Action ( login ) -> ${hash}`)

        // reroute to /login/two-way to collect the PIN CODE that user received
        console.log("Avoid storing token, rerouting app to /login/two-way")
        // Reject with the above hash
        return Promise.reject({
          hash: hash
        })
      }
      /* blackhole catch */
    } catch (_) {}

    // No TWO WAY auth is active, do a regular login
    // Refactor this part into reusable action, because we need this even after TWO WAY AUTH cycle
    const { token } = res.data    
    const userFromToken = User.from(token)

    // Prevent blacklisted user roles from logging into the portal
    if(blacklistedRoles.includes(userFromToken.role)) {
      return Promise.reject({blacklisted: "global.user_blacklisted"})
    } else {
      const t = await localforage.setItem("jwt", token)
      commit("SET_USER", userFromToken)
      return Promise.resolve(t)
    }
  } catch (err) {
    return Promise.reject(err.data)
  }
}

export const loginViaToken = async ({ commit }, token) => {
  try {
    const t = await localforage.setItem("jwt", token)
    commit("LOGIN_USER", t)
    return Promise.resolve(t)
  } catch (err) {
    return Promise.resolve(err.data)
  }
}

export const logout = ({ commit }, user) => {
  return localforage.removeItem("jwt").then(() => {
    commit("LOGOUT_USER")
  })
}

export const checkToken = async ({ dispatch, rootState }) => {
  try {

    // let currentProfile = rootState.userManagement.profile

    // if(!!!currentProfile) {
      const check = await repo.getProfile()
      /* gets user on beforeEach hook */
      const user = check.data.data
      return Promise.resolve(user)
    // } else {
    //   return Promise.resolve(currentProfile)
    // }
  } catch(e) {
    /* Logout user, because of invalid token */
    return dispatch("logout").then(() => {
      return Promise.reject()
    })
  }
}

export const refreshToken = async ( { dispatch } ) => {
  const token = await localforage.getItem("jwt")
  const newToken = await repo.refreshToken({token})

  dispatch("loginViaToken", newToken.data.token)
}

export const relogin = async ({ commit, dispatch }, token) => {
  return dispatch("checkToken").then((user) => {
    commit("LOGIN_USER", token)
    commit("userManagement/UPDATE_PROFILE", user, { root: true })
    return Promise.resolve(true)
  })
}

// Reset password || Accept invite (only route is different)
export const resetPassword = async ({ commit }, payload) => {
  let res
  try {
    res = await repo.resetPassword(payload)
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err.data)
  }
}

// Request new password
export const requestNewPassword = async ({ commit }, payload) => {
  try {
    const res = await repo.requestNewPassword(payload)
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err.data)
  }
}

/*
 * Two way authentication related
 */
export const sendTwoWayAuthCode = async ({ commit, dispatch }, payload) => {
  try {
    commit("IS_LOADING", true, { root: true })
    const res = await repo.sendTwoWayAuthCode(payload)
    commit("IS_LOADING", false, { root: true })
    return Promise.resolve(res.data)
  } catch (err) {
    commit("IS_LOADING", false, { root: true })
    return Promise.reject(err.data)
  }
}

/* This stores a token, so the user is not being asked for code anymore */
export const storeRememberMeToken = async ({ commit }, payload) => {
  const rememberMe = await localforage.setItem("remember-me", payload)
  return Promise.resolve(rememberMe)
}

export const hasRememberMeToken = async () => {
  try {
    const rememberMe = await localforage.getItem("remember-me")
    return Promise.resolve(rememberMe)
  } catch (err) {
    return Promise.reject(err)
  }
}
