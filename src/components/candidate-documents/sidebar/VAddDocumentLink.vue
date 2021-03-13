<template lang="pug">
  base-button(@click="onAddClick")
    span {{ $t("documents_sidebar.button_add_document") }}
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    namespace: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    ...mapActions({
      setSidebarComponent(dispatch, payload) {
        return dispatch(
          this.namespace + "/sidebar/setSidebarComponent",
          payload
        )
      }
    }),
    onAddClick() {
      this.setSidebarComponent("create")
      this.$router.push({ path: "/documents" })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>