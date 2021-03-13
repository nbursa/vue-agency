<template lang="pug">
  base-button(@click="onAddClick")
    span {{ $t("candidates_sidebar.add_candidate") }}
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  mounted() {},
  methods: {
    ...mapActions('candidates/sidebar', ['setSidebarComponent']),
    onAddClick() {
      this.setSidebarComponent('create')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
