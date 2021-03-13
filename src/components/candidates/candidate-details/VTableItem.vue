<template lang="pug">
  .div
    .candidate-table__row
      div.candidate-table__row-cell(
        v-for="(attr, index) in columns"
        :key="index",
        :style="{ flex: attr.width }"
      )
        div(v-if="isComponent(attr)")
          component(
            :is="attr.component"
            :options="item"
          )
        div(v-else-if="attr.type && attr.type === 'date'")
          span {{ lodashGet(item, attr.show) | nice-date }}
        div(v-else="!attr.type")
          span
            | {{ lodashGet(item, attr.show) | row-filter }}
</template>

<script>
import { get } from "lodash"

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  methods: {
    isComponent(attr) {
      return attr.component && attr.component instanceof Object
    },
    lodashGet(object, path) {
      const item = get(object, path)

      let validItem = ""
      if (typeof item === "boolean") {
        validItem = item ? this.$t("global.yes") : this.$t("global.no")
      } else {
        validItem = item
      }
      return validItem === undefined ? "--" : validItem
    }
  }
}
</script>

<style lang="stylus" scoped>
.candidate-table {
  position: relative;

  &__row {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    display: flex;
    border-radius: 4px;
    margin-bottom: 11px;
    align-items: center;
  }

  &__row-cell {
    flex: 1;
    color: #202123;
    font-size: 14px;
    padding: 0 20px;
  }
}
</style>


