<template lang="pug">
  div.search-input.search-job-id
    input.input(type="number" v-model="jobId" :placeholder="placeholder")
    svgicon.icon(name="user-roles/Search" :fill="false")
</template>

<script>
import { searchMixins } from '@/mixins/search.mixin'

export default {
  mixins: [searchMixins],
  inject: ['namespace'],
  data() {
    return {
      placeholder: this.$t('jobs.job_id')
    }
  },
  computed: {
    jobId: {
      get() {
        if (this.searchParams.id) {
          return this.searchParams.id
        }
        return null
      },
      set(val) {
        this.updateSearch({
          id: val
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-job-id
  padding .75rem 0
  position relative
  .input
    height 32px
    background-color #f2f4f5
    border none
    box-shadow none
    font-size 13px
    padding-left 25px
    &::placeholder
      opacity 1
      color #868686
      font: 400 13.3333px Arial;
  .icon
    position absolute
    left 7px
    top 50%
    z-index 1
    height 12px
    width 12px
    transform translateY(-50%)
</style>
