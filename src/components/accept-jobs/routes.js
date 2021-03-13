import CAcceptJobs from "./CAcceptJobs"

export default [

  {
    path: "/job-request/:token",
    name: "accept-jobs",
    component: CAcceptJobs,
    meta: {
      layout: "sms",
      guestOnly: true
    }
  },

]