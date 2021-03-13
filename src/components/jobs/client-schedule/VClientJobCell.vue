<template lang="pug">
div.client-job-cell-container
  div.client-job-cell
    div.client-job-cell__button(:class="[`is-${schedulerInterval}`, {'is-full': isFull}]")
      div.client-job-cell__unfilled(v-if="!isFull")
        span {{ data.unfilled }}
        p {{ $t("jobs.filters_unfilled") }}
      div.client-job-cell__filled(v-if="!isFull")
        span {{ data.filled }}
        p {{ $t("jobs.filters_filled") }}
      div.client-job-cell__full(v-if="isFull")
        span {{data.filled}}
        p {{ $t("jobs.filters_filled") }}
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    schedulerInterval: {
      type: String,
      required: false,
      default: "week"
    }
  },
  computed: {
    isFull() {
      let { filled, unfilled } = this.data
      return  unfilled === 0
    }
  }
}
</script>

<style lang="stylus" scoped>
$weekFontSize = 1.375rem
$weekLineHeight = 1.375rem
$weekLabelFontSize = 0.6875rem


$monthFontSize = 0.75rem
$monthLineHeight = 1rem
$monthLabelFontSize = 0.9375rem



.client-job-cell-container
  height 100%
  &.selected
    .client-job-cell
      &__button
        background #244F6B
        border-left none
        border-radius 5px
      &__filled
        color #fff !important
  .client-job-cell
    padding-top 5px
    padding-bottom 5px
    height 100%
    max-height 70px //temp height control
    cursor pointer
    &__button
      width 100%
      height 100%
      min-height 55px
      background linear-gradient(225deg, $primaryLight 0%, $secondaryLight 100%)
      border-left 5px solid $secondary
      border-radius 10px 5px 5px 10px
      display flex
      p
        position absolute
        bottom 17px
        width 100%
        text-align center
        height 0
        opacity 0
        visibility hidden
        font-size $weekLabelFontSize
        transition: opacity 500ms, visibility 500ms;

      &.is-full
        background #fff
        border 2px solid $primary !important
        border-radius 5px
        justify-content center
        align-items center
        &:hover
          background #fff
      &.is-week
        .client-job-cell
          &__unfilled,
          &__filled,
          &__full
            position relative
            span
              width 100%
              height 100%
              display inline-flex
              align-items center
              justify-content center
              text-align center
              font-size $weekFontSize


          &__unfilled
            flex 1
            color #fff
            line-height $weekLineHeight
            p
              bottom 20px
          &__filled
            flex 1
            color #3C6C8C
            line-height $weekLineHeight
            p
              bottom 20px
          &__full
            width 100%
            height 100%
            p
              bottom 8px
      &.is-month
        flex-direction column
        padding-top 3px //for now
        .client-job-cell
          &__unfilled,
          &__filled,
          &__full
            position relative
            span
              width 100%
              height 100%
              display inline-flex
              font-weight bold
              align-items center
              justify-content center
              text-align center
              font-size $monthFontSize
              line-height $monthLineHeight
          &__unfilled
            span
              color #fff
          &__filled
            p
              color #3C6C8C
      &:hover
        background $primary;
        border-left none
        border-radius 5px
        .client-job-cell
          &__filled
            color #fff
        &.is-week
          p
            visibility visible
            opacity 1
</style>
