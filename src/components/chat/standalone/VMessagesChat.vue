<template lang="pug">
  .message-temp-wrapp
    .message-chat
      .message-chat__top.is-clearfix
        span.message-chat__top-title Daniel Robertson
        .message-chat__top-dropdown(@click="topDropdownTrigger")
          svgicon.icon(name="messages-page/more")
          transition(name="dropdown-animation")
            ul.message-chat__top-dropdown-content(v-if="topDropdown" v-click-outside="closeTopDropdown")
              li
                button Delete message
              li
                button Mute notifications
              li
                button Archive
      .message-chat__messages.is-clearfix
        .message-chat__content.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus facilisis eos an...
              span.message-chat__content-time 16:34

        .message-chat__content.message-chat__content--out.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus
              span.message-chat__content-time 16:34

        .message-chat__date
          span Today

        .message-chat__content.message-chat__content--out.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Mauris turpis nisl...
              span.message-chat__content-time 16:34
        .message-chat__content.message-chat__content--out.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Curabitur at vestibulum nisi. Nullam vehicula nisi velit.
              span.message-chat__content-time 16:34

        .message-chat__content.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In malesuada enim in dolor euismod, id
              | mi consectetur. Curabitur at vestibulum nisi. Nullam vehicula nisi velit. Mauris turpis nisl, molestie ut ipsum et, suscipit vehicula odio. Vestibulum interdum vestibulum felis ac molestie.
              span.message-chat__content-time 16:34

        .message-chat__content.message-chat__content--out.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus
              span.message-chat__content-time 16:34

        .message-chat__content.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus facilisis eos an...
              span.message-chat__content-time 16:34

        .message-chat__content.message-chat__content--out.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus facilisis eos an, nulla euripidis pertinacia ne mea?
              span.message-chat__content-time 16:34

        .message-chat__content.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus facilisis eos an...
              span.message-chat__content-time 16:34

        .message-chat__content.message-chat__content--out.is-clearfix
          .message-chat__content-inner
            .message-chat__content-image
              img(src="https://keenthemes.com/metronic/preview/assets/app/media/img/users/user3.jpg")
            .message-chat__content-body
              p Lorem ipsum dolor sit amet, putnt sanctus facilisis eos an, nulla euripidis pertinacia ne mea?
              span.message-chat__content-time 16:34

      .message-chat__form
        .message-chat__form-cta
          button(v-tooltip.bottom-start="'Add file or photo'")
            svgicon.icon(name="messages-page/add")
        .message-chat__form-text
          textarea(:placeholder="$t('message_board.input')" @keyup="textareaHeight" @keydown="textareaHeight")
        .message-chat__form-cta.message-chat__form-cta--send
          button
            svgicon.icon(name="messages-page/send")

</template>


<script>
import "@/compiled-icons/messages-page"
import ClickOutside from 'vue-click-outside'

export default {
  data(){
    return{
      topDropdown: false
    }
  },
  methods:{
    textareaHeight(el){
        // Max height 200px
        el.target.style.height = "0";
        el.target.style.height = Math.min(el.target.scrollHeight, 200) + "px";
        el.target.offsetHeight == 200 ? el.target.style.overflow="auto" : el.target.style.overflow="hidden"
    },
    topDropdownTrigger(){
      this.topDropdown = !this.topDropdown;
    },
    closeTopDropdown(){
      this.topDropdown = false;
    }
  },
  directives:{
    ClickOutside
  }


}
</script>



<style lang="stylus" scoped>
@import '~@/assets/styles/global/mixins';
.message-temp-wrapp{
  width 960px
  margin 100px auto
}

.dropdown-animation-enter-active,
.dropdown-animation-leave-active {
  transition: all .3s ease;
}

.dropdown-animation-enter, .dropdown-animation-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}

