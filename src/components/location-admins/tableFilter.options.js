import { RoleSelector } from '@/components/shared/selectors'

export default {
  localSearch: {},
  tabbedNav: [
    {
      id: 1,
      label: 'client_locations.filter_tab_0',
      url: '/clients',
      slug: {
        path: '/clients'
      }
    },
    {
      id: 2,
      label: 'client_locations.filter_tab_1',
      url: '/client-admins',
      slug: {
        path: '/client-admins'
      }
    }
  ],
  advancedSearch: [
    {
      id: 3,
      text: 'internal_users.filter_advanced_0',
      icon: 'filters/role',
      param: 'role',
      component: RoleSelector,
      componentOptions: {
        roleGetter: 'getClientAdminRoles'
      }
    }
  ],
  textSearch: {
    paramName: 'name',
    placeholder: 'global.search_client_admin'
  },
  clientSearch: {
    paramName: 'clients',
    placeholder: 'global.search_client_name',
    selectorOptions: { valueFormat: 'id' }
  }
}
