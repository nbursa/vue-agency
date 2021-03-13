<template lang="pug">
  .c-time-dropdown(@click="open = !open")
    input(style="display: none" :value="value" ref="dropdown")
    .c-time-dropdown__selected
      span.c-time-dropdown__label(v-if="true") {{ selected }}
      span(v-else).c-time-dropdown__label.has-text-grey-light {{ placeholder}}
      //- font-awesome-icon.c-time-dropdown__icon(:icon="arrows")
    transition(name="dropdown")
      .c-time-dropdown__list(v-if="open")
        ul(v-for="item in data" )
          li.c-time-dropdown__item(@click="select(item)") {{ listItem(item) }}
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faAngleUp'
import DateTimeUtils from '@/utils/dateUtils.js'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [String, Object],
      default: '',
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
        return this.$localization && this.$localization.timeFormat
          ? DateTimeUtils.getFormattedTime(this.value)
          : this.value
      },
      set(value) {
        this.value = value
      }
    }
  },
  mounted() {},
  methods: {
    select(item) {
      const result = this.labelOnly ? item.label : item
      this.$emit('input', result)
    },
    listItem(item) {
      if (item.label) {
        return this.$localization && this.$localization.timeFormat
          ? DateTimeUtils.getFormattedTime(item.label)
          : item.label
      }
      return item.label || item.name
    }
  }
}
</script>

<style lang="stylus">

@import '~@/assets/styles/global/variables';

.c-time-dropdown {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;

  &__selected {
    background: white;
    border: 1px solid #DFE6EB;
    width: 85px;
    height: 30px;
    display: flex;
    border-radius: 3px;
    align-items: center;

    @media (max-width: $display-small-desktop) {
      width: 70px;
    }
  }

  &__list {
    width: 85px;
    border: 1px solid #DFE6EB;
    background: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    position: absolute;
    transform-origin: top;
    transition: transform 0.15s ease-in-out;
    z-index: 10;
    top: 100%;
    left: 0;
    height: 100px;
    overflow-y: auto;

    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      text-align: center;

      li {
        width: 100%;
      }
    }
  }

  &__item {
    display: inline-block;
    width: 35px;
    cursor: pointer;
    user-select: none;
    font-size: 16px;

    &:hover {
      opacity: 0.8;
      background-color: $primary;
      color: white;
    }
  }

  &__label {
    width: 100%;
    margin: 5px 10px 5px 10px;
    background: white;
    font-size: 1rem;
    font-size: 14px;
    text-align:center;

    @media (max-width: $display-small-desktop) {
      font-size: 12px;
      margin: 5px 2px;
      text-align: center;
    }
  }

  &__icon {
    margin: 5px 10px 5px 5px;
    width: 0.425em !important;
    opacity: 0.3;
  }
}

.dropdown-enter, .dropdown-leave-to {
  transform: scaleY(0);
}
</style>
