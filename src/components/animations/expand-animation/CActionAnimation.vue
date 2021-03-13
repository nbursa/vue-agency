<template lang="pug">
  div.expand-container(
    ref="expandcont"
    @mouseleave.stop="leave"
    :class="mode"
  )
    div.expand-container__content(
      @mouseenter.stop="enter"
    )
      div.expand-container__content-item(
        v-show="mode !== 'press' || show"
      )
        slot
    div.expand-container__anchor(v-if="mode === 'press'")
      a.expand-container__anchor--arrow(
        @click.prevent="toggleSidebar"
        :class="{'open': open}"
      ) 
        font-awesome-icon.icon(:icon="arrows")

</template>

<script>
import anime from 'animejs'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'drag'
    },
    duration: {
      type: Number,
      required: false,
      default: 250
    },
    maxWidth: {
      type: Number,
      required: false,
      default: 425
    },
    minWidth: {
      type: Number,
      required: false,
      default: 10
    }
  },

  data() {
    return {
      show: false,
      open: false,
      mouseActive: true,
      initWidth: null
    }
  },
  computed: {
    arrows() {
      return this.open ? faArrowUp : faArrowDown
    }
  },
  created() {
    this.$on('toggle', () => {
      this.enter()
    })
  },
  methods: {
    toggleSidebar(e, done) {
      const el = this.$refs.expandcont
      anime({
        targets: el,
        width: {
          value: this.open ? this.minWidth : this.maxWidth,
          duration: this.duration
        },
        round: 1,
        easing: 'easeInOutCirc',
        begin: () => {
          this.mouseActive = this.open
          this.show = true
        },
        complete: () => {
          this.open = !this.open
          if (!this.open) this.show = false
        }
      })
    },
    enter(e, done) {
      if (!this.mouseActive || this.open) return
      const el = this.$refs.expandcont
      if (el.getBoundingClientRect().width === this.minWidth) {
        anime({
          targets: el,
          width: {
            value: this.maxWidth,
            duration: this.duration
          },
          round: 1,
          easing: 'easeInOutCirc',
          begin: () => {
            this.show = true
          },
          complete: () => {
            this.open = true
          }
        })
      }
    },
    leave(e, done) {
      if (!this.mouseActive || !this.open) return
      const el = this.$refs.expandcont
      anime({
        targets: el,
        width: {
          value: this.minWidth,
          duration: this.duration
        },
        round: 1,
        easing: 'easeInOutCirc',
        begin: () => {},
        complete: () => {
          this.show = false
          this.open = false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
$buttonSize = 30px

.expand-container

  &__content
    position relative
    overflow hidden
    height 100%
    &-item
      height 100%
  &__anchor
    width 0
    position absolute
    left 0
    top 0
    display flex
    flex-direction column
    justify-content center
    height calc(100vh - 70px)
    &--arrow
      z-index 10
      position absolute
      top 50%
      left - ($buttonSize - 10px)
      display block
      height $buttonSize * 2
      width $buttonSize
      border-bottom-left-radius $buttonSize * 2
      border-top-left-radius $buttonSize * 2
      color white
      font-weight bold
      display flex
      justify-content center
      align-items center
      background-color $primary
      &.open
        left - ($buttonSize)
      .icon
        transform rotate(90deg)
  &.press
    position: absolute
  &.collapsed
    width 0
</style>
