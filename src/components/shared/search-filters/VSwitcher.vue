<template lang="pug">
  div.buttons.has-addons.calendar-switcher
    span  {{$t("jobs.view")}}
    .switch-box(:class="[activeView === 'VJobCalendar'? 'active' : '']")
      button.icon(
        @click="onCalendarClick"
        )
        svgicon(:class="[activeView === 'VJobCalendar'? 'active' : '']" name="job-schedule/position" :width="'20'" :height="'20'" :fill="false")
    .switch-box(:class="[activeView === 'VJobTable'? 'active' : '']")
      button.icon(
        @click="onListClick"
        :class="[activeView === 'VJobTable'? 'active' : '']"
        )
        svgicon(:class="[activeView === 'VJobTable'? 'active' : '']" name="job-schedule/list-view" :width="'20'" :height="'20'" :fill="false")
</template>

<style lang="stylus" scoped>
.calendar-switcher {
  position: absolute;
  top: 8px;
  right: 4px;

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
  overflow: hidden;
  float: left;
  position: relative;
  padding-left: 34px;
  margin: 10px 10px 10px 0;
  width: 32px;
  height: 34px;
  bottom: 0.5em;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);

  // display: flex;
  // align-items: center;
  // justify-content: center;
  &.active {
    background-color: $primary;

    .icon {
      svg {
        color: #fff;
      }
    }
  }

  .icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 14px;
    background: transparent;
    border: none;
    outline: none;
    color: $primary;
    padding: 0;

    svg {
      color: #252A3B;
    }
  }
}
</style>


<script>
import "@/compiled-icons/job-schedule"
export default {
  components: {},
  props: {
    activeView: {
      type: String,
      required: true
    }
  },
  methods: {
    onListClick() {
      this.$router.push({ path: "/clients" })
    },
    onCalendarClick() {
      this.$router.push({ path: "/clients-map" })
    }
  }
}
</script>

