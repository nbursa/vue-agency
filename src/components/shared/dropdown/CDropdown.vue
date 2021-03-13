<template lang="pug">
  .c-dropdown(@click="open = !open" :class="[{'is-open' : open}, backgroundClass]" v-on-clickaway="away")
    input(style="display: none" :value="value" ref="dropdown")
    .c-dropdown__selected
      span.c-dropdown__label(v-if="selected") {{ selected.name || $t(selected.label) || $t(selected) }}
      span(v-else).c-dropdown__label {{ placeholder }}
      font-awesome-icon.c-dropdown__icon(:icon="arrows")
      .c-dropdown__list(v-if="open")
        ul(v-for="item in data" )
          li.c-dropdown__item(@click="select(item)") {{ $t(item.label) || item.name }}
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
import faArrowDown from "@fortawesome/fontawesome-free-solid/faAngleDown"
import faArrowUp from "@fortawesome/fontawesome-free-solid/faAngleUp"
import { mixin as clickaway } from 'vue-clickaway'

export default {
  components: {
    FontAwesomeIcon
  },
  mixins: [ clickaway ],
  props: {
    backgroundClass: {
      type: String,
      required: false,
      default: "is-gray"
    },
    data: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Object, Array],
      default: "",
      required: false
    },
    labelOnly: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    arrows() {
      return this.open ? faArrowUp : faArrowDown
    },
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.value = value
      }
    }
  },
  methods: {
    away() {
      this.open = false
    },
    select(item) {
      const result = this.labelOnly ? item.label || item.name : item
      this.$emit("input", result)
    }
  }
}
</script>

<style lang="stylus">


.c-dropdown {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 32px;

  &.is-open {
    .c-dropdown__selected {
      border-radius: 3px 3px 0 0;
    }
  }

  &.is-gray {
    border-radius: 3px;
    background-color: #F2F4F5;
    .c-dropdown__selected {
      border: none;
      background-color: #F2F4F5;
    }
  }

  &__selected {
    background: white;
    border: 1px solid #DFE6EB;
    width: 100%;
    display: flex;
    border-radius: 3px;
    align-items: center;
  }

  &__list {
    width: 100%;
    border: 1px solid #DFE6EB;
    border-top-color: #f4f6f8;
    background: white;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: absolute;
    transform-origin: top;
    padding: 5px;
    transition: transform 0.15s ease-in-out;
    z-index: 10;
    top: 100%;
    left: 0;
    margin-top: -1px;

    ul {
      margin: 0;
      padding: 0;
    }
  }

  &__item {
    display: inline-block;
    width: 100%;
    cursor: pointer;
    user-select: none;
    border-radius: 3px;
    transition: all 0.3s ease;
    font-size: 13px;
    color: #202123;
    padding: 3px 7px 1px;

    &:hover {
      background-color: #EDF3F6;
    }
  }

  &__label {
    width: 100%;
    margin: 5px 10px 5px 10px;
    color: #868686;
    font: 400 13.3333px Arial;
  }

  &__icon {
    margin: 5px 10px 5px 5px;
    width: 0.425em !important;
    opacity: 0.3;
  }
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter, .dropdown-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>
