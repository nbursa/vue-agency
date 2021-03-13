export const getTemplatesFields = ({ templates, job }) => {
  const { clientId, name, is_template } = job
  let clientTemplats = []
  const updateKeys = ['jobType', 'grade', 'agency']

  templates.map((template) => {
    let obj = {}
    Object.keys(template).map((templateKey) => {
      if (templateKey === 'allJobs' && template.allJobs.length > 0) {
        if (template.allJobs[0].client) {
          obj.clientId = template[templateKey][0].client
        }
        if (template.allJobs[0].bonuses) {
          obj.bonuses = template[templateKey][0].bonuses
        }
      } else if (templateKey === 'attributeValues') {
        obj.attributes = template[templateKey]
      } else if (updateKeys.includes(templateKey)) {
        obj[`${templateKey}Id`] = template[templateKey]
      } else {
        obj[templateKey] = template[templateKey]
      }
    })
    if (clientId) {
      if (clientId.id === obj.clientId.id) {
        clientTemplats.push(obj)
      }
    }
  })

  if (name && is_template) {
    clientTemplats.push({ name: name, id: 0 })
  }
  return clientTemplats
}

const isValid = (value) => {
  if (typeof value === Array) {
    return value && value.length > 0 ? true : false
  }

  return value && value != '' ? true : false
}

const isRateOverrideValid = (isChangeable, value) => {
  return isChangeable ? value.margin && value.rate : true
}

export const getClearForm = ({ job }) => {
  return (
    isValid(job.agencyId) ||
    isValid(job.jobTypeId) ||
    isValid(job.clientId) ||
    isValid(job.gradeId) ||
    isValid(job.templates) ||
    isValid(job.attributeValues) ||
    isValid(job.bonuses) ||
    isValid(job.note) ||
    isValid(job.breakMinutes) ||
    isValid(job.isBreakChangeable) ||
    isValid(job.isBreakPayable)
  )
}

export const showTime = (state) => {
  return (
    isValid(state.job.agencyId) &&
    isValid(state.job.jobTypeId) &&
    isValid(state.job.clientId) &&
    isValid(state.job.gradeId)
  )
}

export const getPayRatesTimes = ({ job }, getters, { rates }) => {
  const { clientId } = job

  if (clientId) {
    if (clientId.dayTimes && clientId.dayTimes.length > 0) {
      return clientId.dayTimes
    }
  }

  if (rates.dayTimes.length > 0) {
    return rates.dayTimes
  }
  return null
}

export const getRatesSorted = ({ payRates, job, agency }, getters) => {
  const { agencies } = agency
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Holiday'
  ]
  const defaultDateTimes = getters.getPayRatesTimes
  const ratesArr = Object.keys(payRates)

  const daysArr = days.map((day, i) => {
    let rateObj = {
      dayType: { id: i + 1, name: day }
    }
    // Overrides rates
    if (job.isRateChangeable && job.rateOverride.margin) {
      if (job.paymentType === 1) {
        rateObj = {
          ...rateObj,
          hourlyMargin: job.rateOverride.margin,
          hourlyMarginType: job.rateOverride.type,
          hourlyRate: job.rateOverride.rate
        }
      }
      if (job.paymentType === 2) {
        rateObj = {
          ...rateObj,
          dailyMargin: job.rateOverride.margin,
          dailyMarginType: job.rateOverride.type,
          dailyRate: job.rateOverride.rate
        }
      }
      return rateObj
    }

    // Default rates from agency settings
    return {
      ...rateObj,
      hourlyMargin: job.clientId.hourlyMargin
        ? job.clientId.hourlyMargin
        : agencies[0].hourlyMargin,
      hourlyMarginType: job.clientId.hourlyMarginType
        ? job.clientId.hourlyMarginType
        : agencies[0].hourlyMarginType,
      hourlyRate: job.clientId.hourlyRate
        ? job.clientId.hourlyRate
        : agencies[0].hourlyRate,
      dailyMargin: job.clientId.dailyMargin
        ? job.clientId.dailyMargin
        : agencies[0].dailyMargin,
      dailyMarginType: job.clientId.dailyMarginType
        ? job.clientId.dailyMarginType
        : agencies[0].dailyMarginType,
      dailyRate: job.clientId.dailyRate
        ? job.clientId.dailyRate
        : agencies[0].dailyRate
    }
  })

  const ratesClone = {}
  // If rates are set for dayType
  if (ratesArr.length > 0) {
    for (let i = 0; i < ratesArr.length; i++) {
      const ratesSet = [...payRates[ratesArr[i]]].filter(
        ({ hourlyMargin, dailyMargin }) =>
          (job.paymentType === 1 && hourlyMargin > 0) ||
          (job.paymentType === 2 && dailyMargin > 0)
      )
      const ratesCombined = daysArr.map((rate) => {
        const rateFound = ratesSet.find(
          ({ dayType }) => dayType.id === rate.dayType.id
        )
        if (rateFound && !(job.isRateChangeable && job.rateOverride.margin))
          return rateFound
        return rate
      })

      ratesClone[ratesArr[i]] = ratesCombined
    }
    return ratesClone
  }

  for (let i = 0; i < defaultDateTimes.length; i++) {
    ratesClone[defaultDateTimes[i].id] = daysArr
  }
  return ratesClone
}

export const getCandidates = ({ candidates, candidatesSearch }) => {
  if (candidatesSearch) {
    return candidates.filter(
      ({ firstName, lastName }) =>
        `${firstName} ${lastName}`
          .toLowerCase()
          .indexOf(candidatesSearch.toLowerCase()) > -1
    )
  }
  return candidates
}
