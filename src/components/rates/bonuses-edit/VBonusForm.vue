<template lang="pug">
  div
    form.sidebar-form(@submit.prevent="save")
      base-input(
        v-model="name"
        :label="$t('rates.sidebar_bonus_name')"
        :error="parseError('name')"
      )
      div
        calculator(:error="parseError('amount')" :margin-value="bonus.amount" :margin-type="bonus.amountUnit" @change="updateBonus" :label="$t('rates.sidebar_amount')" :schema="{valueName: 'amount', typeName: 'amountUnit'}")

        calculator(:error="parseError('margin')" :margin-value="bonus.margin" :margin-type="bonus.marginUnit" @change="updateBonus" :schema="{valueName: 'margin', typeName: 'marginUnit'}")

</template>

<script>
import VSidebarInput from "@/components/shared/sidebar-form/VSidebarInput"
import formValidator from "@/directives/formValidator.js"
import Calculator from "../VMarginCalculator"

export default {
  components: {
    VSidebarInput,
    Calculator
  },
  props: {
    bonus: {
      required: true,
      type: Object
    },
    updateFn: {
      type: Function,
      required: true
    },
    errors: {
      type: Object,
      required: true
    }
  },
  computed: {
    name: {
      get() {
        return this.bonus.name
      },
      set(value) {
        this.updateFn({
          name: "name",
          value: value
        })
      }
    }
  },
  methods: {
    updateBonus(res) {
      Object.keys(res).forEach(item => {
        this.updateFn({
          name: item,
          value: res[item]
        })
      })
    },
    parseError(propName) {
      return this.errors.hasOwnProperty(propName) ? this.errors[propName][0] : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';
@import '~@/assets/styles/global/colors'

.sidebar-form {
  overflow: visible;
  clear: both;
  margin-top: 60px;
  margin-left: 40px;
  margin-right: 40px;
  &__error {
    display: inline-block;
    padding-top: 5px;
    color: $errorRed;
  }
}

</style>
