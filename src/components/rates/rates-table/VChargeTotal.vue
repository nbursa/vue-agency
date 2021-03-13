<template lang="pug">
  div.hourly-charge {{totalCharge || "--" }}
</template>

<script>
import { mapState } from "vuex"
import { camelCase } from "lodash"


export default {
  props: {
    options: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState("rates", [
      "tableMode",
      "activeTable",
    ]),
    rateValue() {
      return Number(this.options[this.createPropName("Rate")])
    },
    marginValue() {
      return this.options[this.createPropName("Margin")]
    },
    marginType() {
      return this.options[`${this.createPropName("Margin")}Type`]
    },
    totalCharge() {
      if(this.marginType === 1) {
        return `${this.$currency.sign} ${Math.round((Number(this.rateValue) + Number(this.marginValue)) * 100) / 100}`
      }
      if(this.marginType === 2) {
        return `${this.$currency.sign} ${Math.round(((this.rateValue * this.marginValue) / 100 + this.rateValue) * 100) / 100}`
      }
    }
  },
  methods: {
    createPropName(name) {
      return this.activeTable === "scheduled"
        ? camelCase(`${this.activeTable}_${this.tableMode}_${name}`)
        : camelCase(`${this.tableMode}_${name}`)
    },
  }
}
</script>


