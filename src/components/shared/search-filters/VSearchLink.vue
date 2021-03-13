<template lang="pug">
div
  li(:class="{'is-active': isRouteActive}" @click="onSearchClick")
    router-link(:to="options.slug" active-class="active" v-if="navigate") {{ $t(options.label) }}
    a(:to="options.slug" active-class="active" v-else) {{ $t(options.label) }}
</template>

<script>
import { isEmpty } from "lodash"
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    navigate: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    isRouteActive: function() {
      const slugKey = Object.keys(this.options.slug)[0]

      if (this.options.id === 0 && !this.$route.query.group) {
        return true
      }

      if (
        this.$route.meta.caption === this.options.slug[slugKey].split("/")[1]
      ) {
        return true
      }
      if (
        this.$route.path === this.options.slug[slugKey]
      ) {
        return true
      }
      return (
        this.$route[slugKey] === this.options.slug[slugKey] ||
        this.options.slug === this.$route.query.group
      )
    }
  },
  methods: {
    onSearchClick(e) {
      e.preventDefault()
      const filterItem = this.options.custom
        ? this.options.custom
        : this.options.slug
      this.$emit("link:click", filterItem)
    }
  }
}
</script>

<style lang="stylus" scoped>
.is-active {
  opacity: 0.8;
  border-bottom: 2px solid #856ff9;

  a {
    color: #856ff9;
    font-weight: bold;
  }
}
</style>