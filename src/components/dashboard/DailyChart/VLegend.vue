<template lang="pug">
  div.legend
    div.legend_all
      p.legend_all--title {{ $t("dashboard.all_workers") }}
      p.legend_all--highlight
        span {{total}}
    div.legend_progress-cont
      v-breakdown(
        v-for="(status, key, index) in propData.data"
        v-if="key !== 'total'"
        :key="index"
        @click.native="key === 'Working' && goToTable()"
        :value="status"
        :label="computeCase(key)"
        :maxValue.number="total"
        :colorClass="key"
        :hasHover="key === 'Working'"
      )
</template>

<script>
import VBreakdown from "./VBreakdown.vue"
import { startCase, snakeCase } from "lodash"
import { mapActions } from "vuex"

export default {
  components: {
    VBreakdown
  },
  props: {
    propData: {
      type: [Object, Array],
      required: true,
      defaut: () => {}
    },
    total: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions("jobManagement/search", [
      "resetSearchParams",
      "updateSearchParams"
    ]),
    humanCase: startCase,
    computeCase: snakeCase,
    goToTable() {
      this.resetSearchParams()
      this.updateSearchParams([
        { dateFrom: this.propData.filter },
        { dateTo: this.propData.filter }
      ])
      this.$router.push({ name: "job-schedule" })
    }
  }
}
</script>

<style lang="stylus" scoped>
.legend {
  min-height: 272px;

  &_all {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 0 15px 10px;

    &--title {
      color: #202123;
      font-size: 0.875em;
      letter-spacing: -0.09px;
    }

    &--highlight {
      border-radius: 14px;
      background-color: #8AB7D4;

      span {
        color: white;
        padding: 5px 10px;
        font-size: 1.15rem;
      }
    }
  }
}
</style>
