<template lang="pug">
  .slideout-container(
      ref="slidecont"
    )
    slot
</template>

<script>
import anime from "animejs"

export default {
  components: {},
  props: {
    duration: {
      type: Number,
      required: false,
      default: 250
    },
    maxWidth: {
      type: Number,
      required: true
    },
    minWidth: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      open: false,
      initWidth: null
    }
  },
  computed: {},
  watch: {
    "$route.path": {
      handler: "leave"
    }
  },
  created() {
    this.$on("sidenav:toggle", this.toggleSidebar)
  },
  methods: {
    toggleSidebar(e, done) {
      const el = this.$refs.slidecont

      anime({
        targets: el,
        width: {
          value: this.open ? this.minWidth : this.maxWidth,
          duration: this.duration
        },
        round: 1,
        easing: "easeInOutCirc",
        complete: () => {
          this.open = !this.open
        }
      })
    },

    //mousehover callbacks
    enter(e, done) {
      const el = e.target
      if (el.getBoundingClientRect().width === this.minWidth) {
        anime({
          targets: el,
          width: {
            value: this.maxWidth,
            duration: this.duration
          },
          round: 1,
          easing: "easeInOutCirc",
          complete: done
        })
      }
    },
    leave(e, done) {
      const el = this.$refs.slidecont
      anime({
        targets: el,
        width: {
          value: this.minWidth,
          duration: this.duration
        },
        round: 1,
        easing: "easeInOutCirc",
        complete: () => {
          this.open = false
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>

.slideout-container {
  height: calc(100vh - 70px);
  position: relative;
  z-index: 99999;
}
</style>
