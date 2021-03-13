<template lang="pug">
div <!--.text-tree-search.column.is-4.is-flex.date-search -->
  component(
    :is="options.component"
    label=""
    :value="model"
    :options="options"
  )
</template>

<script>
import { searchMixins } from "@/mixins/search.mixin"
import { mapActions, mapState, mapGetters } from "vuex"

const options = {
  textParam: "query",
  categoryParam: "category"
}

export default {
  components: {},
  inject: ["namespace"],
  mixins: [searchMixins],
  props: {
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
  data() {
    return {
      selected: null,
      model: null
    }
  },
  watch: {
    selected: function(candidateId) {
      if (candidateId) {
        let o = {}
        o[this.options.param] = candidateId
        this.updateSearch(o)
      }
    }
  },
  methods: {}
}
</script>

<style lang="stylus">


.text-tree-search {
  max-width: 300px;
  padding-left: 0;
  .vue-treeselect__control .vue-treeselect__placeholder {
    display: flex;
    align-items: center;
    color: #868686;
    width: 100%;
    font: 400 13.3333px Arial;
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
