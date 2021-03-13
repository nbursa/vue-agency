import { api } from '@/axios'

export const fetchTemplates = async () => {
  try {
    const response = await api.get(
      '/job-requests?response_type=all&include=jobType,grade,allJobs.client,attribute_values,allJobs.bonuses,agency'
    )
    return response.data
  } catch (e) {
    console.log({ e })
  }
}

export const fetchPayRates = async (params) => {
  const response = await api.get('/pay-rates', {
    params: {
      page: 1,
      orderBy: 'id',
      include: 'client.day_times',
      ...params
    }
  })
  return response.data
}

export const getCandidates = async (params) => {
  try {
    const response = await api.post(
      '/jobs/temps?include=jobTypes.grade',
      params
    )
    return response.data
  } catch (e) {
    return e
  }
}

export const submitJobRequest = async (job) => {
  try {
    const response = await api.post('/job-requests?include=users', job)
    return response.data
  } catch (e) {
    return e
  }
}

export const deleteTemplate = async (id) => {
  try {
    const response = await api.put(`/job-requests/${id}`, { name: null })
    return response.data
  } catch (e) {
    return e
  }
}
