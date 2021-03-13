import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import '@/assets/styles/global/partials/tree-select-extend.styl'
import { getLoneChild } from '@/utils/general'

import Treeselect from '@riophae/vue-treeselect'

const defaultNormalizer = function (item) {
  return {
    id: item.id,
    label: item.label || item.name || item.attributeValue || item.value,
    children: item.children || item.subAgencies || item.attributeValues
  }
}

export default {
  components: { Treeselect },
  props: {
    value: {
      type: [Object, Array],
      required: false,
      default() {
        return {}
      }
    },
    normalizer: {
      type: Function,
      required: false,
      default: defaultNormalizer
    },
    items: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    optionName: {
      type: String,
      required: true
    },
    allowSelectingDisabledDescendants: {
      type: Boolean,
      required: false,
      default: false
    },
    disableBranchNodes: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true
    },
    valueFormat: {
      type: String,
      required: false,
      default: 'id'
    },
    isClearable: {
      type: Boolean,
      required: false,
      default: true
    },
    autoEmit: {
      type: [Object, Boolean],
      required: false,
      default: false
    },
    flat: {
      type: Boolean,
      required: false,
      default: false
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    hasAutoEmitSelect: {
      type: Boolean,
      required: false,
      default: false
    },
    openDirection: {
      type: String,
      required: false,
      default: () => 'auto'
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select'
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    noOptionsText: {
      type: String,
      required: false,
      default() {
        return this.$t('global.treeselect_nooptions')
      }
    },
    noResultsText: {
      type: String,
      required: false,
      default() {
        return this.$t('global.treeselect_noresults')
      }
    }
  },
  data() {
    return {
      selected: null,
      isFocused: false,
      showTree: true
    }
  },
  computed: {
    // Manages fancy label transition behavior
    result: {
      get() {
        if (this.hasAutoEmitSelect) return this.selected
        return this.value
          ? Array.isArray(this.value)
            ? this.value
            : this.value[this.optionName]
          : this.selected
      },
      set(d) {
        this.selected = d
        this.$emit('input', { [this.optionName]: this.selected })
        this.autoEmitSelected(this.selected)
      }
    },
    isEditing: function () {
      const hasSelected = this.selected || this.result
      const isTreeOpen = this.$children[0] ? this.$children[0].isOpen : false

      if (hasSelected === null) return false
      return (hasSelected && hasSelected.length !== 0) || isTreeOpen
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.selected = newVal
        this.autoEmitSelected(this.selected)
      }
      // immediate: true
    },
    items: function (newVal, oldVal) {
      this.autoEmitDispacher(newVal.length)
    }
  },
  mounted() {
    this.autoEmitDispacher(this.items.length)
  },
  methods: {
    setFocused: function () {
      this.isFocused = !this.isFocused
    },
    autoEmitSelected: function (val) {
      if (!this.hasAutoEmitSelect) return false
      this.$emit('auto-select', val)
    },
    autoEmitValue: function (name, items, childPropName) {
      const single = getLoneChild(items, childPropName)
      // console.log('RESULT', name, single)
      if (single) {
        this.showTree = false
        this.$emit('input', { [name]: single })
      } else {
        this.showTree = true
      }
    },
    autoEmitDispacher(items) {
      if (this.autoEmit) {
        this.autoEmitValue(
          this.optionName,
          this.items,
          this.autoEmit.childPropName
        )
      }
    }
  }
}
