import COnBoardingSetupInterface from "./COnBoardingSetupInterface.vue"

export default [
  {
    path: "/on-boarding",
    name: "on-boarding-setup",
    component: COnBoardingSetupInterface,
    meta: {
      caption: "onboardingsetup",
      //resource: "Agency"
    }
  },
  {
    path: "/agency-structure",
    name: "agency-structure",
    component: COnBoardingSetupInterface,
    meta: {
      caption: "settings",
      //resource: "Agency"
    }
  }
]
