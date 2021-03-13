const navTabs = {
  tabbedNav: [
    {
      id: 1,
      label: "rates.filter_tab_0",
      url: "/rates-current",
      slug: {
        path: "/rates-current"
      }
    },
    // {
    //   id: 2,
    //   label: "rates.filter_tab_1",
    //   url: "/rates-scheduled",
    //   slug: {
    //     path: "/rates-scheduled"
    //   }
    // },
    // {
    //   id: 3,
    //   label: "rates.filter_tab_2",
    //   url: "/rates-margins",
    //   slug: {
    //     path: "/rates-margins"
    //   }
    // },
    {
      id: 4,
      label: "rates.filter_tab_3",
      url: "/bonues",
      slug: {
        path: "/bonuses"
      }
    }
  ]
}

const rateTabs = {
  ...navTabs,
  rateSwitcher: {
    tableMode: "hourly"
  }
}

const bonusTabs = {
  ...navTabs,
  textSearch: {
    placeholder: "global.search_bonus_name",
    paramName: "name"
  }
}

export {
  navTabs,
  rateTabs,
  bonusTabs
}