<template lang="pug">
  div.buttons.has-addons.calendar-switcher
    span  {{$t("jobs.view")}}
    .switch-box(:class="[active === 'hourly'? 'active' : '', enabledHourly ? '' : 'disabled']")
      button.icon(
        @click="updateTableMode('hourly')"
        v-tooltip.bottom-start="$t('tooltips.rate_editing.hourly_switch')"
        )
        svgicon.icon(:class="[active === 'hourly'? 'active' : '']" name="pay-rates/hourly" :width="'22'" :height="'20'" :fill="false")
    .switch-box(:class="[active === 'daily'? 'active' : '', enabledDaily ? '' : 'disabled']")
      button.icon(
        @click="updateTableMode('daily')"
        :class="[active === 'daily'? 'active' : '']"
        v-tooltip.bottom-start="$t('tooltips.rate_editing.daily_switch')"
        )
        svgicon.icon.icon--list(:class="[active === 'daily'? 'active' : '']" name="pay-rates/daily" :width="'18'" :height="'18'" :fill="false")
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

  &.active {
    background-color: $primary;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .icon {
    position: absolute;
    left: 3px;
    top: 3px;
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

    // stroke-width 0
    &.active {
      color: #fff;
    }
  }
}
</style>


<script>
import "@/compiled-icons/pay-rates"
import { mapActions, mapState } from "vuex"

const modeMap = {
  1: "hourly",
  2: "daily"
}

export default {
  components: {},
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState("rates", ["tableMode"]),
    ...mapState("onboarding/agencySettings", ["profile"]),
    active() {
      return this.tableMode || this.options.tableMode
    },
    enabledDaily() {
      return this.profile && [0,2].includes(this.profile.rateType)
    },
    enabledHourly() {
      return this.profile && [0,1].includes(this.profile.rateType)
    }

  },
  created() {
    this.getProfile().then(response => {
      if(response.rateType !== 0) {
        this.updateTableMode(modeMap[response.rateType])
      }
    })

  },
  methods: {
    ...mapActions("rates", ["updateTableMode"]),
    ...mapActions("onboarding/agencySettings", ["getProfile"])
  }
}
</script>

