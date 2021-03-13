<template lang="pug">
  div.buttons.has-addons.scheduler-switcher
    .switch-box.switch-box__unfilled(:class="[selectedFilter.indexOf('unfilled') !== -1 ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('unfilled')"
        )
        span
    .switch-box.switch-box__filled(:class="[selectedFilter.indexOf('filled') !== -1 ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('filled')"
        )
        span

</template>

<script>
import { mapActions , mapState } from "vuex"

export default {
  props: {
    date: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    namespace: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    ...mapState({
      selectedFilter(state, getters) {
        return state[this.namespace].scheduler.controlFilters.clientFilters
      }
    })
  },
  methods: {
    ...mapActions({
      setFilter(dispatch, payload) {
        return dispatch(`${this.namespace}/scheduler/setSchedulerFilter`, payload)
      }
    }),
    onFilterClick(filter) {
      this.setFilter(filter)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scheduler-switcher {
  &.buttons {
    margin-bottom: 0px;
  }
}

.switch-box {
  margin-right: 0.7em;
  transition: width 0.25s;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 26px;
  height: 26px;
  box-shadow: inset 0 3px 3px 0 rgba(0,0,0,0.2);



  &__unfilled {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 18px;
      position: relative;
      height: 18px;
      display: block;
      border-radius: 50%;
      border: 1px solid $primary;
      &:after {
        content: "";
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        width: 12px;
        height: 6px;
        position: absolute;
        bottom: 2px;
        left: 2px;
        background-color: $primary;
      }
    }

  }

  &__filled {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 18px;
      position: relative;
      height: 18px;
      display: block;
      border-radius: 50%;
      border: 1px solid $primary;
      &:after {
        content: "";
        border-radius: 50%;
        width: 12px;
        height: 12px;
        position: absolute;
        bottom: 2px;
        left: 2px;
        background-color: $primary;
      }
    }
  }


  .icon {
    color: #ffffff;
  }

  &.active {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

  .button-icon {
    padding: 0px;
    cursor: pointer;
    font-size: 14px;
    background: transparent;
    border: none;
    outline: none;
    color: $primary;
    margin-bottom: 0px;

    &--list {
      left: 5px;
      top: 4px;
    }
  }
}
</style>


