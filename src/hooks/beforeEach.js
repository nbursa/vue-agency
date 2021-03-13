/* eslint-disable no-console */
/* global $logger */
import { localforage } from '@/utils/localforage'
import store from '../store'
import { abilities } from '../store'

/*
 * Check if token exists, if it does Login the user
 */
export const beforeEachHook = (to, from, next) => {
  store.dispatch('clearValidationErrors')
  localforage
    .getItem('jwt')
    .then(async (token) => {
      /*
       * Check if token is really valid,
       * as anything that can be parsed as jwt will
       * come in then() block
       * Hit GET /profile
       * where we would trigger 401 Unauthorized in case
       * token was being tampered with
       */
      const guestOnly = to.matched.some((route) => {
        return route.meta.guestOnly
      })
      console.log('guest  only: ', guestOnly)

      if (!token && guestOnly) {
        next()
      } else if (!token && !guestOnly) {
        next({ path: '/login' })
      } else {
        //TODO - painfull relogin check on every damn route, need to at least make this somewhat conditional

        const valid = await store.dispatch('auth/relogin', token)
        const setupComplete = store.getters['userManagement/getSetupStatus']

        if (valid) {
          // sets back button referrer for shared components
          if (to.meta.guardBack && to.name !== from.name) {
            to.meta.backButton = from.name
          }
          if (!guestOnly) {
            if (!setupComplete && to.path !== '/on-boarding') {
              next({ path: '/on-boarding' })
              store.dispatch('setValidationErrors', {
                data: {
                  onboarding:
                    'Please finish the onboarding process to navigate.'
                }
              })
            } else {
              if (
                abilities.can('view', to.meta.resource) ||
                abilities.can('can', to.meta.resource) ||
                !to.meta.resource
              ) {
                next()
              } else {
                //TODO Redirect to custom 404 page
              }
            }
          } else {
            // redirect to intended route or / if not found
            next({ path: '/' })
          }
        }
      }
    })
    // localforage exception thrown
    .catch(async (err) => {
      /* Store intended route for after login */
      await localforage.setItem('redirect', to.path)
      /* Remove invalid token && redirect back to login */
      await localforage.removeItem('jwt')
      next({ path: '/login' })
    })
}
