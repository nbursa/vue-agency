import * as actions from "./actions"
import * as mutations from "./mutations"

const state = {
    form: {},
    status: false,
    errors: {}
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}