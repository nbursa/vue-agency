import * as repo from './repository'
import ReportFile from '@/models/ReportFile'

export const updateFieldValue = ({ commit }, field) => {
  commit('UPDATE_FIELD_VALUE', field)
}

export const defineActiveStoreModule = ({ commit }, type) => {
  commit('UPDATE_ACTIVE_MODULE', type)
}

export const setActiveStoreModule = function ({ commit }, subModule) {
  const { type, store } = subModule
  commit('UPDATE_ACTIVE_MODULE', type)
  this.registerModule(['reports', 'reportTable'], store.storeModule)
}

export const destroyActiveStoreModule = function ({ commit }, subModule) {
  commit('UPDATE_ACTIVE_MODULE', null)
  this.unregisterModule(['reports', 'reportTable'])
}

export const generateReport = async (
  { commit },
  { filters, typeOption, reportUrl, columnsUrl } = payload
) => {
  console.log('generate report action: ', {
    filters,
    typeOption,
    reportUrl,
    columnsUrl
  })
  try {
    const response = await repo.fetchReports(filters, reportUrl, columnsUrl)
    const fileSource = {
      file: response.data,
      config: {
        fileType: typeOption
      }
    }
    const reportFile = ReportFile.from(fileSource)
    return Promise.resolve(reportFile)
  } catch (e) {
    console.log(e)
  }
}

export const clearReportFilters = ({ commit }) => {
  commit('CLEAR_REPORT_FILTERS')
}

export const getPayrolls = async ({ commit }, payload) => {
  console.log('action get payrolles: ', payload)
  try {
    const response = await repo.fetchPayrolls(payload)
    // const fileSource = {
    //   file: response.data,
    //   config: {
    //     fileType: typeOption
    //   }
    // }
    // const reportFile = ReportFile.from(fileSource)
    // return Promise.resolve(reportFile)
    commit('SET_PAYROLLS', response.data)
    console.log('getPayrols action: ', response)
    return Promise.resolve(response)
  } catch (error) {
    console.log(error)
  }
}
