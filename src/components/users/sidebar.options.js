import VCreateUser from "./VCreateUser"
import VDefaultAction from "./VDefaultAction"
import VEditUser from "./VEditUser"
// import VDeleteUser from "./VDeleteUser"

let options = [
  {
    label: "create",
    component: VCreateUser
  },
  {
    label: "edit",
    component: VEditUser
  },
  {
    label: "default",
    component: VDefaultAction
  }
]

export default options
