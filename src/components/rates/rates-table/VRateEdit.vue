<template lang="pug">
  div.rate-item-edit
    .rate-input-cont(:class="{'marginMode': config.mode === 'margin'}" @click.prevent="" @click.stop="" @click.self="")
      span {{valueType}}
      rate-input(
        :value="fieldValue"
        inputSize="is-small"
        @input:action-save="update"
      )
      button.button(@click="switchMarginType" :class="{'disabled': isSwitcherActive}")
        svgicon(name="pay-rates/margin-switch" :original="true")

</template>

<script>


import { mapState, mapActions } from "vuex"
import RateInput from "./VRateInput"
import { HalfCircleSpinner } from "epic-spinners"
import { errorDefaults } from "@/config/notifications"



export default {
  components: {
    RateInput,
    HalfCircleSpinner
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    config: {
      type: [String, Object],
      required: false,
      default: "Rate"
    }
  },
  data() {
    return {
      isEditing: false,
      internal: 0
    }
  },
  computed: {
    keyName() {
      return this.config.key || this.config
    },
    actionName() {
      return this.config.storeAction || "rates/updateTableItem"
    },
    typeName() {
      return this.config.typeSuffix || "Type"
    },
    fieldValue: {
      set(val) {
        this.internal = val
      },
      get() {
        return this.options[this.keyName]
      }
    },
    valueType() {
      const type =
        this.config.mode === "margin"
          ? this.options[`${this.keyName}${this.typeName}`] === 1
            ? this.$currency.sign
            : "%"
          : this.$currency.sign
      return this.options[`${this.keyName}${this.typeName}`] ? type : this.$currency.sign
    },
    marginTypeLocal() {
      return this.options[`${this.keyName}${this.typeName}`] || 1
    },
    isSwitcherActive() {
      return !this.options[this.keyName]
    }
  },
  methods: {
    switchMarginType(e) {
      setTimeout(() => {e.target.blur()}, 150)
      let marginTypeLocal = this.options[`${this.keyName}${this.typeName}`] || 2
      this.$store.dispatch(this.actionName,
        {
          ...this.options,
          [this.keyName]: this.options[this.keyName],
          [`${this.keyName}${this.typeName}`]:  3 - this.marginTypeLocal
        }
      )
    },
    update(value) {
      if(!value) {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: this.$t("rates.error_empty")
        })
        this.$notify(e)
        return
      }
      this.$store.dispatch(this.actionName, { ...this.options, [this.keyName]: value, [`${this.keyName}Type`]: this.marginTypeLocal } )
    }
  }
}
</script>
<style lang="stylus" scoped>
.rate-input-cont {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 0.875rem;
  width: 60%;

  span {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    opacity: 0.5;
  }

  input {
    font-size: inherit;
  }
  .button {
    height: 24px;
    width: 100%;
    display: none;
  }
}
</style>
<style lang="stylus">
.rate-item-edit {
  .marginMode {
    width: 80%;
    span {
      color: #2D64FF;
    }
    input {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    button.button {
      padding: 0px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      border-left: 0px;
      display: inline-flex;
      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      &:focus {
        box-shadow: none;
        border-color: #dbdbdb;
      }
      &:active, &:focus {
        svg {
          pointer-events: none;
          animation-name: rotate;
          animation-duration: 150ms;
          animation-iteration-count: 1;
          animation-timing-function: linear;
          @keyframes rotate {
            from {
                transform: rotate(0deg);
            } to {
                transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
}
</style>