<template lang="pug">
  div.client-workers-modal
    header
      h2 {{ $t("jobs_sidebar.working_candidates") }}
    section.client-workers-modal__candidate-list
      div(v-if="workingCandidates.length !== 0")
        v-error-strip.client-workers-modal__error-strip(
          v-show="localError.message"
          :localError="localError"
        )
        div.client-workers-modal__title-bar
          .spacer-left
          p {{ $t('jobs_sidebar.input_jobtype') }}
          p {{ $t('jobs_sidebar.startTime') }}
          p {{ $t('jobs_sidebar.endTime') }}
        div.client-workers-modal__container(v-bar="{}")
            ul
              li(v-for="candidate in workingCandidates")
                div.client-workers-modal__candidate
                  div.name
                    img(:src="candidate.image" v-if="candidate.image")
                    p.placeholder(v-if="!candidate.image && candidate") {{ `${candidate.firstName.charAt(0) }${ candidate.lastName.charAt(0) }` }}
                    p
                      span {{ `${candidate.firstName } ${ candidate.lastName }` }}
                  div.time
                    span {{candidate.jobType}}
                  div.time
                    span {{candidate.startTime}}
                  div.time
                    span {{candidate.endTime}}
      div(v-if="workingCandidates.length === 0 && !loadingStatus")
        p.client-workers-modal__no-workers {{ $t('jobs_sidebar.no_workers')}}

      div.client-workers-modal__loader(v-if="loadingStatus")
        half-circle-spinner.spinner(
          :animation-duration="800"
          :size="50"
          :color="$colorMap.primary"
        )
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DateTimeUtils from '@/utils/dateUtils.js'
import { HalfCircleSpinner } from 'epic-spinners'
import VErrorStrip from '@/components/shared/error-strip/VErrorStrip'

export default {
  components: {
    VErrorStrip,
    HalfCircleSpinner
  },
  inject: ['options'],
  data() {
    return {}
  },
  computed: {
    ...mapState('clientSchedule', [
      'workers',
      'candidateStatus',
      'candidateError'
    ]),
    workingCandidates() {
      return this.workers.jobs
        ? this.workers.jobs.map((job) => {
            let userObject = {
              image: null,
              firstName: this.$t('jobs_sidebar.no_candidates_name'),
              lastName: this.$t('jobs_sidebar.no_candidates_last_name'),
              jobType: job.jobRequest.jobType.name,
              startTime: DateTimeUtils.getCalendarFormat(job.startTime),
              endTime: DateTimeUtils.getCalendarFormat(job.endTime)
            }
            if (job.user) {
              userObject = {
                ...userObject,
                image: job.user.image,
                firstName: job.user.firstName,
                lastName: job.user.lastName,
                jobType: job.jobRequest.jobType.name
              }
            }
            return userObject
          })
        : []
    },
    loadingStatus() {
      return this.candidateStatus
    },
    localError() {
      return {
        message: this.candidateError.error
      }
    }
  },
  mounted() {
    this.getClientWorkers({ id: this.options.modalData.clientId, query: '' })
  },
  methods: {
    ...mapActions('clientSchedule', ['getClientWorkers'])
  }
}
</script>

<style lang="stylus" scoped>
$sectionPadding = 20px
$modalHeight = 415px

.client-workers-modal
  width 100%
  &__error-strip
    padding-bottom 25px
  &__title-bar
    display flex
    align-items center
    justify-content space-between
    padding 10px 30px 10px 0px
    >.spacer-left
      flex 0 0 35%
    >.spacer-right
      flex 0 0 5%
    >p
      flex 0 0 19%
      font-size 0.75em
  &__no-workers
    text-align center
    margin-right 20px
    margin-top 50px
  header
    padding 20px
    border-bottom 1px solid #dfe2e3
    h2
      color #444444
  section
    padding-left $sectionPadding
    position relative
    height 100%

    ul
      overflow-y auto
  &__loader
    position absolute
    width 100%
    height $modalHeight
    display flex
    justify-content center
    align-items center
    top 0
    left 0
    background rgba(255, 255, 255, 0.6)

    .spinner
      margin 0 auto
      margin-top -25px
  &__container
    height 360px
  &__candidate
    padding-bottom 15px
    padding-right 20px
    display flex
    justify-content space-between
    align-items center
    >.active
      width 16px
      height 16px
      border-radius 50%
      background #21DC12
      margin-right 9px
      margin-left 7px
    >.name
      display flex
      align-items center
      flex 0 0 35%
      .placeholder
        margin-right 10px
        font-size 1em
        background-color #f2f4f7
        display flex
        align-items center
        justify-content center
        font-weight 600
        border-radius 50%
        height 45px
        width 45px
        max-width 45px
      img
        width 45px
        max-width 45px
        height 45px
        border-radius 50%
        margin-right 10px
      span
        display block
        &:first-child
          color #444444
          font-size 1em
        &:last-child
          color #9B9B9B
          font-size 0.875em
          line-height 1.188em
    >.time
      flex 0 0 20%
      span
        &:first-child
          display inline-block
          border-radius 7px
          background #F8F8F8
          padding 5px 15px
          font-size 0.75em
</style>
