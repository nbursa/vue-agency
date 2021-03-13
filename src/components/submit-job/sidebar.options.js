import VCreateCandidate from "./VCreateCandidate"
import VDefaultAction from "./VDefaultAction"
import VEditCandidate from "./VEditCandidate"

let options = [
  {
    label: "create",
    component: VCreateCandidate
  },
  {
    label: "edit",
    component: VEditCandidate
  },
  {
    label: "default",
    component: VDefaultAction
  }
]

export default options
