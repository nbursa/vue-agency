import CUsers from "./CUsers.vue"

export default [{
  path: "/users",
  name: "internal-users",
  component: CUsers,
  meta: {
    caption: "users",
    resource: "User"
  }
}]