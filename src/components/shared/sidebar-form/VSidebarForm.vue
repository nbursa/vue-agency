<template lang="pug">
div
  form.sidebar-form
    slot
</template>

<script>
import { mapActions, mapState } from "vuex"
import VSidebarInput from "./VSidebarInput"

export default {
  components: {
    VSidebarInput
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
