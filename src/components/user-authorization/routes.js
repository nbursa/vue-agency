import CUserAuthInterface from "./CUserAuthInterface.vue"
// remove this after

export default [
  {
    path: "/login",
    name: "login",
    component: CUserAuthInterface,
    meta: {
      layout: "login",
      caption: "login",
      loadComponent: "VUserLogin",
      guestOnly: true
    }
  },
  // Password request route
  // - moved to modal
  // {
  //   path: "/password/new",
  //   name: "new-password",
  //   component: CUserAuthInterface,
  //   meta: {
  //     layout: "login",
  //     caption: "newpassword",
  //     loadComponent: "VNewPasswordRequest",
  //     guestOnly: true
  //   }
  // },
  // Password reset route
  {
    path: "/password/reset/:token",
    name: "reset-password",
    component: CUserAuthInterface,
    meta: {
      layout: "login",
      loadComponent: "VResetPassword",
      guestOnly: true
    }
  },
  // Two-way authorization code view
  {
    path: "/login/two-way",
    name: "two-way-auth",
    component: CUserAuthInterface,
    meta: {
      layout: "login",
      loadComponent: "VTwoWayAuthCode",
      guestOnly: true
    }
  },
  {
    path: "/invite/:token",
    name: "invite-accept",
    component: CUserAuthInterface,
    meta: {
      layout: "login",
      loadComponent: "VAcceptInvite",
      guestOnly: true
    }
  }
]
