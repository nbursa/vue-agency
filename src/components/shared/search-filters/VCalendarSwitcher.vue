<template lang="pug">
  div.buttons.has-addons.calendar-switcher
    span  {{$t("jobs.view")}}
   
    .switch-box(:class="[activeView === 'CTeamView'? 'active' : '']"  v-if="$can('view', 'Temp')"  )
      button.icon(
        @click="onTeamClick"
        :class="[activeView === 'CTeamView'? 'active' : '']"
        v-tooltip.bottom-start="$t('tooltips.job_submit.switcher_teamview')"
        )
        svgicon.icon.icon--list(:class="[activeView === 'CTeamView'? 'active' : '']" name="job-schedule/change-view/client-view" :width="'18'" :height="'18'" :fill="true")
    .switch-box(:class="[activeView === 'CClientView'? 'active' : '']" v-if="$can('view', 'Client')  ")
      button.icon(
        @click="onClientClick"
        :class="[activeView === 'CClientView'? 'active' : '']"
        v-tooltip.bottom-start="$t('tooltips.job_submit.switcher_clientview')"
        )
        svgicon.icon.icon--list(:class="[activeView === 'CClientView'? 'active' : '']" name="job-schedule/change-view/team-view" :width="'18'" :height="'18'" :fill="true")
    //- .switch-box(:class="[activeView === 'VTimesheetTable'? 'active' : '']")
    //-   button.icon(
    //-     @click="onTimesheetClick"
    //-     v-tooltip.bottom-start="$t('tooltips.job_submit.switcher_timesheet')"
    //-     )
    //-     svgicon.icon(:class="[activeView === 'VTimesheetTable'? 'active' : '']" name="job-schedule/change-view/time-sheet" :width="'22'" :height="'20'" :fill="true")
    .switch-box(:class="[activeView === 'VJobCalendar'? 'active' : '']")
      button.icon(
        @click="onCalendarClick"
        v-tooltip.bottom-start="$t('tooltips.job_submit.switcher_calendar')"
        )
        svgicon.icon(:class="[activeView === 'VJobCalendar'? 'active' : '']" name="job-schedule/change-view/calendar-view" :width="'22'" :height="'20'" :fill="true")
    .switch-box(:class="[activeView === 'VJobTable'? 'active' : '']")
      button.icon(
        @click="onListClick"
        :class="[activeView === 'VJobTable'? 'active' : '']"
        v-tooltip.bottom-start="$t('tooltips.job_submit.switcher_table')"
        )
        svgicon.icon.icon--list(:class="[activeView === 'VJobTable'? 'active' : '']" name="job-schedule/change-view/list-view" :width="'18'" :height="'18'" :fill="true")

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
  margin: 10px 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 34px;
  bottom: 0.5em;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  svg {
    fill: $primary;
  }
  &.active {
    background-color: $primary;
    svg {
      fill: #fff;
    }
  }

  .icon {
    // position: absolute;
    // left: 3px;
    // top: 3px;
    cursor: pointer;
    font-size: 14px;
    background: transparent;
    border: none;
    outline: none;
    color: $primary;
    padding-left: 1px;
    padding-right: 1px;
    &--list {
      left: 5px;
      top: 4px;
    }
    path {
      fill-opacity: 1;
    }
    // stroke-width 0
    &.active {
      color: #fff;
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
      this.$router.push({ path: "/jobs" })
    },
    onCalendarClick() {
      this.$router.push({ path: "/jobs/calendar" })
    },
    onClientClick() {
      this.$router.push({ path: "/jobs/clients" })
    },
    onTeamClick() {
      this.$router.push({ path: "/jobs/team" })
    },
    // onTimesheetClick() {
    //   this.$router.push({ path: "/jobs/timesheets" })
    // }
  }
}
</script>

