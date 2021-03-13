export default class User {
  static from(token) {
    try {
      let jwtPayload = JSON.parse(atob(token.split(".")[1]))
      return new User(jwtPayload)
    } catch (_) {
      return null
    }
  }
  constructor({
    role,
    permissions,
    email,
    currency,
    localization,
    language = "en",
    deviceToken = null,
    deviceType = null
  }) {
    this.userIsAdmin = role.includes("admin")
    this.role = role
    this.permissions = permissions
    this.email = email
    this.lang = language
    this.currency = currency
    this.deviceType = deviceType
    this.deviceToken = deviceToken
    this.localization = localization
  }
  get isAdmin() {
    return this.userIsAdmin
  }
}
