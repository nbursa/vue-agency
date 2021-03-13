export default {
  presetFilters: [
    {
      id: 1,
      label: "client_locations.filter_tab_0",
      url: "/clients",
      slug: { path: "/clients" }
    },
    {
      id: 2,
      label: "client_locations.filter_tab_1",
      url: "/client-admins",
      slug: { path: "/client-admins" }
    }
  ],
  typeSwitcher: {
    paramName: "type",
    values: ["holiday", "sick-leave"]
  }
}
