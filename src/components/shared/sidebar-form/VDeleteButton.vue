
<template lang="pug">
  a(@click="onDeleteClick")
    svgicon(name="temp/delete-normal" :width="'26'" :height="'20'" :fill="false")
    span(v-if="$i18n.locale === 'en'") {{ $t("global.delete") }} {{ text }}
    span(v-else) {{ text }} {{ $t("global.delete") }}
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    onDeleteClick: function(e) {
      this.$emit("delete:item")
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';
</style>

