<template lang="pug">
div.agency-selector(v-if="candidates && candidates.length > 0")
  div.agency-selector__label(v-if="label") {{label}}

  treeselect.agency__dropdown(
    v-model="selectedClient"
    :options="candidatesList"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    @open="setFocused"
    @close="setFocused"
    :normalizer="normalizer"
    :class="{'has-label': !label}"
    :noResultsText="$t('global.treeselect_noresults')"
  )
</template>

<script>
import BaseSelect from "@/components/shared/selectors/BaseSelector"
import { mapActions, mapState } from "vuex"
import { nullableTypeAnnotation } from "babel-types"
import { uniqBy } from "lodash"

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
      type: Number,
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
    },
    injectedCandidate: {
      type: Object,
      required: false,
      default() {
        return null
      }
    },
    jobId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    ...mapState("candidateValid", ["candidates"]),
    candidatesList() {
      return this.injectedCandidate ? uniqBy([...this.candidates, this.injectedCandidate], (i) => {
        return i
      }) : [...this.candidates]
    },
    selectedClient: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  watch:{
    jobId: {
      handler: "getCandidates"
    }
  },
  mounted() {
    this.getCandidates(this.jobId)
  },
  methods: {
    ...mapActions("candidateValid", ["getCandidates"]),
    setFocused() {},
    normalizer(node) {
      return {
        id: node.id,
        label: `${node.firstName} ${node.lastName}`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.agency__dropdown {
  width: 60%;
  float: left;
  @media (max-width: $display-small-desktop) {
    width: 100%;
  }
}
</style>
