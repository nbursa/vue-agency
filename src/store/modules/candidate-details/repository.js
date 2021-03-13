import { api } from '@/axios'

export const fetchAvailabilitiesByDay = async (dayFormatted) => {
  const res = await api.get(`/calendar/${dayFormatted}`)
  const cellData = res.data.data
  return Promise.resolve(cellData)
}

export const fetchAvailabilities = async ({ range }) => {
  const params = range || null
  const res = await api.get('/calendar', { params })
  const data = res.data.data
  return Promise.resolve(data)
}

export const submit = async (payload) => {
  const res = await api.post(`temps/${payload.userId}/jobs`, payload)
  return res
}
