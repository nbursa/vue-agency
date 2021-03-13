<template lang="pug">
  .column.column-fixed.side-padding-0
    ul.predefined-filters
      search-link(v-for="link in this.options", :options="link", :key="link.id", @link:click="onSearchClick", :navigate="navigate")
</template>

<script>
import SearchLink from "./VSearchLink.vue"
import { mapActions, mapState, mapGetters } from "vuex"
import { searchMixins } from "@/mixins/search.mixin"

export default {
  components: {
    SearchLink
  },
  mixins: [searchMixins],
  props: {
    options: {
      type: Array,
      required: true
    },
    namespace: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      navigate: false
    }
  },
  computed: {},
  methods: {
    onSearchClick(filter) {
      let searchOptions = {}
      filter = filter === "all" ? "" : filter
      searchOptions.group = filter
      this.updateSearch(searchOptions)
    }
  }
}
</script>

<style lang="stylus">
.side-padding-0{
  padding-left 0
  padding-right 0
}
.predefined-filters {
  width: 100%;
  float: left;

  li {
    float: left;
    margin-right: 30px;
    padding-bottom: 0.6em;
    padding-top: 0.2em;

    &:hover {
      opacity: 0.8;
      border-bottom: 2px solid #856ff9;

      > a {
        color: #856ff9;
        // font-weight: bold;
      }
    }

    a {
      color: #52788B;
    }
  }
}

.column-fixed {
  height: 50px;
}
</style>
