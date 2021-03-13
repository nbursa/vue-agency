<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}
  treeselect.agency__dropdown(
    v-model="selectedStatus"
    :options="data"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    @open="setFocused"
    :max-height.number="400"
    @close="setFocused"
    :normalizer="normalizer"
    :class="{'has-label': label}"
    :noResultsText="$t('global.treeselect_noresults')"
    :noOptionsText="$t('global.treeselect_nooptions')"
  )
</template>

<script>
import BaseSelect from "@/components/shared/selectors/BaseSelector"
import { mapActions, mapState } from "vuex"

export default {
  extends: BaseSelect,
  props: {
    isMultiple: {
      type: Boolean,
      required: false,
      default: true
    },
    isClearable: {
      type: Boolean,
      required: false,
      default: true
    },
    value: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    data: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selectedNode: null
    }
  },
  computed: {
    selectedStatus: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  mounted() {},
  methods: {
    setFocused() {},
    normalizer(node) {
      return {
        id: node.id,
        label: this.$t(node.label),
        children: node.children
      }
    }
  }
}
</script>

