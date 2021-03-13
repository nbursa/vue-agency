<template lang="pug">
div.drawer-button(style="float:left;" v-show="!isHidden")
  .search-box(:class="{ 'active': isOpen , 'open': hasSearchText() || alwaysOpen }")
    button.icon(@click="toggleInput", ref="button" v-tooltip.bottom-start="$t(options.text)")
      svgicon.icon(:name="options.icon" :width="'16'" :height="'16'" :fill="false" :class="{'active': isOpen || alwaysOpen }" )

    component(
      :is="options.component"
      label=""
      :value="model"
      :isMultiple="isMultiple"
      :isClearable="clearable"
      v-bind="{ options: options.componentOptions }"
      @input="emitEvent"
      @selector-values="hideOnEmpty"
      :data="options.data"
    )
</template>

<script>
import ClickOutside from "vue-click-outside"
import "@/compiled-icons/global"
import _ from "lodash"
import { mapState } from "vuex"

export default {
  directives: {
    ClickOutside
  },
  inject: ["namespace"],
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSelectOpen: false,
      isOpen: false,
      isActive: null,
      clearable: true,
      searchText: "",
      names: [],
      isHidden: false,
      client: null
    }
  },
  computed: {
    isMultiple: function() {
      return this.options.isMultiple ? true : false
    },
    ...mapState({
      model(state, getters) {
        const optionName = this.options.param
        const value = state[this.namespace].search.params[optionName]

        if (value) {
          return isNaN(value) ? value : parseInt(value)
        } else {
          return null
        }
      }
    }),
    alwaysOpen: function() {
      return this.options.config ? this.options.config.alwaysOpen : false
    }
  },
  watch: {
    model: function(newValue) {
      if (!newValue) {
        this.isOpen = false
      }
    }
  },
  created() {
    // if (this.$route.query[this.options.param]) {
    //   this.searchText = this.$route.query[this.options.param]
    //   this.isOpen = true
    // }
  },
  methods: {
    onFieldSelect() {
      console.log("trt")
    },
    hideOnEmpty(val) {
      this.isHidden = val === 0 ? true : false
    },
    emitEvent(selected) {
      this.$emit("input:submit", {
        param: this.options.param,
        value: selected
      })
    },
    closeSelect() {
      this.names = ""
    },
    toggleInput: _.throttle(function(e) {
      if (this.isOpen && this.hasSearchText()) {
        this.searchText = ""
        this.emitEvent()
      }
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        setTimeout(() => {
          //this.$refs.input.focus()
        }, 250)
      }
    }, 250),
    onBlur(e) {
      if (e.relatedTarget === this.$refs.button) {
        return
      }
      if (!this.hasSearchText()) {
        setTimeout(() => (this.isOpen = false), 100)
      }
      this.emitEvent()
    },
    submitActiveTab(e) {
      if (this.isActive !== null) {
        this.searchText = this.names[this.isActive]
      } else {
        this.searchText = e
      }
    },
    hasSearchText() {
      return this.searchText.length > 0 || (this.model && toString(this.model).length > 0) ? true : false
    }
  }
}
</script>
<style lang="stylus">
.drawer-button {
  .vue-treeselect {
    width: calc(100% + 2px);
    &__single-value {
      height: 31px;
      line-height: 31px;
    }
    &__control {
      height: 31px;
    }
  }
}
</style>

<style lang="stylus">


.vue-treeselect {
  &__single-value {
    line-height: 38px;
  }
}

.search-box {
  transition: max-width 0.25s;
  border-radius: 3px;
  background-color: white;
  overflow: hidden;
  float: left;
  position: relative;
  padding-left: 32px;
  margin: 13px 10px 13px 0;
  border: 1px solid #E1E1E1;
  border-radius: 6px;
  height: 32px;
  max-width: 32px;

  button {
    width: 100%;
    height: 100%;
  }

  .icon {
    position: absolute;
    left: 4px;
    cursor: pointer;
    font-size: 14px;
    background: transparent;
    border: none;
    outline: none;
    color: $iconBlue;
    stroke-width: 0;
    fill: $primary;

    &.active {
      fill: #fff;
      color: #fff;
    }
  }

  .drawer-tree {
    .vue-treeselect {
      &__input {
        max-width: 400px;
      }

      &__single-value {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }

  input {
    // border: 1px solid $iconBlue;
    line-height: 30px;
    font-size: 16px;
    color: #747474;
    padding-right: 25px;
    width: auto !important;

    &:focus {
      outline: none;
    }
  }

  &.active, &.open {
    max-width: 250px;
    overflow: visible;
    background-color: $iconBlue;
    .icon {
      fill: #fff;
      color: #fff;
    }
    //box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
}

.search-select {
  background-color: #fff;
  width: 300px;
  height: 400px;
  top: 6em;
  position: absolute;
  z-index: 100;
  overflow-y: auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.2);

  &__row {
    padding: 0.5em;

    &:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }

    &.active {
      background-color: #f1f1f1;
    }
  }
}
</style>
