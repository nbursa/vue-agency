import VCreateDocument from "./VCreateDocument"
import VDefaultAction from "./VDefaultAction"
import VEditAction from "./VEditDocument"
let options = [
  {
    label: "create",
    component: VCreateDocument
  },
  {
    label: "edit",
    component: VEditAction
  },
  {
    label: "default",
    component: VDefaultAction
  }
]

export default options
