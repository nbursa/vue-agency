<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}
  treeselect.agency__dropdown(
    v-if="areas.length > 0"
    v-model="selectedArea"
    :options="areas"
    :clearable="isClearable"
    :multiple="isMultiple"
    valueFormat="object"
    placeholder=""
    @open="setFocused"
    @close="setFocused"
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
    error: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState("areas", ["areas"]),
    selectedArea: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  mounted() {
    this.getAreas()
  },
  methods: {
    ...mapActions("areas", ["getAreas"]),
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

<style lang="stylus">

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

.agency-selector {
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

  .agency__dropdown {
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
