import {
  fetchTemplates,
  fetchPayRates,
  getCandidates,
  submitJobRequest,
  deleteTemplate
} from './repository'

export const getTemplates = async ({ commit }) => {
  const { data } = await fetchTemplates()
  commit('GET_JOB_TEMPLATES', data)
}

export const updateFieldValue = ({ commit }, field) => {
  commit('UPDATE_FIELD_VALUE', field)
}

export const setJobTabs = ({ commit }) => {
  commit('SET_JOBS')
}

export const resetGeneratedJobs = ({ commit }) => {
  commit('RESET_GENERATED_JOBS')
}

export const resetJob = ({ commit }, options) => {
  commit('RESET_JOB')
}

export const getJobPayRates = async ({ commit }, options) => {
  try {
    const { data } = await fetchPayRates(options)
    commit('DISPLAY_RATES', true)
    commit('SET_JOB_RATES', data)
  } catch (e) {
    if (e.status === 403) {
      commit('DISPLAY_RATES', false)
    }
  }
}

export const findCandidates = async ({ commit }, params) => {
  commit('SET_CANDIDATES', [])
  const { data } = await getCandidates(params)
  if (data && data.length > 0) {
    commit('SET_CANDIDATES', data)
    if (params.sendType === 2) commit('SET_GROUPS', true)
    commit('SET_ERRORS', [])
  } else {
    commit('SET_ERRORS', ['No data, change search'])
  }
}

export const saveJob = async ({ commit }, params) => {
  commit('SET_STATUS', false)
  const { data } = await submitJobRequest(params)
  if (data && !data.errors) {
    commit('RESET_JOB')
    commit('SET_STATUS', true)
  } else {
    const errors = data.errors ? data.errors : ['Something went wrong']
    commit('SET_ERRORS', errors)
  }
}

export const filterCandidates = ({ commit }, term) => {
  commit('FILTER_CANDIDATES', term)
}

export const setGroups = ({ commit }, set) => {
  commit('SET_GROUPS', set)
}

export const updateGroups = ({ commit }, data) => {
  commit('UPDATE_GROUPS', data)
}

export const removeTemplate = async ({ commit, dispatch }, { template }) => {
  const { data } = await deleteTemplate(template.id)

  if (data && !data.errors) {
    Object.keys(template.raw).map((key) => {
      const resetVal = key === 'bonuses' || key === 'attributes' ? [] : null
      let keyVal = key === 'attributes' ? 'attributeValues' : key
      if (keyVal !== 'clientId')
        dispatch('updateFieldValue', { [keyVal]: resetVal })
      dispatch('updateFieldValue', { templates: null })
    })
    commit('REMOVE_TEMPLATE', template)
  } else {
    const errors = data.errors ? data.errors : ['Something went wrong']
    commit('SET_ERRORS', errors)
  }
}
