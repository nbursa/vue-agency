<template lang="pug">
div.base-selector
  div.base-selector__label(v-if="label") {{label}}
  treeselect.base__dropdown(
    v-model="selectedItem"
    :options="items"
    :clearable="isClearable"
    :multiple="isMultiple"
    valueFormat="object"
    :placeholder="placeholder"
    :normalizer="normalizer"
    :class="{'has-label': label}"
  )
  .help.is-danger(v-if="error") {{error}}
</template>

<script>
import { mapActions, mapState } from "vuex"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import Treeselect from "@riophae/vue-treeselect"

export default {
  components: {
    Treeselect
  },
  props: {
    isMultiple: {
      type: Boolean,
      required: false,
      default: true
    },
    isClearable: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [Object, Array],
      required: false,
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
    },
    items: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    error: {
      type: String,
      required: false,
      default: ""
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {}
  },
  computed: {
    selectedItem: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  methods: {
    normalizer(node) {
      return {
        id: node.id,
        label: node.name
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/colors';
@import '~@/assets/styles/global/variables';

.vue-treeselect {
  &__single-value {
    line-height: 38px;
  }
}

.vue-treeselect__control {
  border-radius: 0 3px 3px 0px;
  border: 1px solid $WFdarkGray;
  height: 40px;
}

.base-selector {
  &__label {
    float: left;
    width: 40%;
    font-size: 13px;
    color: #999;
    padding-top: 0.7em;
    transition: 0.4s;

    @media (max-width: $display-small-desktop) {
      width: 100% !important;
    }
  }

  .base__dropdown {
    @media (max-width: $display-small-desktop) {
      width: 100%;
    }
  }
}

.has-label {
  float: right;
  width: 60%;
}
</style>
