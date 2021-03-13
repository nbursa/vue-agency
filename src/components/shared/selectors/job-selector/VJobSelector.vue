<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}
  treeselect.agency__dropdown(
    v-if="jobTypes.children && jobTypes.children.length > 0"
    v-model="selectedJobType"
    :options="jobTypes.children"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    @open="setFocused"
    @close="setFocused"
    :normalizer="normalizer"
    :class="{'has-label': label}"
    :noResultsText="$t('global.treeselect_noresults')"
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
      type: [Object, Array, Number],
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: null
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
    ...mapState("jobTypes", ["jobTypes"]),
    selectedJobType: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  mounted() {
    this.getJobTypesWithChildren()
  },
  methods: {
    ...mapActions("jobTypes", ["getJobTypesWithChildren"]),
    setFocused() {},
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    }
  }
}
</script>
