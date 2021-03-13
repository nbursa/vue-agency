<template lang="pug">
div
  template(v-for="radioFilter in radioFilters")
    .custom-radio
      input(
        :id="radioFilter.id"
        type="radio"
        :name="radioFilter.name"
        :checked="radioFilter.checked"
      )
      label(
        :for="radioFilter.id"
      ) {{radioFilter.label}}

</template>

<script>
export default {
  props: {
    radioFilters: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/custom-radio';
</style>


