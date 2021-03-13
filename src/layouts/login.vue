<template lang="pug">
  div.login
    //- button.button.login__lang-btt(@click="changeLang") {{ this.$i18n.locale.toUpperCase() }}
    <router-view></router-view>
</template>
<script>
import { titleUpdate } from "@/mixins/tabTitleUpdater"

export default {
  name: "login",
  mixins: [titleUpdate],
  methods: {
    changeLang() {
      let langs = ["en", "de_un", "de"]
      let currentIndex = langs.indexOf(this.$i18n.locale) || 0
      if (currentIndex < langs.length - 1) {
        return this.$i18n.locale = langs[currentIndex + 1]
      }
      return this.$i18n.locale = langs[0]
    },
  }
}
</script>
<style lang="stylus" scoped>
  .login
    position relative
    &__lang-btt
      position absolute 
      top 15px
      right 20px
</style>
