<template lang="pug">
  c-slideout-animation(
    :maxWidth="260"
    :minWidth="65"
  )
    v-navbar
</template>
<script>
import VNavbar from "./navbar/VNavbar.vue"
import CSlideoutAnimation from "@/components/animations/slideout-animation/CSlideoutAnimation.vue"

export default {
  components: {
    VNavbar,
    CSlideoutAnimation
  }
}
</script>

