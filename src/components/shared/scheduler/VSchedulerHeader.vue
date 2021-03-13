<template lang="pug">
  div.scheduler__header(:class="`is-${interval}`")
    div.scheduler__header--title
      span {{ this.options.headerTitle }}
    div.scheduler__header--content(v-if="interval !== 'day'")
      div.scheduler__header--days(v-for="(day, index) in headerDays" :class="{'is-today' : !loadingStatus && ( day.fullDate === currentWeekday ), 'is-weekend': day.isWeekend }")
        p 
          span {{ interval === 'week' ? day.dayName : day.monthDay }}
          span.week-date(:class="{'tinyDate': interval === 'month'} ") {{ interval === 'week' ? day.smallDate : day.dayName  }}
    div.scheduler__header--content(v-else)
      div.scheduler__header--navigation
        font-awesome-icon(:icon="icons.prev" @click="showPreviousDay")
        span {{renderDate}}
        font-awesome-icon(:icon="icons.next" @click="showNextDay")

</template>

<script>
import { DateTime, Info } from "luxon"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft"
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight"

export default {
  components: { FontAwesomeIcon },
  props: {
    date: {
      type: Object,
      required: true,
      default: () => {}
    },
    options: {
      type: Object,
      required: true,
      default: () => {}
    },
    headerDays: {
      type: Array,
      required: true,
      default: () => {}
    },
    currentWeekday: {
      type: String,
      required: true,
      default: ""
    },
    interval: {
      type: String,
      required: true,
      validator: val => ["day", "month", "week"].includes(val)
    },
    loadingStatus: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      icons: {
        prev: faAngleLeft,
        next: faAngleRight
      },
    }
  },
  computed: {
    renderDate() {
      return DateTime.fromObject(this.date)
        .setLocale(this.$langMap[this.locale].locale)
        .toLocaleString(DateTime.DATE_HUGE)
    },
    locale: function() {
      if (this.$i18n.locale === 'de_un') {
        return 'de'
      }
      return this.$i18n.locale
    }
  },
  methods: {
    showNextDay() {
      let date = DateTime.fromObject(this.date).plus({ days: 1 })
      this.$emit("scheduler-header-date", { date })
    },
    showPreviousDay() {
      let date = DateTime.fromObject(this.date).minus({ days: 1 })
      this.$emit("scheduler-header-date", { date })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/components/Scheduler';

.scheduler 
  &__header
    &--content 
      flex 1
      display flex
      flex-wrap nowrap
    &--navigation
      display flex
      width 100%
      justify-content center
      align-items center
      span
        font-size 18px
        font-weight bold
        color #444444
        display inline-block
        min-width 220px
        text-align center
      svg
        margin 0 10px
        cursor pointer
        &:hover
          opacity 0.7

</style>