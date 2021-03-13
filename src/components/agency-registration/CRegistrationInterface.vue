<template lang="pug">
div
  notifications(group="auth", position="top center")
  transition(name="slide-fade" mode="out-in")
    component(
      :is="loadComponent"
    )
</template>
<script>
import VRegisterAgency from "./VRegisterAgency"

export default {
    components: {
        VRegisterAgency
    },
    computed: {
        loadComponent() {
            return this.$route.meta.loadComponent
        }
    }
}
</script>
