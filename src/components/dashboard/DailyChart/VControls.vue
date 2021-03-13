<template lang="pug">
.columns
  .column
    .dashboard__controls
      button.button.is-small(
        @click="showPreviousDay"
        )
        font-awesome-icon(:icon="icons.calPrev")
      button.button.is-small.space(
        @click="showToday"
      )
        | {{ $t("dashboard.today") }}
      button.button.is-small(
        @click="showNextDay"
        )
        font-awesome-icon(:icon="icons.calNext")
      p.dashboard__printDate {{ renderDate }}

</template>
<script>
import { DateTime } from "luxon"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft"
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight"

export default {
  components: { FontAwesomeIcon },
  props: {
    date: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      icons: {
        calPrev: faAngleLeft,
        calNext: faAngleRight
      }
    }
  },
  computed: {
    renderDate() {
      return this.date.setLocale(this.locale).toLocaleString(DateTime.DATE_HUGE)
    },
    locale: function() {
      if (this.$i18n.locale === 'de_un') {
        return 'de'
      }
      return this.$i18n.locale
    }
  },
  methods: {
    showPreviousDay() {
      this.$emit("dashboard-controls:prev")
    },
    showNextDay() {
      this.$emit("dashboard-controls:next")
    },
    showToday() {
      this.$emit("dashboard-controls:today")
    }
  }
}
</script>
<style lang="stylus" scoped>
.dashboard__controls {
  max-width: 400px;
  display: flex;
  align-items: center;

  .column {
    padding: 11px 0.75rem;
  }

  button {
    border: 0;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    width: 26px;
    height: 26px;

    &:focus {
      box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    }

    svg {
      color: #b1b5bb;
      width: 13px;
      height: 13px;
    }
  }

  .space {
    margin: 0px 12px;
    width: 60px;
  }
}

.dashboard__printDate {
  margin-left: 20px;
  flex: 1;
  text-align: left;
  text-transform: capitalize;
  font-size: 1em;
  color: #202123;
}
</style>
