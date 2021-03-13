<template lang="pug">
.accept-jobs
  .title(v-if="jobs.length") Job requests
  .errors(v-if="errors.length") Errors:
    .error(v-for="(e, i) in errors" :key="i") 
      .error-item(v-for="(v, k) in e" :key="v")
        .item {{k}}: {{v}}
  .jobs(v-if="jobs.length")
    .card(
      v-if="!message && !expired"
    )
      .card-header
        .card-header-icon 
          svgicon(
            :name="`job-schedule/jobs-normal`",
            :original="true",
            :width="'40'",
            :height="'40'"
          )
        .card-header-content
          .card-header-content__title {{ jobRequest.jobType.name }}
          .card-header-content__client {{ jobRequest.agency.name }}
          .card-header-content__type
            svgicon(
              v-if="jobRequest.jobs.length > 1"
              name="sidebar-menu-new/doc-compliance",
              :fill="false",
              ref="svgicon",
              :original="true",
              color="gray"
            )
            .text {{ jobRequest.jobs.length === 1 ? "" : "Multiple" }} {{ jobRequest.requestType === 1 ? jobRequest.jobs.length > 1 ? "- Separate jobs" : "" : "- Linked jobs" }}
      .card-body.linked(v-if="[1, 2].includes(jobRequest.requestType) && jobs.length > 1")
        .list-item(
          v-for="(shift, i) in jobs",
          :key="i",
          @click="jobRequest.requestType === 1 ? select(shift) : null"
          :class="[{ selected: jobRequest.requestType === 1 && selectedShifts.includes(shift) }, { connected: jobRequest.requestType === 2 }]"
        )
          .text {{ formatedDate(shift.startTime.split(' ')[0]) }} - {{ formatedDate(shift.endTime.split(' ')[0]) }} | {{ shift.startTime.split(' ')[1].slice(0, -3) }} - {{ shift.endTime.split(' ')[1].slice(0, -3) }}
      .result(v-if="jobs.length && selectedShifts.length") 
        | Selected jobs:
        .result-item(v-for="item in selectedShifts" :key="item.id") 
          | Id: {{ item.id }} ({{ formatedDate(item.startTime.split(' ')[0]) }} - {{ formatedDate(item.endTime.split(' ')[0]) }} | {{ item.startTime.split(' ')[1].slice(0, -3) }} - {{ item.endTime.split(' ')[1].slice(0, -3) }})
      .card-body(v-if="jobRequest.requestType === 1 && jobs.length === 1")
        .item Start Date:
          .text {{ formatedDate(jobs[0].startTime.split(' ')[0]) }}
        .item End Date:
          .text {{ formatedDate(jobs[jobs.length - 1].endTime.split(' ')[0]) }}
        .item Start - End Time:
          .text {{ jobs[0].startTime.split(' ')[1].slice(0, -3) }} - {{ jobs[jobs.length - 1].endTime.split(' ')[1].slice(0, -3) }}
      .card-footer
        button.btn.accept(@click="accept") Accept
        button.btn.reject(@click="reject") Reject
  .expired.center(v-if="expired") 
    .title Job request has expired. 
    .small Job request id: {{expiredJobId}}
  .message.center(v-if="message") 
    .text {{ message }}
    button.clear(@click.prevent="clearMessage") Clear
</template>

