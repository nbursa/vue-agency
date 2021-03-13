import { api } from "@/axios"

export const login = user => {
  return api.post("/auth/login", {...user, device_type: "web"})
}

export const getProfile = () => {
  return api.get("/profile?include=role")
}

export const resetPassword = ({ newPwdRequest, accept }) => {
  const url = accept ? "/invite/accept" : "/password/reset"
  return api.post(url, newPwdRequest)
}

export const requestNewPassword = email => {
  return api.post("/password/email", email)
}

export const sendTwoWayAuthCode = payload => {
  const { code, hash, rememberMe } = payload
  return api.post("/auth/two-way", {
    twoWayAuthCode: code,
    twoWayAuthHash: hash,
    saveDevice: rememberMe
  })
}

export const refreshToken = token => {
  return api.post("/auth/refresh", token)
}