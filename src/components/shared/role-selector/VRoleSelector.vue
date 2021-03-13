<template lang="pug">
div.agency-selector
  div.agency-selector__label(v-if="label") {{ label }}

  treeselect.agency__dropdown(
    v-if="roles.length > 0"
    v-model="selectedRole"
    :options="roleOptions()"
    :clearable="isClearable"
    :multiple="isMultiple"
    valueFormat="object"
    placeholder=""
    :class="{'has-label': label}"
  )
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
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
      default: true
    },
    value: {
      required: false,
      type: [Array, Object],
      default: null
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    roleGetter: {
      type: String,
      required: false,
      default: "getUserRoles"
    }
  },
  computed: {
    ...mapState("roles", ["roles"]),
    selectedRole: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    ...mapActions("roles", ["getRoles"]),
    ...mapGetters("roles", ["getUserRoles", "getAdminRoles","getFixedRoles", "getClientAdminRoles"]),
    roleOptions() {
      return this[this.roleGetter].call()
    }
  }
}
</script>

<style lang="stylus">


.vue-treeselect {
  &__single-value {
    line-height: 38px;
  }
}

.vue-treeselect__control {
  border: 1px solid red;
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
  }
}

.has-label {
  float: right;
  width: 60%;
}
</style>
