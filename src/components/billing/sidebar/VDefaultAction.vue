
<template lang="pug">
div
  header
    .sidebar-control
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{$t("billing_sidebar.default_title")}}
      p.has-text-left {{$t("billing_sidebar.default_text")}}
      svgicon.svg-image.default-action.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from "vuex"
import CreateInvoice from "./VCreateInvoiceLink"

export default {
  components: {
    CreateInvoice
  },
  methods: {
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
.sidebar-control
  height 48px
</style>

