<template lang="pug">
  base-button(@click="onAddClick")
    span {{ $t("internal_users_sidebar.button_add_new") }}
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  mounted() {},
  methods: {
    ...mapActions("users/sidebar", ["setSidebarComponent"]),
    onAddClick() {
      this.setSidebarComponent("create")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
