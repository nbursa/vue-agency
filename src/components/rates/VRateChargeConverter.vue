<template lang="pug">
  div.converter
    p.converter__label {{ label ? label :  $t("margins_sidebar.converter_label") }}
    p.converter__error {{error}}
    div.converter__container
      div.converter__inputs
        div.converter__input-cont.input__rate(v-if="!(singleMode)")
          input.input(:placeholder="$t('margins_sidebar.rate')" type="number" v-model.number="computedRate" @keyup.enter="triggerSubmit")
          span.currency-label {{this.$currency.sign}}
        div.converter__input-cont.input__charge(v-if="!(singleMode)")
          input.input(:placeholder="$t('margins_sidebar.charge')" type="number" v-model.number="computedCharge" @keyup.enter="triggerSubmit")
          span.currency-label {{this.$currency.sign}}

</template>

<script>
//1 - digit
//2 - percent

export default {
  props: {
    singleMode: {
      type: Boolean,
      required: false,
      default: false
    },
    margin: {
      type: Number,
      required: false,
      default: 0
    },
    rate: {
      type: Number,
      required: false,
      default: 0
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
      internalCharge: null,
      internalRate: null
    }
  },
  computed: {
    computedRate: {
      set(val) {
        this.internalRate = val
        if (val) {
          this.internalCharge = val + this.margin
        } else {
          this.internalCharge = null
        }
        this.emitResult()
      },
      get() {
        return this.internalRate
      }
    },
    computedCharge: {
      set(val) {
        this.internalCharge = val

        if (this.internalCharge < this.margin) {
          this.internalRate = this.margin
          this.internalCharge = this.margin
        } else {
          this.internalRate = val - this.margin
        }
        this.emitResult()
      },
      get() {
        return this.internalCharge
      }
    }
  },
  watch: {
    rate: function(newVal) {
      this.computedRate = newVal
    }
  },
  created() {
    this.computedRate = this.rate
    this.activeType = this.marginType || 1
  },
  methods: {
    getDerivedRate() {
      return this.internalRate
    },
    getDerivedCharge() {
      let charge
      if (this.internalRate) {
        charge = this.internalRate + this.margin
      } else {
        charge = this.internalCharge
      }
      return charge
    },
    emitResult() {
      this.$emit('change', this.computedRate)
    },
    triggerSubmit(e) {
      e.target.blur()
      this.$emit('converter-calc:submit')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/colors'


.converter {
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
      color: #2045C1;

      &.active {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: #4E7CFE;
        color: white;
      }
    }
  }

  &__inputs {
    width: 100%;
    position: relative;
    display: flex;


    .converter {
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
          &__rate,
          &__charge {
            position: relative;
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

          &__rate {
            input {
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
              border-right: 0px;
            }  
          }

          &__charge {
            input {
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;

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
