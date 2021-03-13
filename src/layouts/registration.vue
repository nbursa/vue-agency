<template lang="pug">
  div.register
    button.button.login__lang-btt(@click="changeLang") {{this.$i18n.locale === "en" ? "DE" : "EN" }}
    <router-view></router-view>
</template>
<script>
import { titleUpdate } from "@/mixins/tabTitleUpdater"

export default {
  name: "Registration",
  mixins: [titleUpdate],
  methods: {
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "de" : "en"
    },
  }
}
</script>
<style lang="stylus" scoped>
  .register
    position relative
    &__lang-btt
      position absolute 
      top 15px
      right 20px
</style>
