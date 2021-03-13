import { Agency } from "./Agency"
import { Temp } from "./Temp"
import { User } from "./User"

// Register all classes you plan to use on your data collections
const classMap = {
  Agency,
  Temp,
  User
}

class ClassFactory {
  constructor(className, item, ...args) {
    return new classMap[className](item, ...args)
  }
}

export default ClassFactory
