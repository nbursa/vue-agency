<template lang="pug">
.cell-expand
  .cell-expand__title-block(@click="isOpen = !isOpen" :class="{'disabled': isDisabled}")
    span.cell-expand__title {{ title }}
    svgicon.cell-expand__arrow(name="user-roles/Arrow" :fill="false" :class="{'open': isOpen}")
  transition(name="detail-slide-out")
    .cell-expand__data-block(v-show="isOpen")
      slot

</template>



<script>
import "@/compiled-icons/user-roles"
import { isEmpty } from "lodash"


export default {
  props:{
    title: {
      type: String,
      required: true,
      default: "Title"
    },
    itemCheck: {
      type: Number,
      required: false,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    //becouse slot updating is not working
    isDisabled: function() {
      return this.itemCheck === 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.cell-expand {
  padding: 22px 22px 0px 22px;
  &__title-block {
      cursor: pointer;
      width: 100%;
      padding 0 0.6rem;
      min-height: 44px;
      border-radius: 6px;
      background-color: #F8F8F8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
  }
  &__arrow {
    width: 10px;
    height: 10px;
    &.open {
      transform: rotate(180deg)
    }
  }
  &__title {
    padding: 0 20px;
    color: #202123;
    font-weight: 600;
    font-size: 1.125rem;
  }
  &__data-block {
    margin-top: 10px;
  }
}

.detail-slide-out-enter-active,
.detail-slide-out-leave-active {
  transition: all 0.3s;
}
.detail-slide-out-enter,
.detail-slide-out-leave-to
{
  opacity: 0;
}

</style>
