<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}
  treeselect.agency__dropdown(
    v-if="agencies.length > 0"
    v-model="selectedAgency"
    :options="agencies"
    :clearable="isClearable"
    :multiple="isMultiple"
    valueFormat="object"
    placeholder=""
    @open="setFocused"
    @close="setFocused"
    :value-consists-of="valueConsistsOf"
    :normalizer="normalizer"
    :disabled="isDisabled"
    :class="{'has-label': label}"
  )
  .help.is-danger(v-if="error") {{error}}

</template>

<script>
import { mapActions, mapState } from 'vuex'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'

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
      default: true
    },
    value: {
      type: [Array, Object],
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    },
    error: {
      type: String,
      required: false,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    valueConsistsOf: {
      type: String,
      required: false,
      default: 'BRANCH_PRIORITY'
    }
  },
  data() {
    return {
      selectedAgencies: []
    }
  },
  computed: {
    ...mapState('agencies', ['agencies']),
    selectedAgency: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  mounted() {
    this.getAgencies()
  },
  methods: {
    ...mapActions('agencies', ['getAgencies']),
    setFocused() {},
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.subAgencies
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
}

.has-label {
  float: right;
  width: 60%;

  @media (max-width: $display-small-desktop) {
    width: 100% !important;
  }
}
</style>
