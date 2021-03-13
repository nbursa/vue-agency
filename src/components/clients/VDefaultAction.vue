
<template lang="pug">
div
  header
    .sidebar-control
      base-button(@click="onAddClick") {{$t("client_locations_sidebar.button_add_client")}}
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{$t("client_locations_sidebar.default_title")}}
      p.has-text-left {{$t("client_locations_sidebar.default_text")}}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  components: {},
  mounted() {},
  methods: {
    ...mapActions("clients", [
      "setSelected"
    ]),
    onAddClick() {
      this.setSelected(0)
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

