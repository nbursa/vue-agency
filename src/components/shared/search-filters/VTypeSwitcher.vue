<template lang="pug">
.column
  .type-switcher.is-pulled-right
    .type-switcher--label
      span.is-size-7.has-text-grey {{ $t("requests.switch_message") }}
    .type-switcher--btns
      .switch-box(:class="[activeView === 'holiday'? 'active' : '']")
        button.icon(
            @click="toggleHoliday"
          )
          svgicon.icon(
            :class="[activeView === 'holiday'? 'active' : '']"
            name="candidates/holiday"
            :width="'23'"
            :height="'23'"
            :fill="false"
          )
      .switch-box(:class="[activeView === 'sick-leave' ? 'active' : '']")
        button.icon(
            @click="toggleSickLeave"
            :class="[activeView === 'sick-leave'? 'active' : '']"
          )
          svgicon.icon(
            :class="[activeView === 'sick-leave'? 'active' : '']"
            name="candidates/sick-leave"
            :width="'23'"
            :height="'23'"
            :fill="false"
          )
      .switch-box(:class="[activeView === 'unavailable' ? 'active' : '']")
        button.icon(
            @click="toggleUnavailable"
            :class="[activeView === 'unavailable' ? 'active' : '']"
          )
          svgicon.icon(
            class="unavailable-icon"
            :class="[activeView === 'unavailable' ? 'active' : '']"
            name="candidates/unavailable"
            :width="'30'"
            :height="'30'"
          )

</template>
<script>
import { searchMixins } from "@/mixins/search.mixin"
import { mapActions, mapState, mapGetters } from "vuex"
import { has } from "lodash"

export default {
  mixins: [searchMixins],
  inject: ["namespace"],
  data() {
    return {
      activeView: "holiday"
    }
  },
  computed: {
    ...mapState("notifications", ["notificationAction"])
  },
  watch: {
    notificationAction: function(val) {
      this.changeSwitcherDependingOnAction()
    },
    "$route.query": function(newVal, oldVal) {
      if (!has(newVal, "type") || newVal == undefined) {
        this.activeView = 'holiday'
        this.toggleHoliday()
      } else if (has(newVal, "type") && !has(oldVal, "type")) {
        const isHoliday = newVal.type === "holiday" ? true : false
        const isSickLeave = newVal.type === "sick-leave" ? true : false
        const isUnavailable = newVal.type === "unavailable" ? true : false
        if (isHoliday) {
          this.activeView = 'holiday'
          this.toggleHoliday()
        } else if (isSickLeave) {
          this.activeView = 'sick-leave'
          this.toggleSickLeave()
        } else if (isUnavailable) {
          this.activeView = 'unavailable'
          this.toggleUnavailable()
        }
      }
    },
  },
  mounted() {
    this.changeSwitcherDependingOnAction()
  },
  methods: {
    ...mapActions("notifications", ["resetNotificationActionModel"]),
    ...mapActions({
      selected(dispatch, payload) {
        return dispatch(
          this.namespace + "/sidebar/setSidebarComponent",
          "default"
        )
      }
    }),
    changeSwitcherDependingOnAction() {
      let action = this.notificationAction
      let query = this.$route.query
      const { params } = action
      if (has(params, "type") || has(query, "type")) {
        const type = params.type || query.type
        if (type === "holiday") {
          this.toggleHoliday()
        }
        else if (type === "sick-leave") {
          this.toggleSickLeave()
        }
        else if (type === "unavailable") {
          this.toggleUnavailable()
        }
        else if (has(params, "type")) {
          this.resetNotificationActionModel()
        }
      }
    },
    toggleHoliday() {
      this.selected()
      this.updateSearch({
        type: "holiday"
      })
      this.activeView = "holiday"
    },
    toggleSickLeave() {
      this.selected()
      this.updateSearch({
        type: "sick-leave"
      })
      this.activeView = "sick-leave"
    },
    toggleUnavailable() {
      this.selected()
      this.updateSearch({
        type: "unavailable"
      })
      this.activeView = "unavailable"
    }
  }
}
</script>

<style lang="stylus" scoped>
.type-switcher {
  width: 320px;
  display: flex;

  &--label {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &--btns {
    flex: 1;
  }
}

.switch-box {
  transition: width 0.25s;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
  float: left;
  position: relative;
  padding-left: 34px;
  margin: 0 10px 0 0;
  width: 32px;
  height: 34px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);

  &.active {
    background-color: $primary;
  }

  .icon {
    position: absolute;
    left: 2.5px;
    top: 3px;
    cursor: pointer;
    font-size: 14px;
    background: transparent;
    border: none;
    outline: none;
    color: $primary;

    &.active {
      color: #fff;
    }
    
    &.unavailable-icon {
      color $primary
      left 3px
      top 4px

      &.active {
        color #fff
      }

    }
  }
}
</style>