<script>
import { DateTime } from "luxon"
import "@/compiled-icons/notifications"
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      message: "",
      selectedShifts: [],
      jobs: [],
      expired: false,
      expiredJobId: null
    }
  },
  computed: {
    ...mapState("smsRequest", ["token", "email", "errors", "jobRequest"]),
    routeToken: function () {
      return this.$route.params.token || null
    },
    routeEmail: function () {
      return this.$route.query.email || null
    },
  },
  watch: {
    "jobRequest": function(val) {
      if (val.jobs.length) {
        return this.jobs = val.jobs
      }
      this.expiredJobId = val.id
      this.expired = true
    }
  },
  mounted() {
    this.mountJobs()
  },
  methods: {
    ...mapActions("smsRequest", ["getJobRequest", "acceptJobs", "rejectJobs"]),
    formatedDate(d) {
      return DateTime.fromSQL(d).toFormat("dd.MM.yyyy.")
    },
    mountJobs() {
      if (this.routeToken && this.routeEmail)
        return this.getJobRequest({ token: this.routeToken, email: this.routeEmail })
    },
    accept() {
      let options = {
        requestId: this.jobRequest.id, 
        email: this.routeEmail
      }
      if (this.jobRequest.requestType !== 1 || this.jobRequest.requestType === 1 && this.jobs.length === 1) {
        let lineGroups = []
        lineGroups.push(this.jobs[0].lineGroup.toString())
        options.lineGroups = lineGroups
        this.acceptJobs(options)
        this.message = `You have accepted job id: ${this.jobs[0].id + " " + lineGroups}.`
        this.selectedShifts = []
        return
      }
      if (!this.selectedShifts.length) {
        return this.message = "Please select at least one shift to accept or reject."
      }
      options.lineGroups = this.selectedShifts.map(shift => shift.lineGroup.toString())
      this.acceptJobs(options)
      this.message = `You have accepted jobs with ids: ${this.selectedShifts.map(shift => shift.id + " " + shift.lineGroup)}`
      this.selectedShifts = []
      return 
    },
    reject() {
      let options = {
        requestId: this.jobRequest.id,
        email: this.routeEmail
      }
      this.rejectJobs(options)
      this.message = "You have rejected job id " + this.jobRequest.id + "."
      this.selectedShifts = []
    },
    select(item) {
      this.selectedShifts.includes(item)
        ? (this.selectedShifts = this.selectedShifts.filter(
            (shift) => shift !== item
          ))
        : this.selectedShifts.push(item)
    },
    clearMessage() {
      this.message = ''
      this.mountJobs()
    }
  },
}
</script>

<style lang="stylus" scoped>
.accept-jobs {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;

  .jobs {
    min-width: calc(100% - 20px);
  }

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .title,
  .small {
    text-align: center;
  }

  .title, .intro {
    margin-bottom: 20px;
  }

  .errors {
    color: red;
    text-align: center;
  }

  .message {
    text-align: center;

    .text {
      font-weight: bold;
      font-size: 18px;
    }

    .clear {
      margin-top: 20px;
      cursor: pointer;
    }
  }

  .expired {
    
  }

  .card {
    border-radius: 5px;
    margin: 0 auto 20px;

    &-header, &-body, &-footer {
      padding: 10px 20px;
    }

    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-header {
      border-bottom: 1px solid #dbdbdb;

      &-icon {
        padding: 0;
      }

      &-content {
        margin-left: 20px;

        &__title {
          font-weight: 700;
        }

        &__type {
          display: flex;
          align-items: center;
          opacity: 0.75;

          .text {
            margin-left: 10px;
          }
        }
      }
    }

    &-body {
      position: relative;

      &.linked {
        padding-left: 35px;

        .list-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 10px 0;
          position: relative;

          &.selected,
          &.connected {
            &:before {
              background: #66f;
            }
          }

          &.connected {
            &:not(:last-child) {
              &:after {
                content: '';
                width: 3px;
                display: block;
                background: lighten(blue, 40%);
                position: absolute;
                left: 8.5px;
                z-index: 1;
                top: calc(50% + 10px);
                height: 100%;
              }
            }
            & > .text {
              &:hover {
                background: white;
                cursor: default;
              }
            }
          }

          &:before {
            content: '';
            width: 20px;
            min-width: 20px;
            height: 20px;
            border-radius: 50%;
            z-index: 2;
            padding: 3px;
            background: white;
            border: 3px solid lighten(blue, 40%);
          }

          .text {
            margin-left: 25px;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;

            &:hover {
              background: lighten(black, 90%);
            }
          }
        }
      }

      .item {
        display: flex;
        margin-left: 50px;
        padding: 5px 10px;
        font-weight: bold;

        @media screen and (max-width: 450px) {
          margin-left: 10px;
        }

        .text {
          margin-left: 20px;
          font-weight: normal;
        }
      }
    }

    .result {
      padding: 20px;
    }

    &-footer {
      .btn {
        font-size: 18px;
        border: none;
        padding: 10px 20px;
        outline: none;
        cursor: pointer;
        background: none;
        font-weight: 700;

        &:hover {
          font-weight: bold;
        }

        &.accept {
          color: blue;
        }

        &.reject {
          color: red;
        }
      }
    }
  }
}
</style>