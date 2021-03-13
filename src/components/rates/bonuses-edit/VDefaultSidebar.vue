
<template lang="pug">
div
  header
    .sidebar-control
      base-button(@click="onAddClick") {{$t("rates.sidebar_button_add_bonus")}}
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t("rates.sidebar_text[0]") }}
      p.has-text-left {{ $t("rates.sidebar_text[1]") }}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")

</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  mounted() {},
  methods: {
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar'

</style>

