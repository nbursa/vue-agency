<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{label}}

  treeselect.agency__dropdown(
    v-if="roles && roles.length > 0"
    v-model="selectedClient"
    :options="roleOptions()"
    :clearable="isClearable"
    :multiple="isMultiple"
    placeholder=""
    :normalizer="normalizer"
    :class="{'has-label': label}"
    :noResultsText="$t('global.treeselect_noresults')"
  )
</template>

<script>
import BaseSelect from "@/components/shared/selectors/BaseSelector"
import { mapActions, mapState, mapGetters } from "vuex"
import { nullableTypeAnnotation } from "babel-types"
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
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState("roles", ["roles"]),
    selectedClient: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    },
    roleGetter() {
      return this.options.roleGetter || "getInternalRoles"
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    ...mapActions("roles", ["getRoles"]),
    ...mapGetters("roles", ["getInternalRoles", "getFixedRoles", "getClientAdminRoles", "getAdminRoles", "getUserRoles"]),
    roleOptions() {
      return this[this.roleGetter].call()
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.label,
        children: node.children
      }
    }
  }
}
</script>
