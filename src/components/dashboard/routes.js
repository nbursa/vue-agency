import CDashboard from "./CDashboard"

export default [
  {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/jobs/clients", // Doing this becouse i know they will want the dashboard back at some point
    meta: {
      caption: "dashboard",
      resource: "Dashboard"
    },
    component: CDashboard
  }
]
