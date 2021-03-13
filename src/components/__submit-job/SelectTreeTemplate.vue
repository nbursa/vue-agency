<template lang="pug">
    treeselect.job-template--tree.basic__dropdown(
        v-model="result"
        :options="itemsWithDefault"
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
        :searchable="false"
      )
        label.template-value(slot="option-label" slot-scope="{ node }")
          span.label-text(:class="(node.id === 0) && 'default'") {{node.label}}
</template>
<script>
import TreeSelectMixin from '@/mixins/TreeSelect.mixin'

import '@/compiled-icons/__submit-job'

// TODO@mr icons & client icon

export default {
  mixins: [TreeSelectMixin],
  computed: {
    itemsWithDefault() {
      const defaultOption = {
        id: 0,
        name: this.$t('jobs_submit.select_tree_template_def_opt_name')
      }
      return [defaultOption, ...this.items]
    }
  }
}
</script>
<style lang="stylus">

  .template-value {
    align-content: center
    align-items: center
    align-self: center
  //   .template-icon {
  //     align-self: center
  //     fill: url(#svgicon-__submit-job-job-template-icon-a)!important
  //     font-size: 16px;
  //     line-height: 16px;
  // }
    .label-text {
      align-self: center
      // margin-left: 10px;
      font-size: 16px;
      line-height: 20px;;
       &:before {
        width: 20px;
        height: 20px;
        content: url('../../assets/icons/job-template-icon.png')
        margin-right: 7px;
        position: relative;
        top: 3px;
      }
      &.default {
        color: #856FF9;
        font-weight: 500
        &:before {
          left: 2px;
          margin-right: 9px;
          content: url('../../assets/icons/add.png')
        }
      }
    }
  }
.job-template--tree {

  justify-self: flex-end;
  .vue-treeselect {
    &__x-container {
       display: none;
      }
    &__control {
      max-width: 243px;
      background-color: #F2F2F2;
      }
    }
}
</style>
