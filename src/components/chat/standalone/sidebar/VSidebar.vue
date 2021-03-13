<template lang="pug">
  .sidebar
    .sidebar__inner
      .sidebar__search
        input(:placeholder="$t('message_board.search')" type="text" v-model="nameSearch")
        svgicon.icon(name="messages-page/search" :fill="false")
        .clear-search(@click="clearSearch")
          svgicon.clear-icon(name="global/close" color="#128aff" :fill="false")
      .sidebar__messages(v-for="conversation in filteredList")
        v-chat-conversation(
          @click.native="$emit('open-full-chat-conversation', conversation)"
          :conversation="conversation"
          )

</template>

<script>
import "@/compiled-icons/messages-page"
import VChatConversation from "./VChatConversation"

export default {
  components: {
    VChatConversation
  },
  props: {
    conversations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      nameSearch: ''
    }
  },
  computed: {
    filteredList() {
      return this.conversations.filter(chat => {
        return chat.name.toLowerCase().includes(this.nameSearch.toLowerCase())
      })
    }
  },
  methods: {
    clearSearch() {
      this.nameSearch = ''
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/mixins';

.sidebar {
  background-color: white;
  position: relative;
  overflow-y: auto;
  flex: 0 0 380px;

  &__inner {
    height: 100%;
    overflow-y: auto;
  }

  &__search {
    position: relative;
    border-bottom: 1px solid #f2f2f2;

    input {
      width: 100%;
      height: 52px;
      border: 0;
      padding: 0 10px 0 45px;
      font-size: 16px;

      +placeholder() {
        color: #838D98;
      }

      &:focus {
        outline: 0;
      }
    }

    .icon {
      width: 16px;
      height: 16px;
      position: absolute;
      left: 19px;
      top: 50%;
      transform: translateY(-50%);
    }

    .clear-search {
      width: 29px;
      height: 29px;
      position: absolute;
      right: 19px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .clear-icon {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }

  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    content: '';
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
    z-index: 1;
    pointer-events: none;
  }
}
</style>
