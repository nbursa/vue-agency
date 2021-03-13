<template lang="pug">
  .bottom-notification-wrapp
    template(v-for="item in stack")
      NotificationCard(
        @toaster-click="reemit($event, item)"
        @remove-card="$emit('remove-card', item)"
        @animation-done="$emit('animation-done', item)"
        :item="item"
      )

</template>

<script>
import NotificationCard from "./VNotificationCard"

export default {
  components: {
    NotificationCard
  },
  props: {
    stack: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  methods: {
    reemit(e, item) {
      this.$emit("toaster-click", e, item)
    }
  }
}
</script>

<style lang="stylus" scoped>

    
    .bottom-notification-wrapp{
        z-index: 9998
        width 370px
        position fixed
        left 80px
        bottom 0
    }

</style>
