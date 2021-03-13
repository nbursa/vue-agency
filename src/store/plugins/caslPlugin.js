import { Ability } from "@casl/ability"

export const ability = new Ability()

export const caslPlugin = store => {
  store.subscribe(async (mutation, state) => {
    // Update abilities after user is being logged in
    if (mutation.type === "auth/LOGIN_USER") {
      // NOTE: reability action may be dispatched again on a component-level to
      // reassign rules, specifying some other custom conditions if and when
      // needed
      const _ability = await store.dispatch("reability", {
        user: state.auth.user,
        // supply special 'always' attribute, that will apply
        // to all entities, alongside specific attributes that you
        // define on a per entity level
        // eg.
        conditions: {
          // ALWAYS: {
          //   special: true
          // },
          temp: {},
          user: {
            /*
             * this must be set when instantiating User
             * class, or otherwise calculated, for this instance
             * to be shown (custom condition forcing)
             * So it must match with options object param when decorating
             * getter
             */
            __someSpecialProp: true
          }
        }
      })
      ability.update(_ability.rules)
    }

    // Reset abilities when user logs out
    if (mutation.type === "auth/LOGOUT_USER") {
      ability.update([])
    }
  })
}
