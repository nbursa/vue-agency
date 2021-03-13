import CUserProfileInterface from './CUserProfileInterface.vue'
import VUserList from './VUserList'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: CUserProfileInterface,
    meta: {
      caption: 'profile'
    }
  },
  {
    path: '/b/users',
    name: 'b-users',
    component: VUserList,
    meta: {
      caption: 'busers'
    }
  },
  {
    path: '/users/update-password',
    name: 'users-update-password',
    component: CUserProfileInterface,
    meta: {
      caption: 'profile'
    }
  }
]
