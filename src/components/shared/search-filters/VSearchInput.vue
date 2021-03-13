<template lang="pug">
div.search-input <!--.text-tree-search.column.is-4.is-flex.date-search -->
  svgicon.icon(name="user-roles/Search" :fill="false")
  input.input(type="text" :placeholder="options.placeholder ? $t(options.placeholder) : $t('global.search')" v-model="model")
  span.search-input__sortIcon(@click="changeSort" v-if="sortCheck")
    svgicon.item-title__arrow(name="user-roles/Arrow" :fill="false" :class="sortClass")
</template>

<script>
import { searchMixins } from '@/mixins/search.mixin'
import { mapActions, mapState, mapGetters } from 'vuex'
import { debounce } from 'lodash'

import '@/compiled-icons/user-roles'

export default {
  inject: ['namespace'],
  mixins: [searchMixins],
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    sortCheck() {
      return this.options.hasSort || false
    },
    paramName: function () {
      return ['reportInactivity', 'reportHours'].includes(this.$route.name)
        ? 'name'
        : this.options.paramName
    },
    model: {
      get() {
        return this.searchParams[this.paramName]
      },
      set: _.debounce(function (value) {
        let payload = this.sortCheck
          ? [
              { [this.paramName]: value },
              { sortBy: this.sortModel },
              { orderByRelation: 'users.first_name,last_name' },
              { orderBy: '' }
            ]
          : {
              [this.paramName]: value
            }
        this.updateSearch(payload)
      }, 750)
    },
    sortModel: {
      get() {
        return this.searchParams.sortBy || 'asc'
      },
      set(val) {
        this.updateSearch([
          { [this.paramName]: this.model },
          { sortBy: val },
          { orderByRelation: 'users.first_name,last_name' },
          { orderBy: '' }
        ])
      }
    },
    sortClass() {
      return this.sortModel === 'desc' ? 'is-desc' : 'is-asc'
    }
  },
  methods: {
    changeSort() {
      if (this.sortModel === 'desc') {
        this.sortModel = 'asc'
      } else {
        this.sortModel = 'desc'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>


.search-input {
  position: relative;
  max-width: 200px;
  margin: 0;
  padding: .75em 0;
  display: flex

  &.has-sort {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  &__sortIcon {
    position: absolute
    right: 0
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $white;
    cursor: pointer;
    border: 1px solid #dbdbdb;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    .is-desc {
      transform: rotate(180deg);
    }
  }

  .icon {
    position: absolute;
    z-index: 5;
    color: #a3a3a3;
    left: 10px;
    top: 24px;
    width: 12px;
    height: 12px;
  }

  input {
    padding-left: 28px;
    height: 32px;
    border-radius: 5px;
    box-shadow: none;
    max-width: 200px;
    width: 100%;
    background-color: #F2F4F5;
    border: none;

    &::placeholder {
      color: #868686;
      font: 400 13.3333px Arial;
    }

    &:focus {
      outline: none;
      border-color: #dfe6eb;
      box-shadow: none;
    }
  }
}
</style>
