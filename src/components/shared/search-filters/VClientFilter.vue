<template lang="pug">
    v-client-selector.clients(
        v-model="selectedClients"
        v-bind="options.selectorOptions"
        :placeholder="$t(clientPlaceholder)"
        :flat="true"
    )
</template>

<script>
import VClientSelector from '@/components/shared/client-selector/VClientSelector'
import { searchMixins } from '@/mixins/search.mixin'

export default {
  components: {
    VClientSelector
  },
  mixins: [searchMixins],
  props: {
    options: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    clientPlaceholder: function () {
      return !this.selectedClients.length ? this.options.placeholder : ''
    },
    selectedClients: {
      get() {
        return this.searchParams[this.options.paramName] || []
      },
      set: function(value) {
        let payload = { [this.options.paramName]: value }
        this.updateSearch(payload)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.clients
    margin-left 20px
    max-width 30vw
    &.agency-selector
        height: 100%;
        padding: .75em 0;
        min-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        & >>> .vue-treeselect
            display inline-flex
            flex 1
            min-width 200px
            max-width 200px
            height 32px
            &--has-value
                .vue-treeselect__control
                    border: 1px solid #f2f4f5 !important
                    box-shadow none
                &:hover
                    .vue-treeselect__control
                        border: 1px solid #f2f4f5 !important
            &__control
                background-color #f2f4f5
                border 1px solid #f2f4f5
                display flex
                height: 100%;
                font-size 1rem
                &:hover
                    border-color #f2f4f5 !important
                .vue-treeselect__placeholder
                    line-height: 2.2;
                    color: #868686;
                    font: 400 13.3333px Arial;
                    display: flex;
                    align-items: center;
                    vertical-align: middle;
                .vue-treeselect__input-container
                    font-size .8rem
                .vue-treeselect__x-container
                    display flex
                    align-items center
                    justify-content center
</style>
