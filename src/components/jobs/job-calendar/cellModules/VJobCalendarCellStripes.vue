<template lang="pug">
div
  span.calendar__count
    | {{ count }}
  .stripe-container
    template(v-for="status, index in statuses")
      span.tag.is-small(
        :class="colors[status]"
        :style="{right: (10 * index)+'px'}"
        )
      span.tag.is-small.tag--has-total(
        :style="{right: (10 * statuses.length)+'px'}"
      ) {{ count }}
</template>
<script>
import { kebabCase } from "lodash"
export default {
  props: {
    statuses: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    count: {
      type: [Number, String],
      required: false,
      default: ""
    }
  },
  computed: {
    colors: function() {
      return this.statuses.reduce((o, status) => {
        o[status] = `is-${kebabCase(status)}`
        return o
      }, {})
    }
  }
}
</script>
<style lang="stylus" scoped>

span.calendar__count
  padding 0 10px
  color #838D98
  opacity 1
  font-weight normal

.stripe-container
  position absolute
  top 10%
  transform translateY(-10%)
  left 3px
  width calc(100% - 6px)

  .tag
    .info
      width 100%
      align-items left
  .tag
    border-radius 14px
    border 2px solid white
    color white
    height 1.6em
    position absolute
    left 0
    &--has-total
      background-color #4B9ED1
.is-created
  background-color #1B394B
.is-accepted
  background-color #7ED321
.is-pass-on-pending
.is-swap-pending
.is-sign-off-pending
.is-invoice-pending
.is-arbitration-pending
  background-color #4B78FF
.is-in-progress
  background-color #F6B408
.is-invoiced
  background-color #858B9D
.is-cancelled
  background-color #FF4823
.is-never-filled
  background-color #C2C2C2
.is-admin-sign-off-pending
  background-color #4a4a4a
.is-sick-days
  color white
  width 100%
  background: linear-gradient(225deg, #FFA17E 0%, #F78A59 100%)
.is-holidays
  color white
  width 100%
  background linear-gradient(225deg, #79D67A 0%, #66C567 100%)
.info
  &.is-jobs
    color #838D98
    border none
    background-color transparent
</style>
