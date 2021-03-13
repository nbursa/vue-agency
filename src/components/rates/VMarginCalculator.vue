<template lang="pug">
  div.margin-calculator
    p.margin-calculator__label {{ label ? label :  $t("margins_sidebar.calculator_label") }}
    p.margin-calculator__error {{error}}
    div.margin-calculator__container
      div.margin-calculator__buttons
        button.button(@click.prevent="setActive(1)" :class="{ 'active': activeType === 1 }") {{$currency.sign}}
        button.button(@click.prevent="setActive(2)" :class="{ 'active': activeType === 2 }") %
      div.margin-calculator__inputs
        div.margin-calculator__input-cont.input__monetary(v-if="!(singleMode && activeType !== 1)")
          input.input(type="number" :disabled="activeType !== 1" v-model.number="monetary" @keyup.enter="triggerSubmit")
          span.currency-label {{this.$currency.sign}}
        div.margin-calculator__input-cont.input__percentile(v-if="!(singleMode && activeType !== 2)")
          input.input(type="number" :disabled="activeType !== 2" v-model.number="percentile" @keyup.enter="triggerSubmit")
</template>

<script>
//1 - digit
//2 - percent

export default {
  props: {
    marginValue: {
      type: [Number, String],
      required: false,
      default: 0
    },
    rateValue: {
      type: Number,
      required: false,
      default: 0
    },
    marginType: {
      type: Number,
      required: false,
      default: 1
    },
    singleMode: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: String,
      required: false,
      default: ''
    },
    watchRate: {
      type: Boolean,
      required: false,
      default: false
    },
    schema: {
      type: Object,
      required: false,
      default() {
        return {
          valueName: 'margin',
          typeName: 'type'
        }
      }
    }
  },
  data() {
    return {
      activeType: 1,
      internalMargin: null
    }
  },
  computed: {
    active: {
      set(val) {
        this.activeType = val
        this.$emit('change', {
          margin:
            this.internalMargin === null
              ? this.marginValue
              : this.internalMargin,
          type: this.activeType,
          monetary: this.monetary
        })
      },
      get() {
        return this.marginType || this.activeType
      }
    },
    monetary: {
      set(val) {
        if (val) {
          this.internalMargin = val
          this.emitResult()
        }
      },
      get() {
        return this.getDerivedMarginMonetary()
      }
    },
    percentile: {
      set(val) {
        this.internalMargin = val
        this.emitResult()
      },
      get() {
        return this.getDerivedMarginPercentile()
      }
    }
  },
  watch: {
    marginValue: {
      handler: function (newVal, oldVal) {
        this.internalMargin = newVal
        this.emitResult()
      },
      immediate: true
    },
    marginType: function (newVal, oldVal) {
      this.activeType = newVal || 1
    },
    rateValue: function (newVal, oldVal) {
      if (this.watchRate) {
        this.emitResult()
      }
    }
  },
  created() {
    this.internalMargin = this.marginValue
    this.activeType = this.marginType || 1
  },
  methods: {
    setActive(type) {
      this.activeType = type
      this.emitResult()
    },
    getDerivedMarginMonetary() {
      let margin,
        result = 0
      if (this.activeType === 1) {
        margin = this.internalMargin || null
      } else {
        result =
          Math.round(((this.rateValue * this.internalMargin) / 100) * 100) / 100
        margin = this.rateValue ? result : null
      }
      return margin
    },
    getDerivedMarginPercentile() {
      let margin,
        result = 0
      if (this.activeType === 2) {
        margin = this.internalMargin || null
      } else {
        result =
          Math.round(
            (this.internalMargin / (this.rateValue || 1)) * 100 * 100
          ) / 100
        margin = this.rateValue ? result : null
      }
      return margin
    },
    emitResult() {
      this.$emit('change', {
        [this.schema.valueName]:
          this.internalMargin === null ? this.marginValue : this.internalMargin,
        [this.schema.typeName]: this.activeType,
        monetary: this.monetary
      })
    },
    triggerSubmit(e) {
      e.target.blur()
      this.$emit('margin-calc:submit')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/colors'


.margin-calculator {
  margin-top: 20px;

  &__label {
    font-weight: bold;
    margin-bottom: 15px;
  }

  &__error {
    padding-bottom: 5px;
    margin-top: -15px;
    color: $errorRed;
  }

  &__container {
    display: flex;
    justify-content: center;
  }

  &__buttons {
    margin-right: 10px;

    button:first-child {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    button:last-child {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-top: none;
    }

    button {
      padding: 0px;
      display: block;
      width: 32px;
      height: 32px;
      color: $primary;

      &.active {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: $primary;
        color: white;
      }
    }
  }

  &__inputs {
    width: 100%;
    position: relative;
    display: flex;


    .margin-calculator {
      &__input-cont {
        display: inline-block;
        width: 100%;
        height: 64px;
        position: relative;

        input {
          width: 100%;
          height: 64px;
          padding-right: 33px;
          color: #2F3439;
          font-size: 1.0625rem;

          &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }

        &.input {
          &__monetary {
            position: relative;
            input {
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }
            .currency-label {
              pointer-events: none;
              position: absolute;
              right: 20px;
              top: 21px;
              font-size: 1.125rem;
              font-weight: bold;
              opacity: 0.35;
            }
          }

          &__percentile {
            input {
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;

              &:disabled {
                border-left: none;
              }
            }

            &:after {
              content: '%';
            }
          }
        }

        &:after {
          pointer-events: none;
          position: absolute;
          right: 20px;
          top: 21px;
          font-size: 1.125rem;
          font-weight: bold;
          opacity: 0.35;
        }
      }
    }
  }
}
</style>