.message-chat{
  background-color white
  border-radius 4px
  overflow hidden
  position relative
  display flex
  flex-direction column
  height 700px
  &:before{
    position absolute
    content ''
    top 0
    right 12px
    height 100%
    width 1px
    background rgba(0,0,0,.06);
  }
  ::-webkit-scrollbar-track{
    background-color white
  }
  ::-webkit-scrollbar{
    width 8px
  }
  ::-webkit-scrollbar-thumb{
    background-color #DCDCDC
    border-radius 25px
  }
  &__top{
    border-bottom : 2px solid rgba(151,151,151,.2);
    padding 14px 20px
    background-color white
    position relative
    z-index 1
    flex 0 0 55px
  }
  &__top-title{
    font-size 17px
    font-weight 700
    float left
    user-select: none
  }
  &__top-dropdown{
    float right
    cursor pointer
    display flex
    padding 10px 0
    position relative
    svg{
      width 21px
      height 5px
      fill #B9B9B9
      transition fill .25s ease
    }
    &:hover{
      svg{
        fill #969090
      }
    }
  }
  &__top-dropdown-content{
    background white
    border-radius 3px
    box-shadow 0 2px 10px 0 rgba(0,0,0,0.09)
    padding 11px 10px
    position absolute
    right 0
    top 25px
    width 180px
    z-index 1
    li{
      button{
        color black
        padding 6px 4px
        border-radius: 5px;
        border 0
        font-size 16px
        width: 100%
        text-align left
        transition background-color .25s ease
        margin 1px 0
        cursor pointer
        //user-select: none;
        &:hover, &:focus{
          background-color #C8DAE5
          outline none
        }
      }
    }
  }
  &__messages{
    padding 0 20px
    //height: 656px;
    overflow-y auto
    position relative
    margin-right: 2px;
    flex 1
  }
  &__content{
    padding 5px 56px 5px 0
    &--out{
      padding 5px 0 5px 56px
      .message-chat__content-inner{
        flex-direction row-reverse
      }
      .message-chat__content-image{
        margin 0 0 0 10px
      }
      .message-chat__content-body{
        background-color #E4EFF5
        border-color transparent
      }
    }
  }
  &__content-inner{
    display flex
  }

  &__content-image{
    flex 0 0 46px
    border-radius 50%
    overflow hidden
    height 46px
    margin-right 10px
  }

  &__content-body{
    border 1px solid rgba(152,191,213,.6)
    border-radius 12px
    padding 13px 15px 4px
    p{
      line-height 22px
    }
  }

  &__content-time{
    display block
    text-align right
    font-size 10px
    color: #838D98
    margin-top 4px
  }

  &__date{
    position relative
    text-align center
    padding 12px 0
    &:after{
      content ''
      position absolute
      width 100%
      left 0
      top 50%
      transform translateY(-50%)
      height 2px
      background rgba(151,151,151,.2)
      display block
    }
    span{
      background-color white
      padding 0 20px
      position relative
      z-index 1
      font-size 14px
      font-weight 700
      color: #2C2C2C;
    }
  }

  &__form{
    border-top : 2px solid rgba(151,151,151,.2);
    width 100%
    display flex
    background-color white
    position relative
    min-height 72px
  }

  &__form-cta{
    flex 0 0 80px
    display flex
    align-items flex-end
    justify-content center
    button{
      border 0
      padding 25px
      cursor pointer
      background-color
      svg{
        width 22px
        height 22px
        fill #128AFF
        transition fill .25s ease
      }
      &:hover{
        svg{
          fill #0876dd
        }
      }
      &:focus{
        outline none
      }
    }
    &--send{
      button{
        svg{
          width: 26px;
        }
      }
    }
  }

  &__form-text{
    display flex
    flex 1
    textarea{
      border 0
      font-size 16px
      line-height 24px
      padding 22px 0 20px
      height 70px
      resize none
      width 100%
      overflow hidden
      +placeholder(){
        color #838D98
      }

      &:focus{
        outline none
      }
    }
  }
}
</style>




