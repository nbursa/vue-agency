<template lang="pug">
  perfect-scrollbar.client-worker-cell
    div.candidate-card(v-for="worker in workers") 
      div.image
        img(:src="worker.image" v-if="worker.image")
        p.placeholder(v-if="!worker.image && worker") {{ `${worker.firstName.charAt(0) }${ worker.lastName.charAt(0) }` }}
      div.details(v-if="worker")
        p.name
          span {{ `${ worker.firstName } ${ worker.lastName }` }}
        p
          span {{ worker.jobType }}
        p
          span {{worker.startTime}} - {{worker.endTime}}
</template>

<script>
import DateTimeUtils from "@/utils/dateUtils.js"


export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    schedulerInterval: {
      type: String,
      required: false,
      default: "week"
    }
  },
  computed: {
    workers() {
      return this.data.jobs.reduce((acc, job) => {
        let worker = {
          firstName: job.user.firstName,
          lastName: job.user.lastName,
          startTime: DateTimeUtils.getTimeFromSQL(job.startTime),
          endTime: DateTimeUtils.getTimeFromSQL(job.endTime),
          image: job.user.image,
          jobType: job.jobRequest.jobType.name
        }
        acc.push(worker)
        return acc
      }, [])
    }
  }
}
</script>

<style lang="stylus" scoped>
.client-worker-cell {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.candidate-card {
  margin: 4px 6px 4px 4px;
  flex-basis: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 70px;
  border: 1px solid #C9D0D4;
  padding: 7px;
  border-radius: 5px;
  display: inline-block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  &:hover {
    background-color: #5E85FF;
    transition: background-color 200ms linear;
    p {
      span {
        color: white;
      }
    }
  }

  >.image {
    display: flex;
    align-items: center;
    flex: 0 0 30%;

    .placeholder {
      margin-right: 10px;
      font-size: 1em;
      background-color: #f2f4f7;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border-radius: 50%;
      height: 45px;
      width: 45px;
      max-width: 45px;
    }

    img {
      width: 45px;
      max-width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 10px;
    }

    span {
      display: block;

      &:first-child {
        color: #444444;
        font-size: 1em;
      }

      &:last-child {
        color: #9B9B9B;
        font-size: 0.875em;
        line-height: 1.188em;
      }
    }
  }

  .details {
    flex: 0 0 70%;
    span,p {
      line-height: 18px;
      font-size: 14px;
    }
  }

  
  .name {
    span {
      font-weight: bold;
      font-size: 16px;  
    }
  }

}
</style>