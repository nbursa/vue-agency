<template lang="pug">
div
  .tabs
    ul
      li(
        v-for="tab in tabs"
        :class="[tab.isActive ? 'is-active' : '']"
        )
        a(
          :aria-controls="tab.hash"
          @click.prevent="handle(tab.hash, $event)"
          :href="tab.hash"
          role="tab"
          ) {{ tab.name }}
  |
  .tab__content
    slot
</template>
<script>
import { mapActions } from "vuex"
export default {
  props: {
    sparseClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabs: []
    }
  },

  watch: {
    $route(to, from) {
      // Check if there is a tab with provided hash
      if (!this.findByHash(to.hash)) {
        this.$emit("tabs:no-such-tab")
        return false
      }
      this.selectTab(to.hash)
    }
  },

  mounted() {
    if (this.tabs.length) {
      /*
      * Select first tab on mount if no hash present in location bar
      */
      const { hash } = this.$route
      if (hash === "" || !this.findByHash(hash)) {
        this.selectTab(this.tabs[0].hash)
      } else {
        this.selectTab(hash)
      }
    }
    this.setTabIterations(this.tabs)
  },
  created() {
    this.tabs = this.$children
  },

  methods: {
    ...mapActions(["setActiveTab", "setTabIterations", "advanceTab"]),

    /*
     * Check if tabs can be selected sparingly
     */
    handle(hash, e) {
      if (!this.sparseClick) {
        console.log(
          "Sparse click is disabled, please use PREV or NEXT to navigate."
        )
        return
      }
      this.selectTab(hash, e)
    },

    findByHash(hash) {
      return this.tabs.find(tab => tab.hash === hash)
    },

    selectTab(selectedTabHash, event) {
      const selectedTab = this.findByHash(selectedTabHash)

      this.$emit("tabs:tab-changed", { tab: selectedTab })

      // Update url hash in browser location bar
      window.location.hash = selectedTabHash

      this.setActiveTab(selectedTab)

      this.tabs.forEach(tab => {
        tab.isActive = tab.hash === selectedTab.hash
      })
    },
    next() {
      this.advanceTab(1).then(next => {
        this.selectTab(this.tabs[next].hash)
      })
    },
    prev() {
      this.advanceTab(-1).then(next => {
        this.selectTab(this.tabs[next].hash)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>

.tabs ul {
  background: #fff;
  border-bottom: 2px solid lighten(#979797, 80%);
}

.tabs li {
  margin-left: 30px;

  a {
    color: #838D98;
    border-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    border-bottom: 2px solid transparent;
    transition: all 0.25s ease;
  }

  &.is-active {
    a {
      opacity: 1;
      color: $primary;
      font-weight: bold;
      border-color: $primary;
    }

    color: $primary;
  }

  & a:hover {
    color: $primary;
    opacity: 1;
    border-color: $primary;
  }
}
</style>
