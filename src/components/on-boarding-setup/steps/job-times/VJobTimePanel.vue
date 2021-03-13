<template lang="pug">
  .time-panel
    div.time-panel__color-strand(:style="{'background': time.jobtime.format.color }")
    div.time-panel__label.input-label-group
      input(:value="time.jobtime.name" @change="updateJobTime($event, time.index)" required='')
      label(for="input" ).control-label {{ $t("agency_structure.wheel_slice_name") }}
      //- button.button.time-panel__switch-button(@click.prevent="timepiece = !timepiece" :class="{'time-panel__switch-button--active': !timepiece}" v-if="time.jobtime.inherit_id !== 0")
      //-   svgicon.sidebar__icon(name="agency-structure/edit-normal" :fill="false")

    div.time-panel__time
      transition(name="slide-fade" mode="out-in")
        div(v-if="timepiece")
          span.time-panel__time--label {{ $t("agency_structure.wheel_slice_time") }}
          span.time-panel__time--value(v-if="timeFrom") {{timeFrom | nice-time}} - {{timeTo | nice-time}}
      transition(name="slide-fade" mode="out-in")
        div(v-if="!timepiece")
          span.time-panel__time--label {{ $t("agency_structure.wheel_slice_rate") }}
          c-dropdown.time-panel__dropdown(:data="options" v-model="payrate" :labelOnly="false")

</template>

<script>
import '@/compiled-icons/agency-structure/'
import CDropdown from '@/components/shared/dropdown/CDropdown.vue'

export default {
  components: {
    CDropdown
  },
  props: {
    time: {
      type: Object,
      required: true
    },
    activeTimes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      timepiece: true,
      selected: null
    }
  },
  computed: {
    timeFrom: function () {
      let timeToShow = this.time.jobtime.computedTime
        ? this.time.jobtime.computedTime.from
        : this.time.jobtime.from

      return timeToShow
    },
    timeTo: function () {
      let timeToShow = this.time.jobtime.computedTime
        ? this.time.jobtime.computedTime.to
        : this.time.jobtime.to

      return timeToShow
    },
    options: function () {
      return this.activeTimes.map((time) => {
        return {
          id: time.id,
          name: time.name,
          label: time.name
        }
      })
    },
    payrate: {
      get: function () {
        return this.selected
      },
      set: function (newValue) {
        this.selected = newValue

        const jobtime = {
          index: this.time.index,
          inherit_id: newValue.id
        }
        console.log('payrate set')
        this.$emit('jobtime-panel:update', jobtime)
      }
    }
  },
  mounted() {
    let findInherit = this.activeTimes.filter((time) => {
      if (time.id === this.time.jobtime.inherit_id) return time
    })[0]
    if (findInherit)
      this.selected = {
        id: findInherit.id,
        label: findInherit.name,
        name: findInherit.name
      }
  },
  methods: {
    updateJobTime(event, index) {
      let jobtime = { name: event.target.value, index: index }
      this.$emit('jobtime-panel:update', jobtime)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/label-input';

.placeholder {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #838D98;
  font-size: 18px;
  line-height: 24px;
}

.time-panel {
  display: flex;
  width: 100%;
  height: 65px;
  margin-bottom: 10px;
  border-radius: 3px;
  border: 1px solid $darkGray;
  position: relative;

  label {
    color: $fontGray !important;
  }

  input {
    color: $fontDark !important;
  }

  &__color-strand {
    width: 10px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: absolute;
    left: -1px;
    top: -1px;
    bottom: -1px;
  }

  &__label {
    width: 60%;
    margin-left: 22px;
  }

  &__switch-button {
    position: absolute;
    top: 2px;
    right: 0;
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 3px;
    color: $primary;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-right: 5px;

    &--active {
      color: white;
      background-color: $primary;
    }
  }

  &__time {
    border-left: 1px solid $darkGray;
    padding-left: 15px;
    padding-right: 10px;
    width: calc(44% - 10px);
    position: relative;

    div {
      display: inline-block;
      width: 100%;
      max-width: 115px;
    }

    &--label {
      display: block;
      font-size: 0.8215rem;
      margin-top: 10px;
      color: $fontGray;
    }

    &--value {
      font-size: 18px;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions. */
.slide-fade-enter-active {
  transition: all 0.3s ease;
  position: absolute;
  left: 10px;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
