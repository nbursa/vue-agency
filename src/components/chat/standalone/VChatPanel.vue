<template lang="pug">
    .message-chat__top.is-clearfix
      span.message-chat__top-title {{ conversation ? conversation.name : 'Select conversation on the left' }}
      //- .message-chat__top-dropdown
      //-   CListDropdown
</template>


<script>
import "@/compiled-icons/messages-page"
import ClickOutside from "vue-click-outside"
import CListDropdown from "@/components/shared/dropdown/CListDropdown"

export default {
  components: {
    CListDropdown
  },
  props: {
    conversation: {
      type: null,
      required: true
    }
  }
}
</script>



<style lang="stylus" scoped>
.message-chat {
  &:before {
    position: absolute;
    content: '';
    top: 0;
    right: 12px;
    height: 100%;
    width: 1px;
    background: rgba(0, 0, 0, 0.6);
  }

  ::-webkit-scrollbar-track {
    background-color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #DCDCDC;
    border-radius: 25px;
  }

  &__top {
    border-bottom: 2px solid rgba(151, 151, 151, 0.2);
    padding: 14px 20px;
    background-color: white;
    position: relative;
    z-index: 1;
    flex: 0 0 55px;
    border-radius: 4px 4px 0 0;
  }

  &__top-title {
    font-size: 17px;
    font-weight: 700;
    float: left;
    user-select: none;
  }

  &__top-dropdown {
    float: right;
    margin-top: 8px;

    .c-list-dropdown {
      padding: 2px 0;
    }
  }
}
</style>
