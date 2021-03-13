<template lang="pug">
  .drawer(
    ref="drawer"
    :style="{'width': getWidth }"
  )
    slot
    .drawer__drag-point(
      :class="{'drawer__drag-point--resizing' : resizing}"
      v-if="mode === 'drag'"
      @mousedown="start"
      @mouseup="stop"
    )
</template>

<script>
import { getDimension, widthControl, deriveWidth, parcel } from './animate'
import { rangeChecker } from '@/utils/validation.js'

export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: 'drag'
    },
    startingWidthParcel: {
      type: Number,
      required: false,
      validator: (value) => rangeChecker({ min: 1, max: 100, val: value })
    },
    maxWidthParcel: {
      type: Number,
      required: false,
      default: 80,
      validator: (value) => rangeChecker({ min: 1, max: 100, val: value })
    },
    minWidthParcel: {
      type: Number,
      required: false,
      default: 50,
      validator: (value) => rangeChecker({ min: 1, max: 100, val: value })
    }
  },
  data() {
    return {
      width: '400',
      initWidth: null,
      resizing: false
    }
  },
  computed: {
    getWidth() {
      return {
        drag: `${this.width}px`,
        press: '100%',
        collapsed: '100%'
      }[this.mode]
    }
  },
  mounted() {
    this.setParcelInitial()
    window.addEventListener('resize', this.setParcelInitial)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setParcelInitial)
  },
  methods: {
    setParcelInitial() {
      this.width = deriveWidth({
        container: this.$refs.drawer.parentNode,
        parcel: this.startingWidthParcel,
        dimension: 'width'
      })
    },
    start(e) {
      this.resizing = true
      window.addEventListener('mousemove', this.moving)
      window.addEventListener('mouseup', this.stop)
    },
    moving(e) {
      e.preventDefault()
      const container = this.$refs.drawer
      const parent = container.parentNode

      let offset =
        e.clientX -
        getDimension({ container: container, dimension: 'left' }).left
      let parentWidth = getDimension({ container: parent, dimension: 'width' })
        .width

      if (!this.resizing) return

      //TODO resolve offset break here
      this.width =
        offset >= parcel({ width: parentWidth, parcel: this.minWidthParcel })
          ? offset
          : parcel({ width: parentWidth, parcel: this.minWidthParcel })

      let drawerState = {
        drawerWidth: this.width,
        parentWidth: parentWidth,
        parcelWidth: this.maxWidthParcel
      }
      widthControl(drawerState, this.preventDrag)
    },
    preventDrag(drawer) {
      this.width = drawer.parentWidth * (drawer.parcelWidth / 100)
    },
    stop(e) {
      e.preventDefault()

      this.resizing = false
      window.removeEventListener('mousemove', this.moving)
      window.removeEventListener('mouseup', this.stop)
    }
  }
}
</script>
<style lang="stylus" scoped>


.drawer {
  position: relative;

  &__drag-point {
    cursor: e-resize;
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% + 70px);
    width: 10px;

    &--resizing {
      border-right: 2px solid;
      border-right-color: $primary;
    }

    &:hover {
      border-right: 2px solid;
      border-right-color: $primary;
    }
  }
}
</style>
