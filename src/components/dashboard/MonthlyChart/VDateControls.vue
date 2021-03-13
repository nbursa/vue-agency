<template lang="pug">
  .columns
    .column
      .dashboard__controls
        button.button.is-small(@click="onPrevClick")
          font-awesome-icon(:icon="icons.calPrev")
        button.button.is-small.day(
            @click="onTodayClick"
          )
            | {{ $t("dashboard.this_month") }}
        button.button.is-small(@click="onNextClick")
          font-awesome-icon(:icon="icons.calNext")
        .date-controls-selected-date {{ selectedDate.toFormat("LLLL yyyy") }}
</template>

<script>
import { DateTime, Interval } from "luxon"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft"
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight"

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    selectedDate: {
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
  methods: {
    onPrevClick() {
      this.$emit("prev")
    },
    onNextClick() {
      this.$emit("next")
    },
    onTodayClick() {
      this.$emit("today")
    }
  }
}
</script>
<style lang="stylus" scoped>
.dashboard__controls {
  max-width: 400px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  button {
    margin-right: 12px;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    width: 26px;
    height: 26px;
    border: 0;

    &:focus {
      box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    }

    svg {
      color: #b1b5bb;
      width: 13px;
      height: 13px;
    }

    &.day {
      width: 80px;
    }
  }

  .date-controls-selected-date {
    margin-left: 8px;
  }
}
</style>



