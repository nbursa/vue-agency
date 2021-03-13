import VCreateCandidate from "./VCreateCandidate"
import VDefaultAction from "./VDefaultAction"
import VEditCandidate from "./VEditCandidate"
import CMessageInterface from "./messages/CMessageInterface"

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
  },
  {
    label: "message",
    component: CMessageInterface
  }
]

export default options
