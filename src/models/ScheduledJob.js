class ScheduledJob {
  constructor({
      jobId = '',
      status = '',
      date = '',
      startTime = '',
      endTime = '',
      client = '',
      candidate = '' ,
      jobType = ''
    } = {})  {
          this.jobId = jobId
          this.status = status
          this.date = date
          this.startTime = startTime
          this.endTime = endTime
          this.client = client
          this.candidate = candidate
          this.jobType = jobType
        }
}

export default ScheduledJob