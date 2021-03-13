<template lang="pug">
  transition(name="dropdown")
    .notifications-dropdown
      .notifications-dropdown__header
        slot(name="title")
      .notifications-dropdown__content(
        v-infinite-scroll="lazyLoad"
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="0")
        template(v-for="item in items")
          slot(v-bind:item="item")
      .notification__loader(v-show="isLoading")
        atom-spinner(
          :animation-duration="1000"
          :size="60"
          :color="'#856ff9'"
        )  
      .notifications-dropdown__footer
        slot(name="see-more")
          p [{{$t("navbartop.see_more")}}]
</template>
<script>
import infiniteScroll from 'vue-infinite-scroll'
import { AtomSpinner } from "epic-spinners"
import {isEmpty} from 'lodash'
import {mapActions, mapGetters} from 'vuex'
export default {
  directives: {infiniteScroll},
  components: { AtomSpinner },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    notificationType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      busy: false
    }
  },
  computed:{
    ...mapGetters("notifications", ["currentPage"])
  },
  methods: {
    ...mapActions("notifications", ["getList", "setNotificationsPage"]),
    fetchNotifications(page) {
      const options = {
        page
      }
      this.isLoading = true
      this.getList(options).then((data) => {
        if (!isEmpty(data.data)) {
          this.setNotificationsPage(data.meta.pagination.currentPage)
          this.busy = false
        }
        this.isLoading = false
      })
    },
    lazyLoad() {
      if (this.notificationType === 'other') {
        this.busy = true
        this.fetchNotifications(this.currentPage + 1)
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/dropdown-animation';

.notifications-dropdown {
  position: absolute;
  right: 5em;
  top: 5em;
  height: 400px;
  width: 360px;
  border-radius: 3px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.09);
  .notification__loader {
    position:absolute;
    bottom:2em;
    right:40%;
    width:70px;
    text-align:center;
  }

  &__header {
    padding: 9px 18px;
    color: black;
    font-size: 14px;
    border-bottom: 1px solid #EAEAEA;
  }

  &__content {
    height: 340px;
    overflow-y: auto;
  }

  &__footer {
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top: 2px solid #F4F4F4;
    background-color: white;
  }
}
</style>
