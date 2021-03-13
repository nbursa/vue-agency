<template lang="pug">
div.agency-selector.client-selector
  div.agency-selector__label(v-if="label") {{label}}

  treeselect.agency__dropdown(
    v-if="clients && clients.length > 0"
    v-model="selectedClient"
    :options="clients"
    :clearable="isClearable"
    :multiple="isMultiple"
    :placeholder="$t('global.select_client_name')"
    @open="setFocused"
    @close="setFocused"
    :noResultsText="$t('global.treeselect_noresults')"
    :normalizer="normalizer"
    :class="{'has-label': label}"
  )
</template>

<script>
import BaseSelect from '@/components/shared/selectors/BaseSelector'
import { mapActions, mapState } from 'vuex'
import { nullableTypeAnnotation } from 'babel-types'
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
  computed: {
    ...mapState('clients', ['clients']),
    selectedClient: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  mounted() {
    this.getClientsWithChildren()
  },
  methods: {
    ...mapActions('clients', ['getClientsWithChildren']),
    setFocused() {},
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
<style lang="stylus">
.client-selector {
  .vue-treeselect {
    &__placeholder {
      line-height: 1.9 !important;
    }
  }
}
</style>
