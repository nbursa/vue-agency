import { CaslItemBase } from "./CaslItemBase"
import { isObject } from "@/utils/general"

export class User extends CaslItemBase {
  constructor(o, ...args) {
    super(o, ...args)
    // console.log("custom  options object received: ", args[1])
    // may be computed from other existing properties
    this.__fullName = `${this.firstName} ${this.lastName}`

    // or obtained via custom options object as args[1]
    if (isObject(args[1])) {
      let props = args[1]
      Object.keys(props).map(key => {
        this[key] = props[key]
      })
    }
    // then any of these may be used to further fine-tune conditional checks
    // when defining abilities through defineAbilitiesFor() function
    // Use underscored properties as a convention, to separate easily between
    // original object properties and these custom added
  }
}
