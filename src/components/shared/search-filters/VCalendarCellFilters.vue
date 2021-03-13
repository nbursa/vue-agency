<template lang="pug">
  div.buttons.has-addons.calendar-switcher
    .switch-box.switch-box__jobs(:class="[calendarFilters.includes('job') ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('job')"
        )
        svgicon.icon(name="global/suitcase-normal" :width="'22'" :height="'20'" :fill="false")
    .switch-box.switch-box__holidays(:class="[calendarFilters.includes('holiday') ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('holiday')"
        )
        svgicon.icon( name="candidates/holiday" :width="'18'" :height="'18'" :fill="false")
    .switch-box.switch-box__sickdays(:class="[calendarFilters.includes('sickday') ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('sickday')"
        )
        svgicon.icon( name="candidates/sick-leave" :width="'18'" :height="'18'" :fill="false")
    .switch-box.switch-box__unavailable(:class="[calendarFilters.includes('unavailable') ? 'active' : '']")
      button.button-icon(
        @click="onFilterClick('unavailable')"
        )
        svgicon.icon(class="unavailable-icon" name="candidates/unavailable" :width="'22'" :height="'22'" :fill="false")
</template>

<style lang="stylus" scoped>
.calendar-switcher {
  margin-top: 5px;

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
  bottom: 0.5em;
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

  &__unavailable {
    background-color #DC143C
    .unavailable-icon {
      fill #ffffff
      left 50%
      top 50%
      transform translate(3px, 4px)
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

    &--list {
      left: 5px;
      top: 4px;
    }
  }
}
</style>


<script>
import { mapActions , mapState } from "vuex"

import "@/compiled-icons/candidates"
import "@/compiled-icons/job-schedule"
export default {
  components: {},
  computed: {
    ...mapState("jobManagement/calendar", ["calendarFilters"]),
  },
  methods: {
    ...mapActions("jobManagement/calendar", ["setFilter"]),
    onFilterClick(filter) {
      this.setFilter(filter)
    }
  }
}
</script>

