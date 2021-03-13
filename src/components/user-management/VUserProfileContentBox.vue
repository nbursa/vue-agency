<template lang="pug">
  .columns
    .column(
      class="\
      on-boarding-content-box\
      "
      )
      .panel#panel-section
        .panel-heading(
          :class="panelHeadingStyle"
          v-if="hasDescription"
          )
          slot(name="description")
        .panel-block(style="border-top:0;")
          slot
        .panel-footer.is-clearfix(v-show="ctrls.length || !!$slots.panelFooter")
          slot(name="panelFooter")
            button.button(
              :disabled="checkButtonDisabled(k)"
              v-for="({ k, v }) in ctrls"
              v-text="$t(v.text)"
              @click="handle( v.action )"
              class="button"
              :class="v.style.join(' ')"
              )
</template>
<script>
import { mapState, mapGetters } from "vuex"
export default {
  props: {
    controls: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState(["tabState"]),
    ...mapGetters(["noPreviousTab", "noNextTab"]),
    ctrls: function() {
      return Object.entries(this.controls)
        .map(entry => {
          return {
            k: entry[0],
            v: entry[1]
          }
        })
        .filter(o => {
          return this.emptyNav ? o.k !== "prev" && o.k !== "next" : o.k !== null
        })
    },
    tabIndex: function() {
      let { iterations, active } = this.tabState
      return iterations.indexOf(active.hash) + 1
    },
    hasDescription: function() {
      return !!this.$slots["description"]
    },
    panelHeadingStyle: function() {
      return ["is-size-7", "is-custom"].join(" ")
    },
    emptyNav: function() {
      return this.noPreviousTab && this.noNextTab
    }
  },
  methods: {
    handle(action) {
      action !== "childSubmit" ? action() : this.submitInChild()
    },
    submitInChild() {
      console.log("submitting in child...")
      /*
       * Fail gracefully if child does not provide submit() method
       */
      try {
        this.$children[0].submit()
      } catch (_) {
        console.log("Child has no submit() method, please provide one.")
      }
    },
    checkButtonDisabled(text) {
      return (
        (text.toLowerCase() === "prev" && this.noPreviousTab) ||
        (text.toLowerCase() === "next" && this.noNextTab)
      )
    }
  }
}
</script>
<style lang="stylus" scoped>


.section {
  padding: 0rem 1.5rem;
}

.on-boarding-content-box {
  // max-width: 872px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.is-tmpst-info {
  height: 40px;
  width: 140px;
  border-radius: 3px;
  background: linear-gradient(225deg, $primary 0%, $secondary 100%);
  color: white;
  border: 0;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
  }
}

.is-custom {
  padding: 1em;
  background-color: white;
}

.panel {
  background-color: #FFFFFF;
  // box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  padding-top: 15px;
}

.panel-heading:first-child {
  color: $fontDark;
  font-size: 0.875rem !important;
  line-height: 1.188rem;
  padding: 20px 30px;
  border: 0;
  border-radius: 3px 3px 0 0;
  // border-bottom: 1px solid #DFE6EB;
}

.panel-block {
  border: 0;
  border-radius: 3px 3px 0 0;

  // border-bottom: 2px solid #DFE6EB;
  &--overflow {
    height: 55vh;
    overflow-y: auto;
    display: block;
  }
}

.panel-footer {
  display: flex;
  justify-content: flex-end;
  border: 0;
  border-radius: 0 0 0 4px;
  padding: 1em;

  // box-shadow: 0 -2px 5px 1px rgba(0, 0, 0, 0.03);
  button {
    margin-right: 1em;
  }
}

.panel-heading.has-description {
  background-color: white;
  color: orange;
}

.is-pulled-left--custom {
  order: -1;
  margin-right: auto !important;
}
</style>
