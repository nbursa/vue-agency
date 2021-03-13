<template lang="pug">
div.cpmnt(@mouseenter="toggleInfo" @mouseleave="toggleInfo")
  .header
    label {{ label }}
    label {{ value }}
  .bottom
    progress.progress.is-small--vprogress(
      :value="value"
      :max="maxValue"
      :class="colorClass"
      )
    span.info(v-if="infoVisible")
      | {{ $t("job_cal.see_jobs") }}
</template>
<script>
export default {
  props: {
    colorClass: {
      type: String,
      required: false,
      default: ""
    },
    maxValue: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      default: "[Label]"
    }
  },
  data() {
    return {
      infoVisible: false
    }
  },
  methods: {
    toggleInfo() {
      this.infoVisible = !this.infoVisible
    }
  }
}
</script>
<style lang="stylus" scoped>
progress.progress {
  margin-bottom: 0.3em !important;

  &::-webkit-progress-value {
    transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &::-webkit-progress-bar {
    background-color: #EFEFEF;
  }

  &::-ms-fill {
    transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &.is-upcoming {
    &::-webkit-progress-value {
      background-color: #FFC051;
    }

    &::-ms-fill {
      background-color: #FFC051;
    }
  }

  &.is-in-progress {
    &::-webkit-progress-value {
      background-color: #69CD58;
    }

    &::-ms-fill {
      background-color: #69CD58;
    }
  }

  &.is-finished {
    &::-webkit-progress-value {
      background-color: #4B78FF;
    }

    &::-ms-fill {
      background-color: #4B78FF;
    }
  }

  &.is-never-filled {
    &::-webkit-progress-value {
      background-color: #ED806A;
    }

    &::-ms-fill {
      background-color: #ED806A;
    }
  }

  &.is-cancelled-2 {
    &::-webkit-progress-value {
      background-color: #888888;
    }

    &::-ms-fill {
      background-color: #888888;
    }
  }

  &.is-pending {
    &::-webkit-progress-value {
      background-color: #7EB1FF;
    }

    &::-ms-fill {
      background-color: #7EB1FF;
    }
  }

  &.is-passOnPending, &.is-swapPending, &.is-signOffPending, &.is-invoicePending, &.is-arbitrationPending {
    &::-webkit-progress-value {
      background-color: #4B78FF;
    }

    &::-ms-fill {
      background-color: #4B78FF;
    }
  }

  &.is-accepted {
    &::-webkit-progress-value {
      background-color: #7ED321;
    }

    &::-ms-fill {
      background-color: #7ED321;
    }
  }

  &.created {
    &::-webkit-progress-value {
      background-color: #1B394B;
    }

    &::-ms-fill {
      background-color: #1B394B;
    }
  }

  &.is-inProgress {
    &::-webkit-progress-value {
      background-color: #F6B408;
    }

    &::-ms-fill {
      background-color: #F6B408;
    }
  }

  &.is-invoiced {
    &::-webkit-progress-value {
      background-color: #858B9D;
    }

    &::-ms-fill {
      background-color: #858B9D;
    }
  }

  &.is-cancelled, &.is-cancelled-2 {
    &::-webkit-progress-value {
      background-color: #FF4823;
    }

    &::-ms-fill {
      background-color: #FF4823;
    }
  }

  &.is-neverFilled {
    &::-webkit-progress-value {
      background-color: #C2C2C2;
    }

    &::-ms-fill {
      background-color: #C2C2C2;
    }
  }
}

span.info {
  font-size: 12px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: $primary;
  }
}

.progress.is-small--vprogress {
  height: 0.5rem;
}

.cpmnt {
  transition: max-height 1.5s;
  height: 80px;
  padding: 0.8rem 0px;
  border-radius: 3px;
  transition: height 0.3s;

  &:hover {
    padding: 0.8rem 10px;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2);
    height: 90px;
  }

  .header {
    color: #202123;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    label {
      font-size: 15px;
    }
  }

  .bottom {
    text-align: center;
  }
}
</style>
