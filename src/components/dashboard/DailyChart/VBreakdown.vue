<template lang="pug">
div.breakdown(@mouseenter="toggleInfo" @mouseleave="toggleInfo" :class="{ 'breakdown_has-hover': hasHover }")
  .header
    label.breakdown_icon-label
      svgicon(:name="`dashboard/${legendIcon}`" :original="true" width="17px" height="14px")
      span {{ $t(`dashboard.${label}`) }}
    label {{ value }}
  .bottom
    progress.progress.is-small--vprogress(
      :value="value"
      :max="maxValue"
      :class="`is-${colorClass.toLowerCase()}`"
      )
    span.info(v-if="infoVisible")
      | {{ $t("dashboard.see_jobs") }}
</template>
<script>
import "@/compiled-icons/dashboard"
import { kebabCase } from "lodash"

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
    hasHover: {
      type: Boolean,
      required: false,
      default: true
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
  computed: {
    legendIcon() {
      return kebabCase(this.colorClass)
    }
  },
  methods: {
    toggleInfo() {
      if (this.hasHover) {
        this.infoVisible = !this.infoVisible
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
progress {
  margin-bottom: 0.3em !important;

  &::-ms-fill {
    transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &::-webkit-progress-value {
    transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &::-webkit-progress-bar {
    background-color: #EFEFEF;
  }

  &.is-working {
    &::-ms-fill {
      background-color: #2045C1;
    }

    &::-webkit-progress-value {
      background-color: #2045C1;
    }
  }

  &.is-notworking {
    &::-ms-fill {
      background-color: #8A91B1;
    }

    &::-webkit-progress-value {
      background-color: #8A91B1;
    }
  }

  &.is-onsickleave {
    &::-ms-fill {
      background-color: #FB986C;
    }

    &::-webkit-progress-value {
      background-color: #FB986C;
    }
  }

  &.is-onholiday {
    &::-ms-fill {
      background-color: #6DCD6D;
    }

    &::-webkit-progress-value {
      background-color: #6DCD6D;
    }
  }
}

span.info {
  font-size: 12px;
}

.progress.is-small--vprogress {
  height: 0.5rem;
}

.breakdown {
  transition: max-height 1.5s;
  height: 50px;
  padding: 6px 10px;
  border-radius: 3px;
  transition: height 0.3s;

  &_icon-label {
    display: flex;
    align-items: center;

    svg {
      margin: -2px 8px 0 0;
    }

    span {
      position: relative;
      display: inline-block;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        height: 10px;
        width: 1px;
        border-left: 1px solid #979797;
        opacity: 0.3;
      }
    }
  }

  &_has-hover {
    &:hover {
      cursor: pointer;
      box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2);
      height: 70px;
    }
  }

  .header {
    color: #202123;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    label {
      font-size: 14px;
    }
  }

  .bottom {
    text-align: center;
  }
}
</style>
