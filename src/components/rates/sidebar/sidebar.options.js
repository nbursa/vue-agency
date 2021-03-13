import MarginFilter from '../margin-filter/VMarginFilters'
import { bonuses } from '../bonuses-edit'
import { rates } from '../rates-filter'

let options = {
  rates: [
    {
      label: 'default',
      component: rates.DefaultSidebar
    },
    {
      label: 'edit',
      component: rates.EditRate
    },
    {
      label: 'create',
      component: rates.CreateRate
    }
  ],
  margins: [
    {
      label: 'default',
      component: MarginFilter
    },
    {
      label: 'edit',
      component: MarginFilter
    }
  ],
  bonuses: [
    {
      label: 'default',
      component: bonuses.DefaultSidebar
    },
    {
      label: 'edit',
      component: bonuses.EditBonus
    },
    {
      label: 'create',
      component: bonuses.CreateBonus
    }
  ]
}

export default options
