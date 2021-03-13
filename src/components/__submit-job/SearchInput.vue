<template lang="pug">
  .search-wrap--content
    .search-input-wrapper(v-show="activeInput")
      input.search-input(type="text" v-model="term" ref="searchInput")
    .search-btn(@click="resetSearch")
      svgicon(name="__submit-job/search" color="#856FF9")
</template>
<script>
// TODO@mr add animation when toggle search
import '@/compiled-icons/__submit-job'
export default {
  props: {
    onSearch: {
      type: Function,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
      activeInput: false,
      term: ''
    }
  },
  watch: {
    term(term) {
      if (term !== '') this.onSearch(term)
      if (term === '') this.onSearch(false)
    }
  },

  methods: {
    resetSearch() {
      if (this.activeInput) {
        this.onSearch(false)
      }
      this.activeInput = !this.activeInput
      this.term = ''

      if (this.activeInput) {
        this.$nextTick(() => this.$refs.searchInput.focus())
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.search-wrap {
  &--content {
    max-width: 170px;
    display: flex;
    flex-direction: row;
    background: #f2f2f2;
    border-radius: 8px;
    .search-btn {
      width: 35px;
      height: 35px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
  }
  .search-input {
    height: 35px;
    max-width: 135px;
    border:none;
    background:none;
    padding-left: 10px
    }
  }

}
</style>
