import * as repository from "./repository.js"
import dateUtils from '@/utils/dateUtils'


export const getCandidateWorklog = async ({
    commit
  }, options) => {
    try {
      commit("UPDATE_STATUS", true)
      const formatedOptions = options.users ? Object.assign({}, options, {
        users: options.users.map(i => {
          return {
            "id": i
          }
        })
      }) : options
      const candidateWorklog = await repository.all(formatedOptions)
        .then(res => {
          res.data.map(item => {
            let startDate = dateUtils.getDateFromSQL(item.job.startTime.split(' ')[0]),
            startTime = dateUtils.getTimeFromSQL(item.job.startTime.split(' ')[1]),
            endDate = dateUtils.getDateFromSQL(item.job.endTime.split(' ')[0]),
            endTime = dateUtils.getTimeFromSQL(item.job.endTime.split(' ')[1])
            item.times = `${startDate} ${startTime} - ${endDate} ${endTime}`
            let string = ''
            item.job.user.attributeValues && item.job.user.attributeValues.forEach(value => {
              string += value.value + ', '
            })
            item.attrs = string.substring(0, string.length - 2)
            item.candidateName = item.job.user.firstName + ' ' + item.job.user.lastName
            item.breakTime = item.job.breakMinutes
            item.clientName = `${item.job.client.name}`
          })
          return res
        })
      commit("UPDATE_CANDIDATE_WORKLOG", candidateWorklog)
      commit("UPDATE_META_DATA", candidateWorklog.meta)
      commit("UPDATE_STATUS", false)
    } catch (e) {
      console.log(e)
      commit("SET_ERRORS", e)
    }
  }