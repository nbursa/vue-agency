<template lang="pug">
div
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t("requests.default_title") }}
      p.has-text-left {{ $t("requests.default_text") }}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  components: {},
  mounted() {},
  methods: {
    ...mapActions("clients", ["setSelected"]),
    onAddClick() {
      this.setSelected(0)
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>

