<template lang="pug">
.stripe-container
  .tag.is-small.tag--has-total.info(:class="[`is-${classCase(status)}`, {'created': isCreated} ]") {{ humanCase( $t(`calendar_widgets.${status}`) ) }}
</template>

<script>
import { kebabCase, startCase } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'CalendarCellStatus',
  props: {
    data: {
      type: Object,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      statuses: ['Created', 'Acknowledged', 'Accepted', 'Rejected']
    }
  },
  computed: {
    ...mapState({
      candidate(state) {
        return state.candidateInactivity
      },
      isCreated() {
        return this.haveRequest.length
          ? this.status &&
              ['holidays', 'sickDays'].includes(this.status) &&
              this.haveRequest[0].status - 1 === 0
          : false
      },
      userRequests(state) {
        return state.userUnavailiability.userRequests.map((request) => {
          return {
            dates: request.dates.map((date) => {
              return date.date.split(' ')[0]
            }),
            type: request.type,
            status: request.status
          }
        })
      }
    }),
    status: function () {
      const statuses = Object.assign({}, this.data)
      delete statuses.date
      return Object.keys(statuses).filter((status) => statuses[status] !== 0)[0]
    },
    haveRequest: function () {
      const r = this.userRequests.filter((req) => {
        return req.dates.includes(this.data.date)
      })
      return r
    }
  },
  methods: {
    humanCase: startCase,
    classCase: kebabCase
  }
}
</script>
<style lang="stylus" scoped>
.stripe-container
  position absolute
  bottom 0px
  width 100%
  .tag
    .info
      width 100%
      align-items left
  .tag
    border-radius 14px
    border 2px solid white
    color white
    height 1.6em
    &--has-total
      background-color #4B9ED1
  .pending
    opacity .5
  .request
    font-size .75rem
    text-align center

.is-sick-days
  color white
  width 100%
  background: linear-gradient(225deg, #FFA17E 0%, #F78A59 100%)
.is-holidays
  color white
  width 100%
  background linear-gradient(225deg, #79D67A 0%, #66C567 100%)

.created
  opacity .5

.is-jobs
  color #838D98
  width 100%
  background-color transparent
</style>
