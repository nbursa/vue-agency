<template lang="pug">
  div.buttons.has-addons.scheduler-switcher
    .switch-box.switch-box__jobs(:class="[selectedFilter.indexOf('job') !== -1 ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('job')"
        )
        svgicon.icon(name="global/suitcase-normal" :width="'22'" :height="'20'" :fill="false")
    .switch-box.switch-box__holidays(:class="[selectedFilter.indexOf('holiday') !== -1 ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('holiday')"
        )
        svgicon.icon( name="candidates/holiday" :width="'18'" :height="'18'" :fill="false")
    .switch-box.switch-box__sickdays(:class="[selectedFilter.indexOf('sickday') !== -1 ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('sickday')"

        )
        svgicon.icon( name="candidates/sick-leave" :width="'18'" :height="'18'" :fill="false")
</template>

<script>
import { mapActions , mapState } from "vuex"


export default {
  components: {},
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
        return state[this.namespace].scheduler.controlFilters.teamFilters
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
  span {
    font-size: 11px;
    margin-right: 1em;
    line-height: 15px;
    color: #989DA2;
    padding-bottom: 1em;
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



  &__jobs {
    background-color: #4B9ED1;
  }

  &__holidays {
    background-color: #71CF72;
  }

  &__sickdays {
    background-color: #FC976E;
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


