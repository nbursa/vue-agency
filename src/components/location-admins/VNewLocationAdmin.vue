<template lang="pug">
  base-button(@click="onAddClick") {{ $t("client_locations_sidebar.button_add_admin") }}
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  mounted() {},
  methods: {
    ...mapActions("locationAdmins/sidebar", ["setSidebarComponent"]),
    onAddClick() {
      this.setSidebarComponent("create")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
