<template lang="pug">
  .compliance-list
    div.compliance-list__group(v-for="(group, index) in resultGroup" :key="index")
      span.compliance-list__label {{groupName(index)}}

      div.compliance-list__group-item(v-for="item in group" :key="item.id" )
        compliance-group-item(:item="item" labelKey="name" @compliance-item:checked="emitSelected" :selected="itemSelected" @compliance-item:view-documents="emitView" :icons="icons")


</template>

<script>
import { groupBy, isFunction } from "lodash"

import ComplianceGroupItem from "./VComplianceGroupItem"

/*
 * @param groupBy - Groups list by provided object key
 * @param nameBy - renders group name by matching provided key/value pair with the grouping criteria
 * @param customSort - pass custom method for sorting the grouped list
 */

export default {
  components: {
    ComplianceGroupItem
  },
  props: {
    groupBy: {
      type: String,
      required: true
    },
    nameBy: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    data: {
      type: Array,
      required: true
    },
    listMode: {
      type: Boolean,
      required: false,
      default: true
    },
    customSort: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    itemSelected: {
      type: Object,
      required: true
    },
    icons: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
    resultGroup: function() {
      const result = groupBy(this.data, item => {
        return item[this.groupBy]
      })

      if (isFunction(this.customSort.action))
        return this.customSort.action(result)
      return result
    }
  },
  methods: {
    groupName(group) {
      return this.nameBy[group]
    },
    emitSelected(item) {
      console.log("list emit", item)
      this.tempSelected = item
      this.$emit("compliancelist:selected", item)
    },
    emitView(item) {
      console.log("view emit", item)
      this.$emit("compliancelist:view-documents", item)
    }
  }
}
</script>

<style lang="stylus" scoped>


.compliance-list {
  padding: 0 15px 155px 15px;

  &__label {
    color: $fontDark;
    font-size: 0.9375rem;
    display: block;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }

  &__group-item {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 20px;
    }
  }
}
</style>
