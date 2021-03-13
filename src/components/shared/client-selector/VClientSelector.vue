<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}} 
  treeselect.agency__dropdown(
    v-if="clients.length > 0"
    v-model="selectedAgency"
    :options="clients"
    :multiple="isMultiple"
    :valueFormat="valueFormat"
    :placeholder="placeholder"
    :valueConsistsOf="valueConsistsAdjust"
    :normalizer="normalizer"
    :disabled="isDisabled"
    :class="{'has-label': label}"
    :flat="flat"
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
    error: {
      type: String,
      default: () => ''
    },
    value: {
      type: [Array, Object]
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
    valueFormat: {
      type: String,
      required: false,
      default: 'object'
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
    placeholder: {
      type: String,
      required: false,
      default: () => ''
    },
    clientGetter: {
      type: String,
      required: false,
      default: 'getClientsWithChildren'
    },
    flat: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    ...mapState('clients', ['clients']),
    selectedAgency: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    valueConsistsAdjust: function() {
      if (this.isDisabled) {
        return this.value[0].parentId === null
          ? 'BRANCH_PRIORITY'
          : this.valueConsists
      }
      return 'BRANCH_PRIORITY'
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    ...mapActions('clients', [
      'getClientsWithChildren',
      'getClientsWithChildrenAndDayTimes'
    ]),
    getClients() {
      return this[this.clientGetter].call()
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';


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

  & >>> .vue-treeselect {
    &__single-value {
      line-height: 38px;
    }

    &--has-value {
      .vue-treeselect__control {
        &:hover {
          border-color: #4F7BFF !important;
        }
      }
    }

    &__placeholder {
      line-height: 38px;
    }

    &__control {
    border-radius: 3px;
    border: 1px solid $WFdarkGray;
    height: 40px;
    }
  }
}

.has-label {
  float: right;
  width: 60%;
}
</style>
