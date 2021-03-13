<template lang="pug">
  div.item-panel(v-click-outside="closeDropdown")
    div.item-panel__head(@click="open = !open")
      slot(name="head")
      div.item-panel__arrow
        font-awesome-icon.item-panel__icon(:icon="arrows")
    transition(name="dropdown")
      div.item-panel__content(v-show="open" :style="{'width': `${width}px`}",@click="closeDropdown")
          slot(name="content")
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faArrowDown from "@fortawesome/fontawesome-free-solid/faAngleDown"
import faArrowUp from "@fortawesome/fontawesome-free-solid/faAngleUp"
import ClickOutside from "vue-click-outside"

export default {
  props: {
    width: {
      type: Number,
      required: false,
      default: 180
    }
  },
  data() {
    return {
      open: false
    }
  },
  directives: {
    ClickOutside
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    closeDropdown() {
      this.open = false
    }
  },
  computed: {
    arrows() {
      return this.open ? faArrowUp : faArrowDown
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/dropdown-animation';

.item-panel {
  position: relative;

  &__head {
    align-self: center;
    align-items: center;
    color: $textBlue;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-left: 20px;
  }

  &__icon {
    color: $iconGray;
  }

  &__content {
    position: absolute;
    right: 0;
    top: 60px;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.09);
    transform-origin: top;
    padding: 10px;
    z-index: 10;
  }
}
</style>

