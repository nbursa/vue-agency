<template lang="pug">
  .pagination(v-if="!lEmpty(pageData)")
    div.pagination__legend
      | {{$t("paginator.showing")}}
      span {{currentPage}}
      | {{$t("paginator.of")}}
      span {{totalPages}}
    div.pagination__legend
      | {{$t("paginator.total")}}
      span {{totalItems}}
    ul.pagination__list
      li.pagination__item.pagination__item--last
        a(:class="{ disabled: hasNext }" @click.prevent="onFirstClick") {{$t("paginator.first")}}
      li.pagination__item.pagination__item--first
        a(:class="{ disabled: hasPrevious }" @click.prevent="onPreviousClick") {{$t("paginator.previous")}}
      li.pagination__item(
        v-for="(page, index) in pageLinks",
        :class="{ 'active': page === activePage }",
        @click.prevent="onLinkClick(page)"
      )
        a {{ page }}
      li.pagination__item.pagination__item--last
        a(:class="{ disabled: hasNext }" @click.prevent="onNextClick") {{$t("paginator.next")}}
      li.pagination__item.pagination__item--last
        a(:class="{ disabled: hasNext }" @click.prevent="onLastClick") {{$t("paginator.last")}}
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  props: {
    pageData: {
      type: Object,
      required: true
    },
    namespace: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pageRange: 2,
      lEmpty: isEmpty
    }
  },
  computed: {
    ...mapState({
      activePage(state, getters) {
        return Number(getters[this.namespace + '/search/getActivePage'])
      }
    }),
    currentPage: function () {
      return this.pageData.currentPage
    },
    totalPages: function () {
      return this.pageData.totalPages
    },
    hasPrevious: function () {
      return this.currentPage > 1
    },
    hasNext: function () {
      return this.currentPage < this.totalPages
    },
    rangeStart: function () {
      let rangeStart = this.currentPage - this.pageRange

      if (rangeStart <= 1) {
        rangeStart = 1
      }

      return rangeStart
    },
    rangeEnd: function () {
      let rangeEnd = this.currentPage + this.pageRange

      if (rangeEnd > this.totalPages) {
        return (rangeEnd = this.totalPages)
      }

      if (this.rangeStart <= 1) {
        return Math.min(this.pageRange * 2 + 1, this.totalPages)
      }

      return rangeEnd
    },
    pageLinks: function () {
      if (!this.rangeStart || !this.rangeEnd) {
        return
      }
      return Array(this.rangeEnd - this.rangeStart + 1)
        .fill()
        .map((e, i) => this.rangeStart + i)
    },
    totalItems: function () {
      return this.pageData.total
    }
  },
  methods: {
    ...mapActions({
      updateSearchParams(dispatch, payload) {
        if (!this.namespace) {
          throw new Error('Namespace not set')
        }

        return dispatch(this.namespace + '/search/updateSearchParams', payload)
      }
    }),
    fireEvent(pageNo) {
      this.updateSearchParams({
        page: pageNo
      })
    },
    onFirstClick() {
      this.fireEvent(1)
    },
    onNextClick() {
      if (!this.hasNext) {
        return
      }
      this.fireEvent(this.currentPage + 1)
    },
    onPreviousClick() {
      if (!this.hasPrevious) {
        return
      }
      this.fireEvent(this.currentPage - 1)
    },
    onLastClick() {
      this.fireEvent(this.totalPages)
    },
    onLinkClick(page) {
      this.fireEvent(page)
    }
  }
}
</script>

<style lang="stylus" scoped>


.pagination {
  font-size: 0.8em;
  margin: 1.5em 1.5em;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__legend {
    color: $fontGray;
    padding-bottom: 10px;

    span {
      margin-left: 5px;
      margin-right: 5px;
      color: $fontDark;
      font-weight: 600;
    }
  }

  &__list {
    display: flex;
    padding-bottom: 10px;
  }

  &__item {
    &:first-child {
      a {
        padding-left: 0px;
      }
    }

    &.active {
      a {
        z-index: 1;
        color: $fontDark;
        border-radius: 2px;
        border: 1px solid $fontDark;
      }
    }

    a {
      width: 25px;
      height: 25px;
      display: list-item;
      position: relative;
      display: block;
      line-height: 25px;
      color: $fontGray;
      margin-right: 0.25rem;

      &:hover {
        background: #dbdbdb;
        color: white;
      }
    }

    &--last, &--first {
      a {
        padding: 0px 0px 0px 10px;
        width: 100%;
      }
    }
  }
}
</style>
