<template lang="pug">
  treeselect.create-shift--tree(
        :class="{'light' : light, 'isDisabled' : isDisabled}"
        v-model="result"
        :options="items"
        :multiple="multiple"
        :placeholder="placeholder"
        :disabled="isDisabled"
        @open="setFocused"
        @close="setFocused"
        :normalizer="normalizer"
        :disableBranchNodes="disableBranchNodes"
        :allowSelectingDisabledDescendants="allowSelectingDisabledDescendants"
        :valueFormat="valueFormat"
        :clearable="isClearable"
        :flat="flat"
      )
</template>
<script>
import TreeSelectMixin from '@/mixins/TreeSelect.mixin'
export default {
  mixins: [TreeSelectMixin],
  props: {
    light: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.create-shift--tree {
  min-width: 95px;
  // &.isDisabled {
  //   & >>> .vue-treeselect {
  //       &__control {
  //         background-color: rgba(242,242,242, .3);
  //         }
  //     }
  //   }
  & >>> .vue-treeselect {
    &__x-container {
       display: none;
      }
    &__single-value {
        line-height: 35px;
      }
    &__control {
      text-align: center;
      width: 95px;
      height: 35px;
      line-height: 35px;
      border: none!important;
      background-color: #F2F2F2;
      border-radius: 8px;
      &-arrow-container {
        display: none;
        }
      }
    }
    &.light {
      & >>> .vue-treeselect {
        &__control {
          background-color: #fff;
          border: .5px solid #dcdcdc!important
        }
      }
    }
}
</style>
