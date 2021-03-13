<template lang="pug">
.grade(:class="{'grade--highlight': isFocused }")
  .grade__label(:class="{'grade__label--active' : isEditing || isFocused }")
    slot(name="label") {{ label }}
  treeselect.grade__dropdown(
    v-model="selectedGrade"
    :options="grades"
    :clearable="isClearable"
    :multiple="isMultiple"
    :placeholder="placeholder"
    @open="setFocused"
    @close="setFocused"
    :normalizer="normalizer"
    :class="{'has-label': !label}"
    :noResultsText="$t('global.treeselect_noresults')"
    valueFormat="object"
    :disabled="isDisabled"
  )
</template>

<script>
import BaseSelector from '@/components/shared/selectors/BaseSelector'
import { mapActions, mapState } from 'vuex'

export default {
  extends: BaseSelector,
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
    isDisabled: {
      type: Boolean,
      required: false,
      default: () => false
    },
    value: {
      type: [Object, Array],
      required: false,
      default: () => []
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
    placeholder: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  data() {
    return {
      selectedItem: null,
      isFocused: false
    }
  },
  computed: {
    ...mapState('grades', ['grades']),
    selectedGrade: {
      get() {
        return this.value
      },
      set(value) {
        this.selectedItem = value
        this.$emit('input', value)
      }
    },
    isEditing: function () {
      const hasSelected = this.selectedItem || this.selectedGrade
      const isTreeOpen = this.$children[0] ? this.$children[0].isOpen : false

      if (hasSelected === null) return false
      return isTreeOpen
    }
  },
  mounted() {
    this.getGrades()
  },
  methods: {
    ...mapActions('grades', ['getGrades']),
    setFocused: function () {
      this.isFocused = !this.isFocused
    },
    normalizer(node) {
      return {
        id: node.id,
        label: `${node.name}`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.grade {
  &__label {
    color: #999;
    font-size: 13px;
    padding-top: 0.4em;
    cursor: default;
    &--active {
      color: #4a4a4a;
    }
  }
}
</style>
