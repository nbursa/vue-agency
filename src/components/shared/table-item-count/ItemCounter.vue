<template lang="pug">
  div
    div.item-counter
      span.item-counter__uploaded {{options.uploadedDocuments}}
      span.item-counter__total &nbsp;/ {{options.totalDocuments}}
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.item-counter {
  color: #202123;

  &__uploaded {
    opacity: 1;
  }
  &__total {
    opacity: 0.5;
  }
}
</style>
