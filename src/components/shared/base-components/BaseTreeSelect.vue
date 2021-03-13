<template lang="pug">
  div.base-tree-select-shared(:class="{'is-disabled': isDisabled}")
    div.rate(:class="{'rate--highlight': isFocused  }" v-show="showTree")
      div.rate__label(:class="{'rate__label--active' : isEditing || isFocused }")
        slot(name="label")

      treeselect.rate__dropdown(
        v-model="result"
        :options="items"
        :multiple="multiple"
        placeholder=""
        :disabled="isDisabled"
        @open="setFocused"
        @close="setFocused"
        :normalizer="normalizer"
        :disableBranchNodes="disableBranchNodes"
        :allowSelectingDisabledDescendants="allowSelectingDisabledDescendants"
        :valueFormat="valueFormat"
        :clearable="isClearable"
        :flat="flat"
        :openDirection="openDirection"
      )


</template>

<script>
import TreeSelectMixin from '@/mixins/TreeSelect.mixin'
export default {
  mixins: [TreeSelectMixin]
}
</script>
<style lang="stylus">
.base-tree-select-shared {
  &.is-disabled {
    background: #D2D3DD;
    opacity: 0.5;
    pointer-events: none;
    .vue-treeselect {
      &__control {
        background: #D2D3DD;
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
}
</style>
