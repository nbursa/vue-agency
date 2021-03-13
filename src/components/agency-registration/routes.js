import CRegistrationInterface from "./CRegistrationInterface"

export default [

    {
        path: "/register-agency",
        name: "register-agency",
        component: CRegistrationInterface,
        meta: {
            layout: "Registration",
            caption: "registerAgency",
            loadComponent: "VRegisterAgency",
            guestOnly: true
        }
    },

]