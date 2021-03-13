import CRatesInterface from "./CRatesInterface"
import CMarginsInterface from "./CMarginsInterface"
import CBonusesInterface from "./CBonusesInterface"

export default [{
    path: "/rates-current",
    name: "rate-current",
    component: CRatesInterface,
    meta: {
      caption: "rates",
      resource: "PayRate"
    }
  },
  {
    path: "/rates-scheduled",
    name: "rate-scheduled",
    component: CRatesInterface,
    meta: {
      caption: "rates",
      resource: "PayRate"
    }
  },
  {
    path: "/rates-margins",
    name: "rate-margins",
    component: CMarginsInterface,
    meta: {
      caption: "rates",
      resource: "PayRate"
    }
  },
  {
    path: "/bonuses",
    name: "bonuses",
    component: CBonusesInterface,
    meta: {
      caption: "bonuses"
    }
  }
]