<template lang="pug">
  .column.column-fixed.is-full.side-padding-0
    ul.predefined-filters
      search-link(v-for="link in links", :options="link", :key="link.id", @link:click="onSearchClick")
</template>

<script>
import SearchLink from "./VSearchLink.vue"

export default {
  components: {
    SearchLink
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      links: this.options
    }
  },
  methods: {
    onSearchClick(filter) {
      let searchOptions = {}
      searchOptions.param = "state"
      searchOptions.value = filter
      this.$emit("search:submit", searchOptions)
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