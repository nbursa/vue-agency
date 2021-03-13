<template lang="pug">
div.agency-selector(v-if="bonuses && bonuses.length > 0")
  div.agency-selector__label(v-if="label") {{label}}

  treeselect.agency__dropdown(
    v-model="selectedBonus"
    :options="bonusesList"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    @open="setFocused"
    @close="setFocused"
    :disabled="isDisabled"
    :normalizer="normalizer"
    :class="{'has-label': !label}"
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
      type: [Number, Array],
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    jobId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      internalValue: []
    }
  },
  computed: {
    ...mapState("bonuses", ["bonuses"]),
    bonusesList() {
      return [...this.bonuses]
    },
    selectedBonus: {
      get() {
        return this.value.map(bonus => bonus.id)
      },
      set(value) {
        this.internalValue = value

        const result = this.internalValue.map(id => {
          return { id }
        })

        this.$emit("input", result)
      }
    }
  },
  watch: {
    jobId: {
      handler: "getBonuses"
    }
  },
  mounted() {
    this.getBonuses()
  },
  methods: {
    ...mapActions("bonuses", ["getAllBonuses"]),
    getBonuses() {
      this.getAllBonuses({ responseType: "all" })
    },
    setFocused() {},
    normalizer(node) {
      return {
        id: node.id,
        label: node.name
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
