import ChargeTotal from './rates-table/VChargeTotal'
import RateEdit from './rates-table/VRateEdit'

const current = [
  {
    hideCell: 'dayType',
    show: 'dayType.name',
    label: 'rates.table_column_0'
  },
  {
    hideCell: 'dayTime',
    show: 'dayTime.name',
    label: 'rates.table_column_1'
  },
  {
    hideCell: 'jobType',
    show: 'jobType.name',
    label: 'rates.table_column_2'
  },
  {
    hideCell: 'area',
    show: 'area.name',
    label: 'rates.table_column_3'
  },
  {
    hideCell: 'grade',
    show: 'grade.name',
    label: 'rates.table_column_4'
  },
  {
    hideCell: 'client',
    show: 'client.name',
    label: 'rates.table_column_7'
  }
]

const scheduled = [
  {
    show: 'dayType.name',
    label: 'rates.table_column_0'
  },
  {
    show: 'dayTime.name',
    label: 'rates.table_column_1'
  },
  {
    show: 'jobType.name',
    label: 'rates.table_column_2'
  },
  {
    show: 'area.name',
    label: 'rates.table_column_3'
  },
  {
    show: 'grade.name',
    label: 'rates.table_column_4'
  }
]

const rateCols = {
  internal: {
    margin: 'table_column_8',
    pay: 'table_column_9',
    charge: 'table_column_10'
  },
  get hourly() {
    return {
      current: [
        {
          component: RateEdit,
          config: 'hourlyRate',
          label: `rates.${this.internal.pay}.hourly`
        },
        {
          component: RateEdit,
          config: { key: 'hourlyMargin', mode: 'margin' },
          label: `rates.${this.internal.margin}.hourly`
        },
        {
          component: ChargeTotal,
          label: `rates.${this.internal.charge}.hourly`
        }
      ],
      scheduled: [
        {
          component: RateEdit,
          config: 'scheduledHourlyRate',
          label: `rates.${this.internal.pay}.hourly`
        },
        {
          component: RateEdit,
          config: { key: 'scheduledHourlyMargin', mode: 'margin' },
          label: `rates.${this.internal.margin}.hourly`
        },
        {
          component: ChargeTotal,
          label: `rates.${this.internal.charge}.hourly`
        }
      ]
    }
  },
  get daily() {
    return {
      current: [
        {
          component: RateEdit,
          config: 'dailyRate',
          label: `rates.${this.internal.pay}.daily`
        },
        {
          component: RateEdit,
          config: { key: 'dailyMargin', mode: 'margin' },
          label: `rates.${this.internal.margin}.daily`
        },
        {
          component: ChargeTotal,
          label: `rates.${this.internal.charge}.daily`
        }
      ],
      scheduled: [
        {
          component: RateEdit,
          config: 'scheduledDailyRate',
          label: `rates.${this.internal.pay}.daily`
        },
        {
          component: RateEdit,
          config: { key: 'scheduledDailyMargin', mode: 'margin' },
          label: `rates.${this.internal.margin}.daily`
        },
        {
          component: ChargeTotal,
          label: `rates.${this.internal.charge}.daily`
        }
      ]
    }
  }
}

const marginCols = {
  get hourly() {
    return [
      {
        component: RateEdit,
        config: {
          key: 'hourlyMargin',
          storeAction: 'margins/updateTableItem',
          mode: 'margin'
        },
        label: `rates.table_column_8.hourly`,
        width: 0.4
      }
    ]
  },
  get daily() {
    return [
      {
        component: RateEdit,
        config: {
          key: 'dailyMargin',
          storeAction: 'margins/updateTableItem',
          mode: 'margin'
        },
        label: `rates.table_column_8.daily`,
        width: 0.4
      }
    ]
  }
}

const margins = [
  {
    show: 'jobType.name',
    label: 'rates.table_column_2'
  },
  {
    show: 'client.name',
    label: 'rates.table_column_7'
  },
  {
    show: 'grade.name',
    label: 'rates.table_column_4'
  }
]

const bonuses = [
  {
    show: 'name',
    label: 'rates.table_column_bonus_0',
    width: 3
  },
  {
    component: RateEdit,
    config: {
      key: 'amount',
      typeSuffix: 'Unit',
      storeAction: 'bonuses/updateTableItem',
      mode: 'margin'
    },
    label: 'rates.table_column_bonus_1',
    width: 0.5
  },
  {
    component: RateEdit,
    config: {
      key: 'margin',
      typeSuffix: 'Unit',
      storeAction: 'bonuses/updateTableItem',
      mode: 'margin'
    },
    label: 'rates.table_column_bonus_2',
    width: 0.5
  }
]

export default {
  current,
  scheduled,
  margins,
  rateCols,
  marginCols,
  bonuses
}
