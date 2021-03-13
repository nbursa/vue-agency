<template lang="pug">
div.client-header(@click="openModal")
  div.client-header__parent(v-if="data.rootName")
    p {{ data.rootName }}
  div.client-header__main
    svgicon.icon(name="job-schedule/nested-list" v-if="data.rootName") 
    p {{ data.name }}
</template>

<script>
import { mapActions } from "vuex"
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  methods:{
    ...mapActions("clientSchedule/modal", ["setModalComponent"]),

    openModal() {
      this.setModalComponent({modalComponent: "clientWorkers", modalData: this.data})
    }
  }
}
</script>

<style lang="stylus" scoped>
.client-header
  display flex
  align-items center
  justify-content center
  flex-direction column
  height 100%
  cursor pointer
  p
    display flex
    align-items center
  &__parent
    align-self flex-start
    font-size: 14px	
    line-height 19px
    color #9B9B9B
    padding-bottom 5px
  &__main
    p
      font-weight 600
      font-size 1rem
    .icon
      min-width 20px
      opacity 0.20
      margin-right 5px
    display flex
    align-self flex-start
    

</style>
