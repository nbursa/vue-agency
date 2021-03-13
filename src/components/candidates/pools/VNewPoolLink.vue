<template lang="pug">
  base-button(@click="onAddClick")
    span {{ $t("candidate_pool.button_add_pool") }}
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  mounted() {},
  methods: {
    ...mapActions('candidatePools/sidebar', ['setSidebarComponent']),
    onAddClick() {
      this.setSidebarComponent('create')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
