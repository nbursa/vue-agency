<template lang="pug">
.leave-tracker
  .custom-checkbox
    input(id="trackEnabled" type="checkbox" v-model="internalTrack")
    label(for="trackEnabled") {{ $t("agency_structure.agency_track_label") }}
  transition(name="dropdown")
    .leave-tracker__container(v-show="internalTrack")
      .input-label-group
        input.is-expandable(
          name="fullTimeAllowance"
          type="text"
          placeholder=""
          v-model.number="fulltimeAllowance"
          required
        )
        label.control-label {{ $t("agency_structure.agency_track_fulltime") }}
      .input-label-group
        input.is-expandable(
          name="parttimeAllowance"
          type="text"
          placeholder=""
          v-model.number="parttimeAllowance"
          required
        )
        label.control-label {{ $t("agency_structure.agency_track_parttime") }}
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    internalTrack: {
      get() {
        return this.options.isTracked
      },
      set(val) {
        this.$emit("leave-tracker:update", {key: "isHolidayTracked", value: val})
      }
    },
    fulltimeAllowance: {
      get() {
        return this.options.defaultFulltime
      },
      set(val) {
        this.$emit("leave-tracker:update", {key: "fullTimeDefaultHoliday", value: val})
      }
    },
    parttimeAllowance: {
      get() {
        return this.options.defaultParttime
      },
      set(val) {
        this.$emit("leave-tracker:update", {key: "partTimeDefaultHoliday", value: val})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
$font-size = 18px;
$active-font-size = 13px;
$active-top = 0.4rem;
$label-color = #838D98;
$active-color = $focus-color = $label-color

@import '~@/assets/styles/global/custom-checkbox';
@import '~@/assets/styles/global/label-input';
@import '~@/assets/styles/global/dropdown-animation';


.leave-tracker
  border 1px solid #DFE6EB
  padding 10px 20px
  border-radius 3px
  .custom-checkbox
    display flex
    justify-content space-between
    label
      font-size 18px
      line-height 24px

.input-label-group {
  .control-label {
    top: 18px;
    padding-top: 0;
    padding-left: 20px;
  }

  &.disabled {
    background-color: #D2D3DD;
    opacity: 0.5;
    pointer-events: none;
  }
  input {
    border: 1px solid #DFE6EB;
    border-radius: 3px;
    height: 60px;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: 600;

    &.is-expandable {
      padding-top: 19px;
    }

    &:focus {
      border-color: #856ff9;
    }
  }
  }

.input-label-group input:focus ~.control-label, .input-label-group input:valid ~.control-label, .input-label-group input.has-value ~.control-label {
  top: 7px;
}


.input-label-group {
  margin: 1em 0;
  position: relative;

  &.error {
    input {
      border-color: #D0021B;
    }
  }

  .help {
    position: absolute;
    background-color: #D0021B;
    color: white;
    font-size: 11px;
    padding: 4px 11px;
    border-radius: 4px;
    left: calc(100% + 12px);
    top: -4px;
    white-space: nowrap;

    &:after {
      position: absolute;
      top: 0;
      left: -4px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #D0021B;
      content: '';
    }
  }
}

</style>
