<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}
  treeselect.agency__dropdown(
    v-if="agencies.length > 0"
    v-model="selectedAgency"
    :options="agencies"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    @open="setFocused"
    @close="setFocused"
    :normalizer="normalizer"
    :noResultsText="$t('global.treeselect_noresults')"
    :class="{'has-label': label}"
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
      required: false,
      type: Number,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    ...mapState("agencies", ["agencies"]),
    selectedAgency: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  mounted() {
    this.getAgencies()
  },
  methods: {
    ...mapActions("agencies", ["getAgencies"]),
    setFocused() {},
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.subAgencies
      }
    }
  }
}
</script>

