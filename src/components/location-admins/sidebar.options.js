import VCreateLocationAdmin from "./VCreateLocationAdmin"
import VDefaultAction from "./VDefaultAction"
import VEditLocationAdmin from "./VEditLocationAdmin"

let options = [
  {
    label: "create",
    component: VCreateLocationAdmin
  },
  {
    label: "edit",
    component: VEditLocationAdmin
  },
  {
    label: "default",
    component: VDefaultAction
  }
]

export default options
