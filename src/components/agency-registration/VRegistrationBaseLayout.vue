<template lang="pug">
div.registration__layout
  section.section
    .container.custom-head
      .columns
        .column.is-12.is-10-desktop.is-offset-1-desktop
          .header__box
            .header__logo
              svgicon.icon.is-pulled-left(
                name="global/realday-logo-small"
                :fill="true"
              )
    .container.custom
      .columns
        .column.is-12.is-10-desktop.is-offset-1-desktop
          .columns.is-gapless.shadow
            .column.is-12
              .has-t-white
                .registration__wrapper(v-show="title")
                  .card-content
                    h2.title Realday
                    h4.subtitle
                      | {{$t("authorization.subtitle")}}
                |
                .registration__wrapper
                  .card-content
                    slot(name="info")
                    slot(name="errors")
                slot
            //- .column.is-6
            //-   .section.has-t-gradient
            //-     .logo
            //-       img(src="~@/assets/icons/authlogo.svg")
</template>
<script>
import "@/compiled-icons/login"
export default {
  props: {
    title: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
<style lang="stylus"scoped>
.logo
  display flex
  align-items center
  justify-content center
  margin-top 5em
  img
    width 200px

.custom-head
  max-width 700px   

.has-t-white, .has-t-gradient
  min-height 488px

.has-t-white
  background-color white
  padding 2rem

  display flex
  flex-direction column
  justify-content space-around

.has-t-gradient
  color white
  background linear-gradient(270deg, #264A5E 0%, #395A6D 100%)
  height 100%

.header__menu
  ul li
    display inline-block
    a
      padding .4em .6em
      color #2C4F63

form
  .field:not(:last-child)
    margin-bottom 1.5em
  label.label
    margin-bottom 0
    color #A1A1A1
    font-weight normal
    font-size 12px
  input
    padding-left 0
    border 0
    box-shadow none
    border-bottom 1px solid  #D4D4D4
  p.forgot
    color #4785F9
    font-size 14px
    font-weight 600
    margin-top 34px

.header__box
  display flex
  justify-content space-between
  align-items center

.header__logo
  svg
    width 54px
    height auto

.container.custom
  margin-top 34px
  max-width 700px

.columns.shadow
  border-radius 5px
  box-shadow 0 25px 40px 0 rgba(0,0,0,0.05)
  overflow hidden

.is-tmpst-info
  height 40px
  min-width 140px
  border-radius 3px
  background linear-gradient(225deg, $primary 0%, $secondary 100%)
  color white
  display flex
  justify-content space-between
  padding 0 22.5px
  margin-top 57.6px
  border 0 
  transition: box-shadow .25s ease
  &:hover{
    box-shadow 0 10px 15px 0 rgba(0, 0, 0, 0.1)
  }

.registration__wrapper
  display flex
  flex-direction column
  justify-content space-between
  .title
    font-size 30px;
    font-weight bold
  .subtitle
    color #A1A1A1
    font-size 14px
.title:not(.is-spaced) + .subtitle
  margin-top -1rem
</style>
