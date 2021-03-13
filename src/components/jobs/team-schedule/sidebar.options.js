
import VDefaultAction from "./sidebar/VDefaultAction"
import VEditActionJob from "./sidebar/VEditActionJob"
import VEditActionLeave from "./sidebar/VEditActionLeave"

let options = [

  {
    label: "default",
    component: VDefaultAction
  },
  {
    label: "editJob",
    component: VEditActionJob
  },
  {
    label: "editLeave",
    component: VEditActionLeave
  }
]

export default options
