<template lang="pug">
  base-button(@click="onAddClick")
    span {{ $t("documents_sidebar.button_add_document") }}
</template>

<script>
export default {
  mounted() {},
  methods: {
    onAddClick() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>