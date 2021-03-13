<template lang="pug">
  .right-sidebar-container
    .right-sidebar
      component(
        :is="getComponent"
        @sidebar:navigate="onNavigate"
      )
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    sidebarOptions: {
      type: Array,
      required: true
    },
    namespace: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      sidebarComponent(state, getters) {
        return state[this.namespace].sidebar.sidebarComponent
      },
      selected(state, getters) {
        return state[this.namespace].table.selected
      }
    }),
    getComponent() {
      return this.sidebarOptions.find(
        option => option.label === this.sidebarComponent
      ).component
    }
  },
  created() {
    if (!this.sidebarComponent) {
      this.setSidebarComponent("default")
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
    onNavigate(data) {
      if (data === "cancel") {
        data = "default"
      }
      this.setSidebarComponent(data)
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/partials/right-sidebar';
</style>
