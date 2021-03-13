<template lang="pug">
  .search
    drawer-button(
      v-for="filter in filters",
      :options="filter",
      :key="filter.id",
      @input:submit="onSubmit"
    )
    .search--divider
    div.reset-button(v-if="this.options.config && this.options.config.hasReset")
      button(@click="resetSearchParams")
        svgicon.icon(name="job-schedule/delete-filters-active"  width="15px" height="12px" :fill="false")

</template>

<script>
import "@/compiled-icons/global"
import "@/compiled-icons/filters"
import DrawerButton from "./VDrawerButton.vue"
import { mapActions, mapState, mapGetters } from "vuex"
import { searchMixins } from "@/mixins/search.mixin"
import { isArray } from "@/utils/general"


export default {
  components: {
    DrawerButton
  },
  inject: ["namespace"],
  mixins: [searchMixins],
  props: {
    options: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    filters() {
      return  isArray(this.options) ? this.options : this.options.filters
    }
  },
  methods: {
    ...mapActions({
      resetSearchParams(dispatch, payload) {
        if (!this.namespace) {
          throw new Error("Namespace not set")
        }
        return dispatch(this.namespace + "/search/resetSearchParams", payload)
      }
    }),
    onSubmit(searchOptions) {
      let o = {}
      o[searchOptions.param] = searchOptions.value
      this.updateSearch(o)
    }
  }
}
</script>

<style lang="stylus" scoped>


.search {
  padding: 0 10px 0 0;

  .icon {
    color: $lighterBlue;
  }

  &--divider {
    float: left;
    width: 1px;
    height: 34px;
    position: relative;
    margin: 10px 0px 8px 0;
    padding: 2px 0px;
    &:after{
      content: ''
      position absolute
      left 0
      top 5px
      width 1px
      height 28px
      background $veryLightGray;
    }
  }
}

.search-wrap {
  float: left;
  border: 1px solid #C0C0C0;
  width: 34px;
  height: 34px;
  padding: 0;
  position: relative;
  margin-right: 10px;
  margin-top: 10px;
}

.reset-button {
  position: absolute;
  cursor: pointer;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);

  &:after {
    content: '';
    position: absolute;
    left: -12px;
    top: 5px;
    width: 1px;
    height: 19px;
    background: #d7d7d7;
  }

  button {
    background: transparent;
    border: 0;
    height: 26px;
    width: 26px;
    padding: 0;
    border-radius: 3px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;

    svg {
      margin-right: 1px;
    }

    .icon {
      color: #000000;
    }
  }
}
</style>
