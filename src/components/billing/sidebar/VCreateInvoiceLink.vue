<template lang="pug">
  a.button.is-tmpst-info.fullwidth-button(:href="pdfLink" target="_blank") {{$t("billing_sidebar.button_pdf")}}
</template>

<script>
export default {
  props: {
    pdfLink: {
      type: String,
      required: false,
      default: ""
    }
  },
  mounted() {},
  methods: {
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

.fullwidth-button
  width 100%
  justify-content center !important
  height 40px !important
  margin-top 10px
</style>