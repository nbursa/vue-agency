<template lang="pug">
  div(@click.prevent="" @click.stop="" :class="{'disabled': !isClickable }")
    v-popover.status-indicator-cont(:disabled="!isClickable" offset="5" placement="right" popoverArrowClass="" popoverInnerClass="signatureInner" popoverWrapperClass="signatureWrapper")
      div.status-indicator.tooltip-target(:class="{'is-clickable': isClickable}")
        span.status-indicator__icon(v-if="showSignOffType")
          svgicon.icon(:name="typeIcon" :original="true")
        span.status-indicator__name(@click.prevent="") {{options.status.name}}
      template(slot="popover" v-if="showSignOffType")
        div.status-indicator__signature-popup
          div.status-indicator__signature-popup--image
            span Worker signature
            img(:src="options.signOff.tempSignature")
          div.status-indicator__signature-popup--image(style="margin-top: 15px")
            span Admin signature
            img(:src="options.signOff.adminSignature")


</template>
<script>
const signOffTypes = {
  "1": "admin-type",
  "2": "pin-type",
  "3": "signature-type",
  "4": "temp-type"
}
//temp_type - admin signoff pending

import "@/compiled-icons/job-schedule"
import ClickOutside from "vue-click-outside"


export default {
  directives:{
    ClickOutside
  },
  props: {
    options: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    showSignOffType() {
      return this.options.signOff
    },
    isClickable() {
      return this.options.signOff ? this.options.signOff.type === 3 : false
    },
    typeIcon() {
      return this.options.signOff && this.options.signOff.type ? `job-schedule/${signOffTypes[this.options.signOff.type]}` : ""
    }
  },
  methods: {
    openPopup(e) {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style lang="stylus">
.status-indicator-cont
  span
    outline none
  .status-indicator
    &.is-clickable
      &:hover
        .svg-fill
          fill #193748 !important
</style>

<style lang="stylus" scoped>
.disabled
  pointer-events none

.v-popover
  >span
    outline none

.status-indicator
  position: relative;
  display flex
  justify-content left
  align-items center
  &__name
    outline none !important
  &__icon
    margin-right 5px
    .icon
      width 20px
      height 20px
  &.is-clickable
    &:hover
      color #193748 !important

  &__signature-popup
    padding 15px
    z-index 3
    background-color white
    border-radius 6px
    height 285px
    width 220px
    box-shadow 0 2px 50px 0 rgba(0,0,0,0.14)
    &--image
      height 120px
      width 190px
      position relative
      border-radius 3px
      span
        position absolute
        color #9C9C9C
        font-size 12px
        display inline-block
        width 100%
        text-align center
        top 5px
      img
        width 100%
        height 100%
</style>
