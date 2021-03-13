<template lang="pug">
div.rate(:class="{'rate--highlight': isFocused }")
  div.rate__label(:class="{'rate__label--active' : isEditing || isFocused }")
    slot(name="label")

  treeselect.rate__dropdown(
    v-model="selectedCurrency"
    :options="currencies"
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
    }
  },
  data() {
    return {
      selectedItem: null,
      isFocused: false
    }
  },
  computed: {
    ...mapState("currencies", ["currencies"]),
    currenciesList() {
      return uniqBy(this.currencies, (i) => {
        return i.id
      })
    },
    selectedCurrency: {
      get() {
        return this.value
      },
      set(value) {
        this.selectedItem = value
        this.$emit("input", value)
      }
    },
    isEditing: function() {
      const hasSelected = this.selectedItem || this.selectedCurrency
      const isTreeOpen = this.$children[0] ? this.$children[0].isOpen : false

      if (hasSelected === null) return false
      return (hasSelected && hasSelected.length !== 0) || isTreeOpen
    }
  },
  mounted() {
    this.getCurrencies()
  },
  methods: {
    ...mapActions("currencies", ["getCurrencies"]),
    setFocused: function() {
      this.isFocused = !this.isFocused
    },
    normalizer(node) {
      return {
        id: node.id,
        label: `${node.name} (${node.code})`
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
