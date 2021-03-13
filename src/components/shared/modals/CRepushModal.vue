<template lang="pug">
transition(name="modal")
  .modal-background
    .modal-container(v-click-outside="closeModal")
      a.close(@click="close")
        svgicon.icon(
          name='global/close'
          :width="'29'"
          :height="'29'"
          :fill='false'
        )
      div.v-table-content__loader(v-if="spinner")
        half-circle-spinner(
          :animation-duration="1500"
          :size="50"
          :color="$colorMap.primary"
          )
      div.repush
        h2.repush-title {{ $t("modal_repush.modal_title") }}
        div.repush-list
          div.repush-list-header
            div.id Id
            div.status Status
            div.date {{ $t("modal_repush.header_date") }}
            div.time {{ $t("modal_repush.header_time") }}
            div.client {{ $t("modal_repush.header_client") }}
            div.type {{ $t("modal_repush.header_type") }}
            div.pushed {{ $t("modal_repush.header_pushed") }}
          div.repush-list-content
            div.list-item(v-for="(item, i) in sortedJobsById" :key="i")
              div.id {{ item.id }}
              div.status {{ item.status.name }}
              div.date {{ formatDate(item.startTime.split(" ")[0]) }}-{{ formatDate(item.endTime.split(" ")[0]) }}
              div.time {{ item.startTime.split(" ")[1].slice(0, -3) }}-{{ item.endTime.split(" ")[1].slice(0, -3) }}
              div.client {{ item.client }}
              div.type {{ item.type }}
              div.pushed {{ item.timesPushed }}
        div.repush-footer
          span.error(v-if="errors") {{ errors }}
          base-button(v-if="!errors" @click="repush") {{ $t("modal_repush.repush_label") }}
          base-button(class="cancel-btn" @click="close") {{ $t("modal_repush.cancel_label") }}

      
</template>

<script>
import ClickOutside from "vue-click-outside"
import { mapGetters, mapActions, mapState } from "vuex"
import { HalfCircleSpinner } from "epic-spinners"
import BaseButton from '@/components/shared/base-components/BaseButton'
import _ from 'lodash'
import { errorDefaults, successDefaults } from "@/config/notifications"
import DateTimeUtils from "@/utils/dateUtils.js"

export default {
  components: {
    BaseButton,
    HalfCircleSpinner
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      spinner: false,
      requestId: null,
      jobs: [],
      errors: ''
    }
  },
  computed: {
    ...mapGetters("modals", ["modalData"]),
    sortedJobsById: function() {
      return _.orderBy(this.jobs, 'id')
    },
  },
  created() {
    this.spinner = true
    this.fetchRequestId(this.modalData)
  },
  methods: {
    ...mapActions("modals", ["closeModal"]),
    ...mapActions("jobManagement", ["fetchJobForRepush", "fetchJobRequest", "getJobsByRequestId", "repushJobs"]),
    formatDate(date) {
      return DateTimeUtils.getDateFromSQL(date)
    },
    fetchRequestId(id) {
      let jobId = id
      let withLocation = false
      return this.fetchJobRequest({ jobId, withLocation })
        .then(id => {
          this.requestId = id
          this.fetchData(this.requestId)
        })
    },
    fetchData(id) {
      this.getJobsByRequestId(id)
        .then(jobs => {
          jobs.map(job => {
            this.fetchJobForRepush(job.id)
              .then(data => {
                job.client = data.client.name
                job.timesPushed = data.jobRequest.timesPushed
                job.type = data.jobRequest.jobType.name
                this.jobs.push(job)
              })
          })
          this.spinner = false
        })
    },
    close() {
      this.closeModal()
    },
    repush() {
      this.repushJobs(this.requestId)
        .then(() => {
          const msg = this.$merge(successDefaults, {
            group: "foo",
            text: this.$t("modal_repush.success_message")
          })
          this.$notify(msg)
          if(!this.errors) this.close()
        })
        .catch(err => {
          this.errors = err.data.message
          const msg = this.$merge(errorDefaults, {
            group: "foo",
            text: this.errors
          })
          this.$notify(msg)
        })
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';

.modal-container {
  width 100%
  height auto
  max-width 70%
  max-height 455px
  margin 0 auto
  background-color $white
  margin-top 15%
  border-radius 9px
  box-shadow 0 2px 15px 0 rgba(0, 0, 0, 0.14)
  position relative
  display flex
  font-weight 700
  padding 20px
  z-index 1

  .close {
    height 29px
    width 29px
    border-radius 50px
    position absolute
    right -15px
    top -15px
    background-color $white
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, 0.17)

    .icon {
      color #333
    }
  }

  .v-table-content__loader {
    top 0
    left 0
    z-index 11
    border-radius 9px
    pointer-events none
  }

  .repush {
    width 100%
    position relative
    display flex
    flex-direction column
    hr {
      margin 20px 0
    }
    &-title {
      font-size 1.5rem
      font-weight bold
      padding-bottom 20px
      line-height 1
      flex 0 1 auto
    }
    &-list {
      display flex
      flex-direction column
      justify-content flex-start
      flex 1 1 auto
      margin-bottom 20px
      overflow hidden
      &-header {
        display flex
        text-transform uppercase
        padding 0
        background-color #f3f6f7
        .id, 
        .status,
        .date,
        .time,
        .client,
        .type,
        .pushed {
          flex auto 
          font-size 12px 
          height 30px 
          display flex 
          justify-content center 
          align-items center 
          text-align center
        }
        .id {
          flex 1
        }
        .status {
          flex 1
        }
        .date {
          flex 3
        }
        .time {
          flex 2
        }
        .client {
          flex 2
        }
        .type {
          flex 2
        }
        .pushed {
          flex 1
        }
      }
      &-content {
        overflow hidden
        overflow-y auto
        .list-item {
          display flex
          text-align center
          border-bottom 1px solid #dbdbdb
          padding 10px 0
          &:last-child {
            border-bottom 0
          }
          .id {
            flex 1
          }
          .status {
            flex 1
          }
          .date {
            flex 3
          }
          .time {
            flex 2
          }
          .client {
            flex 2
          }
          .type {
            flex 2
          }
          .pushed {
            flex 1
          }
        }
      }
    }
    &-footer {
      width 100%
      flex 0 1 auto
      display flex
      justify-content space-between
      align-items center
      .cancel-btn {
        background-color #fff
        color $primary
        background-image none
      }
      .error {
        color red
        font-weight 400
      }
    }
  }
}

.modal-enter {
  opacity 0
}

.modal-leave-active {
  opacity 0
}
</style>


