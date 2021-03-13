import { capitalise } from "@/utils/general"
import { AbilityBuilder } from "@casl/ability"
import { camelCase } from "lodash"

function subjectName(subject) {
  if (!subject || typeof subject === "string") {
    return subject
  }

  const Type = typeof subject === "object" ? subject.constructor : subject
  return Type.modelName || Type.name
}

const isAdmin = permission => {
  return permission.startsWith("admin")
}

export const defineAbilitiesFor = (user, conditions = {}) => {
  return AbilityBuilder.define({ subjectName }, can => {
    let permissions = user.permissions
    let userRole = user.role.split("-").concat()

    const t = permissions.filter(isAdmin).reduce((a, perm) => {
      let [admin, action, resource] = perm.split("-")

      a[resource] = (a[resource] || []).concat([action])
      return a
    }, {})

    if(isAdmin) {
      t[camelCase(user.role)] = ["use"]
    }
    Object.entries(t).map(entry => {
      const [entity, actions] = entry
      let resourceType = capitalise(entity)
      can(actions, resourceType, {
        ...conditions[entity],
        ...(conditions.ALWAYS || {})
      })
    })
  })
}
