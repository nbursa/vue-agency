import { api } from '@/axios'
import qs from 'qs'

export const fetchReports = (query, reportUrl, columnsUrl) => {
  let tempQuery = Object.assign({}, query)
  delete tempQuery.fileType
  return api
    .get(
      `${reportUrl}/${query.fileType}?fields=temp_name,earnings,break,hourly_worked,hourly_rate,hourly_charge_rate${columnsUrl}`,
      {
        params: tempQuery,
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf'
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { encode: false })
        }
      }
    )
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch((e) => {
      console.log(e)
    })
}

export const fetchPayrolls = (query) => {
  return api
    .get('/reports/payroll', query)
    .then((data) => {
      console.log('data: ', data)
      return Promise.resolve(data)
    })
    .catch((error) => console.log(error))
}
