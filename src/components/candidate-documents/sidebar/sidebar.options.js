import VEditComplianceDocs from "./VEditComplianceDocs"
import VDefaultAction from "./VDefaultAction"
import VListComplianceDocs from "./VListComplianceDocs"
import VRejectDocument from "./VRejectDocument"

let options = [{
        label: "manage",
        component: VListComplianceDocs
    },
    {
        label: "edit",
        component: VEditComplianceDocs
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