<template lang="pug">
  div.columns
    .column.is-3.label-wrapper
      slot(name="label")
      span.required(v-if="required") *
    .column.is-9
      treeselect.basic__dropdown(
        :class="{'custom__warining-icon': noResultsText === $t('jobs_submit.job_details_template_no_options') }"
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
        @search-change="addSearched"
        :noOptionsText="noOptionsText"
        :noResultsText="noResultsText"
      )
        label.select-value(slot="option-label" slot-scope="{ node }")
          div.label-text(:class="{'default' : node.id === 0}") 
            span {{node.label}}
            div(
              v-if="removable && node.isHighlighted" 
              @click="removeItem(node, $event)" 
              @select="removeItem(node, $event)")
              svgicon.remove-icon( width="17px" height="19px" name="__submit-job/trash-alt" color="#FD4C6C")       
  
</template>
<script>
import TreeSelectMixin from '@/mixins/TreeSelect.mixin'
import '@/compiled-icons/__submit-job'

export default {
  mixins: [TreeSelectMixin],
  props: {
    optionGroup: {
      type: String,
      required: false,
      default: ''
    },
    defaultoption: {
      type: Object,
      required: false,
      default: () => null
    },
    removable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    itemsWithDefault() {
      return this.items
      if (this.defaultoption === null) return this.items
      return [this.defaultoption, ...this.items]
    }
  },
  methods: {
    addSearched(a) {
      this.$emit('searchField', a)
    },
    removeItem(val, e) {
      this.$emit('removeItem', { template: val, event: e })
    }
  }
}
</script>
<style lang="stylus">

.label-wrapper {
  align-self: center
  label {
    font-size: 16px;
    color: #888;
  }
  .required {
    color: #FD4C6C;
    }
}

 .basic__dropdown {
  .vue-treeselect {
    &__control {
          border-radius: 8px;
          background: #F2F2F2;
          border: none;
          height: 35px;
        }
    &__placeholder {
          color: #333;
          font-size: 16px;
          line-height: 35px;
      }
    &__menu {
      padding: 10px 5px 10px 10px;
    }
    &__option {
        &--highlight {
          background: #f2f2f2;
          border-radius: 8px;
        }
        &--selected {
          .remove-icon {
            display: none
          }
        }
      }
    &__x-container {
      width: 10px;
    }
    &__control-arrow-container {
      width: 40px;
      &:after {
        content: url('../../assets/icons/arrow-down.png')
        transform: none;
        position: static;
        top: auto;
        left: auto;
        border: none;
      }
    }
    &__single-value {
      line-height: 35px;
      }
    }
    .select-value {
      padding-left: 10px
      display: flex;
      align-items: center;
      align-content: center;
      width: 100%
      .label-text {
        display: flex;
        width: 100%;
        justify-content: space-between;

        .remove-icon {
          align-self: center;
          z-index: 999999
          cursor pointer
        }
      }

    }

    &.vue-treeselect--disabled {
        .vue-treeselect {
          &__control {
            background: #ffffff
            border: solid 0.5px #dcdcdc;
            }
          &__placeholder {
            color: #AFAFAF;
            }
           &__control-arrow-container {
             &:after {
               opacity: .3
            }
           }
        }
      }
    &.vue-treeselect--multi {
        .vue-treeselect {
          &__control {
            background: #ffffff;
            border: none;
            &-arrow-container {
              display: none;
              }
            }
          &__placeholder {
            color: #856FF9;
            font-weight: 600;
            font-family: Aileron-SemiBold;
            &:after {
              content: url('../../assets/icons/add_bold.png')
              margin-left: 7px;
              position: relative;
              top: 4px;
              }
            }
          &__multi-value-item {
              font-family: Aileron-SemiBold;
              color: #856FF9;
              font-size: 16px;
              background: rgba(133, 111, 249, 0.15);
              border-radius: 7px;
              padding: 4px 8px;
              height: 35px;
            }
          &__value-remove  {
              border: none;
              color: #856FF9;
            }
        }
      }
  }
  .custom__warining-icon {
    .vue-treeselect {
      &__icon-warning {
        background: none;
        &:after {
          content: url('../../assets/icons/save-template.png')
          left: -10px;
          top: -4px;
          border: none;
          width: 12px;
          height: 12px;
          }
      }
    }
  }
</style>
