import VDefaultAction from "./VDefaultAction"
import VRejectDocument from "./VRejectDocument"

import VListComplianceFiles from "./VListComplianceFiles"

let options = [{
        label: "edit",
        component: VListComplianceFiles
    },
    {
        label: "default",
        component: VDefaultAction
    },
    {
        label: "reject",
        component: VRejectDocument
    }
]

export default options