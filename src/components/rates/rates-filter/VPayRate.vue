<template lang="pug">
  div.rate(:class="{'rate--highlight': isFocused }")
    div.rate__label(:class="{'rate__label--active' : isEditing || isFocused  }")
      slot(name="label")

    treeselect.rate__dropdown(
      v-model="selected[optionName]"
      :options="items"
      :multiple="multiple"
      placeholder=""
      @open="setFocused"
      @close="setFocused"
      :normalizer="normalizer"
      :disableBranchNodes="disableBranchNodes"
      :valueFormat="valueFormat"
    )


</template>

<style lang="stylus">


.rate {
  position: relative;
  min-height: 65px;
  border: 1px solid $darkGray;
  border-radius: 3px;
  margin-top: 10px !important;
  margin-bottom: 0 !important;

  &--highlight {
    box-shadow: 0 0 0 2px $lightBlue;
  }

  &__label {
    opacity: 0.99;
    pointer-events: none;
    transition: all 0.15s ease;
    z-index: 1;
    font-size: 1.125rem;
    position: absolute;
    color: $fontGray;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;

    &--active {
      font-size: 0.8125rem;
      top: 15px;
    }
  }

  &__dropdown {
    padding: 1px;
    .vue-treeselect {
      &__single-value {
        line-height: 38px;
      }

      &__control {
        border: 0;
        margin-top: 25px;
        padding-bottom: 5px;
      }

      &__multi-value {
        margin-left: 15px;
      }

      &__multi-value-item {
        background-color: #D5F7D2;
        color: white;
        min-width: 125px;
        min-height: 30px;
        font-weight: normal;
        font-size: 1rem;
      }

      &__multi-value-label {
        padding-left: 10px;
        color: #000000;
      }

      &__value-remove {
        border-left: none;

        svg {
          width: 12px;
          height: 12px;
          padding: 2px;
          border-radius: 50%;
          background-color: white;
          color: #3B6177;
        }
      }

      &__menu {
        z-index: 4;
        left: -1px;
        right: -1px;
        margin-top: 5px;
        border-radius: 3px;
      }

      &__control-arrow-container {
        display: none;
      }
    }
  }
}
</style>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: { Treeselect },
  props: {
    clear: {
      type: Boolean,
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    optionName: {
      type: String,
      required: true
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
    mountCallback: {
      type: Object,
      required: false,
      default: null
    },
    normalizer: {
      type: Function,
      required: false,
      default: (item) => {
        return {
          id: item.id,
          label: item.label || item.name || item.attributeValue,
          children: item.children || item.subAgencies || item.attributeValues
        }
      }
    }
  },
  data() {
    return {
      selected: {
        [this.optionName]: null
      },
      isFocused: false
    }
  },
  computed: {
    // ???
    isEditing: function () {
      const hasSelected = this.selected[this.optionName]
      const isTreeOpen = this.$children[0] ? this.$children[0].isOpen : false

      if (hasSelected === null) return false
      return (hasSelected && hasSelected.length !== 0) || isTreeOpen
    }
  },
  watch: {
    isEditing: function (v) {
      if (v === undefined) {
        this.$emit('cleared')
      }
    },
    clear(val) {
      this.selected[this.optionName] = null
    },
    selected: {
      handler: function (data) {
        if (data && data[this.optionName]) {
          this.$emit('input', data)
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.mountCallback) {
      this.mountCallback.callback(this, this.mountCallback.keyTarget)
    }
  },
  methods: {
    setFocused: function () {
      this.isFocused = !this.isFocused
    }
  }
}
</script>
