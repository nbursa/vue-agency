
<template functional lang="pug">
div.candidate-portrait
    span.candidate-portrait__image(v-if="props.options.image")
      img(:src="props.options.image")
    span.candidate-portrait__name
      | {{ props.options.fullName}}

</template>

<script>

export default {
  functional: true,
  props: {
    options: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.candidate-portrait
  display inline-flex
  justify-content center
  align-items center
  padding-top 5px
  &__image
    height 32px
    width 32px
    margin-right 10px
    >img
      border-radius 50%
  &__name
    display inline-block

</style>
