
<template lang="pug">
  div
    //- header
    //-   .sidebar-control
    section
      .default-content
        h2.is-size-5.has-text-weight-bold {{ $t("reporting.title") }}
        p.has-text-left {{$t("reporting.sidebar_desc")}}
        svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  components: {},
  mounted() {},
  methods: {
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

<style lang="stylus" scoped>
.default-content
   margin-top -4em
@import '~@/assets/styles/global/partials/right-sidebar';
</style>