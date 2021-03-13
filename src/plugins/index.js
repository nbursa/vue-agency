// import * as common from "@/utils/general"
import { merge, getNestedObject, getSiblingRef } from "@/utils/general"
// ...add more as you go

const GeneralHelpers = {
  install(Vue, options) {
    Vue.prototype.$merge = merge
    Vue.prototype.$getNestedObject = getNestedObject
    Vue.prototype.$getSiblingRef = getSiblingRef
  }
}

export { GeneralHelpers }
