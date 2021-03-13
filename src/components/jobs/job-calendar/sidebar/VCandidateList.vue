<template lang="pug">
.listing
  div.search-input <!--.text-tree-search.column.is-4.is-flex.date-search -->
    svgicon.icon(name="user-roles/Search" :fill="false")
    input.input(type="text" :placeholder="$t('global.search')" v-model="search")
  div.listing__content(v-if="list")
   router-link.listing__candidate(:to="{path: `/candidate-details/${id}#calendar`}" v-for="({firstName, lastName, id}, index) in filteredCandidates" :key="index") {{ firstName }} {{ lastName }}


</template>

<script>
import { uniqBy } from "lodash"


export default {
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      search: ""
    }
  },
  computed: {
    candidateList: function() {
      return this.list.map(item => {
        return item.unavailability.user
      })
    },
    candidateDeduped: function() {
      return uniqBy(this.candidateList, 'id')
    },
    filteredCandidates: function() {
      const self = this
      return self.candidateDeduped.filter(item => {
        let concatName = `${item.firstName} ${item.lastName}`.toLowerCase()
        return concatName.indexOf(self.search.toLowerCase()) !== -1
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.listing {
  &__search {
    border: 1px solid #DFE6EB;
    border-radius: 3px;
    background-color: #FFFFFF;
  }

  &__candidate {
    color: #202123;
    font-size: 1rem;
    line-height: 22px;
    display: block;
    padding-bottom: 8px;
    &:hover {
      font-weight: bold;
    }
  }
}
.search-input {
  position: relative;
  margin-bottom: 12px;
  width: 100%;

  .icon {
    position: absolute;
    z-index: 5;
    color: #a3a3a3;
    left: 10px;
    top: 12px;
    width: 12px;
    height: 12px;
  }

  input {
    padding-left: 28px;
    height: 36px;
    border-radius: 3px;
    box-shadow: none;
    width: 100%;
    max-width: 100%;
    &:focus {
      outline: none;
      border-color: #dfe6eb;
      box-shadow: none;
    }
  }
}
</style>
