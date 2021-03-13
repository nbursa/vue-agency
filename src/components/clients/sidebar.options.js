import VDefaultAction from "./VDefaultAction"
import VCreateClient from "./VCreateClient"
import VEditClient from "./VEditClient"

let options = [
  {
    label: "default",
    component: VDefaultAction
  },
  {
    label: "create",
    component: VCreateClient
  },
  {
    label: "edit",
    component: VEditClient
  }
]

export default options
