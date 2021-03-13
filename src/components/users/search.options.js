import {
  RoleSelector,
  AgencySelector
} from "@/components/shared/selectors"

export default {
  advancedSearch: [{
      id: 3,
      text: "internal_users.filter_advanced_0",
      icon: "filters/role",
      param: "role",
      component: RoleSelector,
      componentOptions: {
        roleGetter: "getUserRoles"
      }
    },
    {
      id: 5,
      text: "internal_users.filter_advanced_1",
      icon: "filters/sectors",
      param: "agencyId",
      component: AgencySelector
    }
  ],
  textSearch: {
    paramName: "name",
    placeholder: "global.search_user_name"
  }
}