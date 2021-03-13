<template lang="pug">
div.text-tree-search.column.is-flex.date-search 
  svgicon.icon(name="user-roles/Search" :fill="false")
  treeselect(
    @open="onFocus"
    @close="onFocus"
    :class="backgroundClass"
    :multiple="false"
    :async="true"
    :placeholder="placeholder"
    :searchPromptText="$t('global.treeselect_default_msg')"
    :noResultsText="$t('global.treeselect_noresults')"
    :load-options="loadOptions"
    :clearable="true"
    v-model="selected"
    valueFormat="object"
  )
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import CDropdown from '@/components/shared/dropdown/CDropdown.vue'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Treeselect, ASYNC_SEARCH } from '@riophae/vue-treeselect'
import { mapActions, mapState, mapGetters } from 'vuex'
import { searchMixins } from '@/mixins/search.mixin'

import '@/compiled-icons/user-roles'

const options = {
  textParam: 'query',
  categoryParam: 'category'
}

export default {
  components: {
    CDropdown,
    FontAwesomeIcon,
    Treeselect
  },
  inject: ['namespace'],
  mixins: [searchMixins],
  props: {
    backgroundClass: {
      type: String,
      required: false,
      default: 'is-gray'
    },
    options: {
      type: Object,
      required: true
    },
    dropdownLabelOnly: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    placeholder: function() {
      return this.options.placeholder
          ? !this.selected && !this.focus ? this.$t(this.options.placeholder) : ''
          : !this.selected && !this.focus ? this.$t('global.search') : ''
    },
  },
  data() {
    return {
      selected: null,
      faSearch: faSearch,
      focus: false,
    }
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        this.search({ name: searchQuery }).then((results) => {
          const opts = this.options
          const options = results.map((result) => ({
            id: opts.value ? result[opts.value] : result.id,
            label: result.firstName + ' ' + result.lastName
          }))
          callback(null, options)
        })
      }
    },
    onFocus(val){
      this.focus = !this.focus;
    }
  }
}
</script>

<style lang="stylus">

@import '~@/assets/styles/global/variables';

.text-tree-search {
  max-width: 300px;
  position: relative;
  .icon {
    height: 12px;
    width: 12px;
    z-index: 1;
    left: 17px;
    top: 50%;
    transform: translateY(-50%)
    position: absolute;
  }
  .is-gray {
    .vue-treeselect__control {
      background-color: #F2F4F5;
      border: none;
    }
  }
  @media (max-width: $display-small-desktop) {
    max-width: 220px;
  }

  .vue-treeselect {
    &__single-value {
      line-height: 32px;
    }
    &__placeholder {
      line-height: 2.1 !important;
    }
    &__control {
      height: 32px;
      border-radius: 3px;
      padding-left: 20px;
    }
  }
}

.text-search {
  align-items: center;

  &__search-input {
    max-width: 200px;
    width: 100%;
    margin-right: 10px;
    position: relative;

    &--icon {
      position: absolute;
      font-size: 14px;
      left: 10px;
      top: 10px;
      color: $iconGray;
    }

    input {
      width: 100%;
      max-width: 200px;
      height: 32px;
      padding-left: 30px;
      border: 1px solid $darkGray;
      border-radius: 3px;
      font-size: 0.8125rem;
    }
  }

  &__search-dropdown {
    max-width: 150px;
    width: 100%;
  }

  &__submit {
    margin-left: 10px;

    button {
      background-color: #f3f6f7;
      border: 1px solid #c0c0c0;
      color: #878787;
      border-radius: none;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: #c0c0c0;
      }
    }
  }
}
</style>
