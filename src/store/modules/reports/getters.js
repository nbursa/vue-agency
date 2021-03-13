import { app } from '../../../main.js' //temp for the demo

const doubleParamQuery = (arr, name) => {
  let result = arr.reduce((acc, item) => {
    acc[name].push({ id: item.id })
  }, {})
  return result
}

export const getQueryFilters = (state) => {
  const queryList = Object.keys(state.filters).reduce((acc, item) => {
    if (state.filters[item] !== null) {
      if (Array.isArray(state.filters[item])) {
        if (item === 'clients') {
          acc[item] = state.filters[item].map((item) => {
            return { id: item.id }
          })
        } else if (item === 'status') {
          acc[item] = state.filters[item]
            .map((item) => {
              return item.status
            })
            .join()
        } else if (item === 'attributeValues') {
          acc[item] = state.filters[item].map((item) => {
            return { id: item.id }
          })
        } else {
          acc[item] = state.filters[item].map((item) => {
            return item.id || item
          })
        }
      } else {
        acc = Object.assign({}, acc, state.filters[item])
      }
    }
    return acc
  }, {})
  return queryList
}

export const getJobStatusList = (state) => {
  const jobStatuses = [
    {
      id: 0,
      status: 'created',
      label: app.$t('jobs.status_created')
    },
    {
      id: 1,
      status: 'accepted',
      label: app.$t('jobs.status_accepted')
    },
    {
      id: 2,
      status: 'pass_on_pending',
      label: app.$t('jobs.status_pass_pending')
    },
    {
      id: 3,
      status: 'swap_pending',
      label: app.$t('jobs.status_swap_pending')
    },
    {
      id: 4,
      status: 'in_progress',
      label: app.$t('jobs.status_inprogress')
    },
    {
      id: 5,
      status: 'sign_off_pending',
      label: app.$t('jobs.status_signoff_pending')
    },
    {
      id: 6,
      status: 'admin_sign_off_pending',
      label: app.$t('jobs.status_admin_sign_off_pending')
    },
    {
      id: 7,
      status: 'invoice_pending',
      label: app.$t('jobs.status_invoice')
    },
    {
      id: 8,
      status: 'arbitration_pending',
      label: app.$t('jobs.status_arbitration')
    },
    {
      id: 9,
      status: 'invoiced',
      label: app.$t('jobs.status_invoiced')
    },
    {
      id: 11,
      status: 'never_filled',
      label: app.$t('jobs.status_never')
    }
  ]
  return jobStatuses
}

export const getPayrolls = (state) => {
  console.log('getter getPayroles reports: ', state.payrolls.data)
  return state.payrolls.data
}
