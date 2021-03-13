<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}
  treeselect.agency__dropdown(
    v-if="attributes && attributes.length > 0"
    v-model="selectedAttribute"
    :options="attributes"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    @open="setFocused"
    :disableBranchNodes="disableBranchNodes"
    @close="setFocused"
    :disabled="isDisabled"
    :valueConsistsOf= "valueConsists"
    :normalizer="normalizer"
    :class="{'has-label': label}"
    :noResultsText="$t('global.treeselect_noresults')"
  )
</template>

<script>
import BaseSelect from '@/components/shared/selectors/BaseSelector'
import { mapActions, mapState } from 'vuex'
export default {
  extends: BaseSelect,
  props: {
    isMultiple: {
      type: Boolean,
      required: false,
      default: false
    },
    isClearable: {
      type: Boolean,
      required: false,
      default: false
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
    },
    valueConsists: {
      type: String,
      required: false,
      default: 'BRANCH_PRIORITY'
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    disableBranchNodes: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('attributes', ['attributes']),
    selectedAttribute: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    attributes: function (val) {
      this.$emit('selector-values', val.length)
    }
  },
  mounted() {
    this.getAttributes()
  },
  methods: {
    ...mapActions('attributes', ['getAttributes']),
    setFocused() {},
    normalizer(node) {
      return {
        id: node.values ? Math.floor(Math.random() * 10000 + 1) : node.id,
        label: node.name || node.value,
        children: node.values
      }
    }
  }
}
</script>
