
<template lang="pug">
div
  header
    .sidebar-control
      add-document(namespace="documents")
  section
    .default-content
      h2.is-size-5.has-text-weight-bold {{ $t("documents_sidebar.default_inspect_title") }}
      p.has-text-left {{ $t("documents_sidebar.default_inspect_text") }}
      svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
</template>

<script>
import { mapActions, mapState } from "vuex"
import AddDocument from "./VAddDocumentLink"

export default {
  components: {
    AddDocument
  },
  mounted() {},
  methods: {
    onAddClick() {
      this.$emit("sidebar:navigate", "manage")
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
</style>

