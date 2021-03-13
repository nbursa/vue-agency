<template lang="pug">
div.has-tab-content(v-if="isActive")
  .tab-is-loading(v-show="isLoading")
    atom-spinner(
      :animation-duration="1000"
      :size="60"
      :color="'#ff1d5e'"
      )
  slot
</template>
<script>
import { AtomSpinner } from 'epic-spinners'
export default {
  components: { AtomSpinner },
  props: {
    /*
    * @param id - When you want some other thing to appear in url hash link
    */
    id: {
      type: String,
      default: null
    },
    /*
    * Unless the above id is given as a prop, this will be default url hash
    * link
    */
    name: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    hash() {
      if (this.isDisabled) {
        return "#"
      }
      /*
      * Sanitize url has link value
      */
      return this.id
        ? "#" + this.id
        : "#" + this.name.toLowerCase().replace(/ /g, "-")
    }
  }
}
</script>
<style lang="stylus" scoped>
.section {
  padding: 0 1.5rem;
}
.has-tab-content
  position relative
  .tab-is-loading
    display flex
    justify-content center
    align-items center
    font-size 4em
    position absolute
    width 100%
    height 100%
    background-color rgba( white, .6 )
    z-index 1
</style>
