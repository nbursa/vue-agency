<template lang="pug">
  .main-container(
    :class="viewMode"
  )
    c-drawer-animation.main-container__main-view.main-container--overflow(
      :mode="viewMode"
      :startingWidthParcel="75",
      :maxWidthParcel="75"
      :minWidthParcel="65"
    )
      slot.main-container__manipulations(name="manipulations")
      slot(name="view")
    c-action-animation.main-container__actions(
      :mode="viewMode"
    )
      slot(name="actions")
    slot(name="modal")

</template>

<script>
import CDrawerAnimation from '@/components/animations/slideout-animation/CDrawerAnimation.vue'
import CActionAnimation from '@/components/animations/expand-animation/CActionAnimation.vue'

//@param {string} mode ("drag", "press")
export default {
  components: {
    CDrawerAnimation,
    CActionAnimation
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  computed: {
    viewMode: function () {
      return this.$route.name === 'reportPayroll' ? 'drag' : 'drag'
    }
  }
}
</script>
