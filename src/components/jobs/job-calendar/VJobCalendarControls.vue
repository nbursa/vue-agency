<template lang="pug">
.columns
  .column.is-paddingless.control-cont
    .calendar__controls
      button.button.is-small(
        @click="showPreviousMonth"
        )
        font-awesome-icon(:icon="icons.calPrev")
      p.calendar__printDate {{ printDate }}
      button.button.is-small.is-outlined(
        @click="showToday"
        ) {{ $t("job_cal.today") }}
      button.button.is-small(
        @click="showNextMonth"
        )
        font-awesome-icon(:icon="icons.calNext")
    cellFilter(v-if="cellFilter")

</template>
<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft"
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight"
import cellFilter from "@/components/shared/search-filters/VCalendarCellFilters"

export default {
  components: { FontAwesomeIcon, cellFilter },
  props: {
    date: {
      required: true,
      type: Object
    },
    cellFilter: {
      type: Boolean,
      required:false,
      default: false,
    }
  },
  data() {
    return {
      calendar: {
        fmtDate: {
          month: "long",
          year: "numeric"
        }
      },
      icons: {
        calPrev: faAngleLeft,
        calNext: faAngleRight
      }
    }
  },
  computed: {
    printDate() {
      return this.date.setLocale(this.$langMap[this.locale].locale).toLocaleString(this.calendar.fmtDate)
    },
    locale: function() {
      if (this.$i18n.locale === 'de_un') {
        return 'de'
      }
      return this.$i18n.locale
    }
  },
  methods: {
    showToday() {
      this.$emit("cal-controls:today")
    },
    showPreviousMonth() {
      this.$emit("cal-controls:previous-month")
    },
    showNextMonth() {
      this.$emit("cal-controls:next-month")
    }
  }
}
</script>
<style lang="stylus" scoped>

.control-cont {
  // margin-top: 1em;
  min-height: 59px;
  background-color: #fff;
  border-bottom: 1px solid #dfe2e3;
  padding: 0.75em !important;
  // border-top: 1px solid #dfe2e3;
  margin-left: -0.75em;
  margin-right: -0.75em;
  margin-bottom: 1em;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.calendar__controls {
  width: 300px;
  display: flex;
  align-items: center;
}

.calendar__printDate {
  flex: 1;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.1em;
}
</style>
