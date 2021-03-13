<template lang="pug">
div
  header
    .sidebar-control
      v-new-pool-link
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t("candidate_pool.default_title") }}
      p.has-text-left {{ $t("candidate_pool.default_text") }}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VNewPoolLink from './VNewPoolLink'

export default {
  components: { VNewPoolLink },
  methods: {
    onAddClick() {
      this.$emit('sidebar:navigate', 'create')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
